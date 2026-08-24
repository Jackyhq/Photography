import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { brotliCompressSync, gzipSync } from 'node:zlib'

interface Budget {
  gzip: number
  brotli: number
}

interface ChunkBudgetTarget {
  name: string
  pattern: RegExp
  budget: Budget
}

interface RouteBudgetTarget {
  name: string
  sourcePatterns: RegExp[]
  assetPatterns?: RegExp[]
  includeDynamic: boolean
  budget: Budget
}

export interface ViteManifestChunk {
  file: string
  name?: string
  src?: string
  isEntry?: boolean
  imports?: string[]
  dynamicImports?: string[]
  css?: string[]
}

export type ViteManifest = Record<string, ViteManifestChunk>

interface CompressedSize {
  raw: number
  gzip: number
  brotli: number
}

const KiB = 1024
const PHOTO_HTML_PAGE_BUDGET = 25 * KiB
const PHOTO_HTML_TOTAL_BUDGET = 10 * 1024 * KiB
const STARTUP_BUDGET: Budget = { gzip: 340 * KiB, brotli: 290 * KiB }
const STARTUP_LOCALE_PATTERN = /^assets\/en-[\w-]+\.js$/
const FULL_MANIFEST_PATTERN = /^assets\/photos-manifest\.[\w-]+\.json$/
const MAPLIBRE_ASSET_PATTERN = /^assets\/maplibre-gl-[\w-]+\.js$/

export const PHOTO_VIEWER_IMMEDIATE_SOURCE_PATTERNS = [
  /PhotoViewer(?:\.tsx)?$/,
  /src\/components\/ui\/photo-viewer\/ExifPanel\.tsx$/,
  /src\/components\/ui\/photo-viewer\/RawExifViewer\.tsx$/,
]

export const PHOTO_VIEWER_GPS_SOURCE_PATTERNS = [
  ...PHOTO_VIEWER_IMMEDIATE_SOURCE_PATTERNS,
  /src\/components\/ui\/photo-viewer\/MiniMap\.tsx$/,
]

const chunkTargets: ChunkBudgetTarget[] = [
  {
    name: 'photo-viewer chunk',
    pattern: /^assets\/PhotoViewer-[\w-]+\.js$/,
    budget: { gzip: 90 * KiB, brotli: 80 * KiB },
  },
  {
    name: 'maplibre chunk',
    pattern: /^assets\/maplibre-gl-[\w-]+\.js$/,
    budget: { gzip: 360 * KiB, brotli: 320 * KiB },
  },
  {
    name: 'reaction chunk',
    pattern: /^assets\/Reaction-[\w-]+\.js$/,
    budget: { gzip: 90 * KiB, brotli: 80 * KiB },
  },
]

const routeTargets: RouteBudgetTarget[] = [
  {
    name: 'photo-viewer base route',
    // ExifPanel and its raw-EXIF trigger render as soon as the desktop viewer
    // has loaded the full manifest. Seed them explicitly without following the
    // EXIF parser, Reaction, or other user-triggered dynamic imports.
    sourcePatterns: PHOTO_VIEWER_IMMEDIATE_SOURCE_PATTERNS,
    assetPatterns: [FULL_MANIFEST_PATTERN],
    includeDynamic: false,
    budget: { gzip: 260 * KiB, brotli: 230 * KiB },
  },
  {
    name: 'photo-viewer GPS route',
    // GPS photos render MiniMap immediately. Include its static graph and the
    // separately emitted MapLibre chunk so the aggregate reflects real traffic.
    sourcePatterns: PHOTO_VIEWER_GPS_SOURCE_PATTERNS,
    assetPatterns: [FULL_MANIFEST_PATTERN, MAPLIBRE_ASSET_PATTERN],
    includeDynamic: false,
    budget: { gzip: 600 * KiB, brotli: 520 * KiB },
  },
  {
    name: 'map route',
    sourcePatterns: [/src\/pages\/explory\/index\.tsx$/],
    includeDynamic: true,
    budget: { gzip: 430 * KiB, brotli: 380 * KiB },
  },
]

export function checkBundleBudget(distDir: string): { rows: string[]; failures: string[] } {
  if (!existsSync(distDir)) {
    throw new Error('Bundle budget check requires apps/web/dist. Run pnpm build first.')
  }

  const files = listFiles(distDir)
  const rows: string[] = []
  const failures: string[] = []
  const indexPath = path.join(distDir, 'index.html')
  const viteManifestPath = path.join(distDir, '.vite/manifest.json')

  if (!existsSync(indexPath)) {
    failures.push('Missing index.html')
  } else if (!existsSync(viteManifestPath)) {
    failures.push('Missing .vite/manifest.json; keep Vite build.manifest enabled for route budgets')
  } else {
    const viteManifest = JSON.parse(readFileSync(viteManifestPath, 'utf-8')) as ViteManifest
    const startupLocaleFiles = files.filter((file) => STARTUP_LOCALE_PATTERN.test(file))
    if (startupLocaleFiles.length !== 1) {
      failures.push(`Expected one default startup locale asset, found ${startupLocaleFiles.length}`)
    }
    const startupFiles = Array.from(
      new Set([
        ...collectStartupFiles(readFileSync(indexPath, 'utf-8')),
        ...startupLocaleFiles,
        ...collectManifestRouteFiles(viteManifest, [/src\/pages\/\(main\)\/layout\.tsx$/], {
          includeEntries: true,
          includeDynamic: false,
        }),
      ]),
    ).sort()
    const missingStartupFiles = startupFiles.filter((file) => !files.includes(file))
    failures.push(...missingStartupFiles.map((file) => `Missing startup asset: ${file}`))

    const existingStartupFiles = startupFiles.filter((file) => files.includes(file))
    const startupSize = sumCompressedSizes(distDir, existingStartupFiles)
    rows.push(formatBudgetRow('homepage startup', existingStartupFiles, startupSize, STARTUP_BUDGET))
    appendCompressedFailures(failures, 'homepage startup', startupSize, STARTUP_BUDGET)

    const baseline = new Set(existingStartupFiles)
    for (const target of routeTargets) {
      const matchedSources = findManifestKeys(viteManifest, target.sourcePatterns)
      if (matchedSources.length !== target.sourcePatterns.length) {
        failures.push(
          `Missing route source for ${target.name}: expected ${target.sourcePatterns.length}, found ${matchedSources.length}`,
        )
        continue
      }

      const assetMatches = (target.assetPatterns ?? []).map((pattern) => files.filter((file) => pattern.test(file)))
      if (assetMatches.some((matches) => matches.length === 0)) {
        failures.push(`Missing emitted asset for ${target.name}`)
        continue
      }
      const matchedAssets = assetMatches.flat()

      const routeFiles = Array.from(
        new Set([
          ...collectManifestRouteFiles(viteManifest, target.sourcePatterns, {
            includeEntries: false,
            includeDynamic: target.includeDynamic,
          }),
          ...matchedAssets,
        ]),
      ).filter((file) => !baseline.has(file))
      const size = sumCompressedSizes(distDir, routeFiles)
      rows.push(formatBudgetRow(target.name, routeFiles, size, target.budget))
      appendCompressedFailures(failures, target.name, size, target.budget)
    }
  }

  for (const target of chunkTargets) {
    const candidates = files.filter((file) => target.pattern.test(file))
    if (candidates.length === 0) {
      failures.push(`Missing bundle target: ${target.name}`)
      continue
    }

    // Sum every matching chunk so a split cannot make the check pass by only
    // measuring the largest fragment.
    const size = sumCompressedSizes(distDir, candidates)
    rows.push(formatBudgetRow(target.name, candidates, size, target.budget))
    appendCompressedFailures(failures, target.name, size, target.budget)
  }

  const photoHtmlFiles = files.filter((file) => /^photos\/[^/]+\/index\.html$/.test(file))
  if (photoHtmlFiles.length === 0) {
    failures.push('Missing generated photo detail HTML pages')
  } else {
    const pageSizes = photoHtmlFiles.map((file) => ({ file, size: statSync(path.join(distDir, file)).size }))
    const largest = pageSizes.toSorted((a, b) => b.size - a.size)[0]
    const total = pageSizes.reduce((sum, entry) => sum + entry.size, 0)

    rows.push(
      `photo HTML: ${photoHtmlFiles.length} pages, ${formatBytes(total)} total / ${formatBytes(PHOTO_HTML_TOTAL_BUDGET)}, ${formatBytes(largest.size)} max / ${formatBytes(PHOTO_HTML_PAGE_BUDGET)} (${largest.file})`,
    )
    if (largest.size > PHOTO_HTML_PAGE_BUDGET) {
      failures.push(
        `photo HTML page ${largest.file} is ${formatBytes(largest.size)}, exceeding ${formatBytes(PHOTO_HTML_PAGE_BUDGET)}`,
      )
    }
    if (total > PHOTO_HTML_TOTAL_BUDGET) {
      failures.push(`photo HTML total ${formatBytes(total)} exceeds ${formatBytes(PHOTO_HTML_TOTAL_BUDGET)}`)
    }
  }

  return { rows, failures }
}

export function collectStartupFiles(html: string): string[] {
  const files = new Set<string>()

  for (const match of html.matchAll(/<script[^>]+src=(?:"([^"]+)"|'([^']+)')[^>]*>/gi)) {
    const file = toLocalDistPath(match[1] || match[2])
    if (file) files.add(file)
  }

  for (const match of html.matchAll(/<link\b[^>]*>/gi)) {
    const tag = match[0]
    const rel = getHtmlAttribute(tag, 'rel')?.toLowerCase().split(/\s+/) ?? []
    const as = getHtmlAttribute(tag, 'as')?.toLowerCase()
    const isStartupAsset =
      rel.includes('stylesheet') ||
      rel.includes('modulepreload') ||
      (rel.includes('preload') && ['script', 'style'].includes(as ?? ''))
    if (!isStartupAsset) continue

    const file = toLocalDistPath(getHtmlAttribute(tag, 'href'))
    if (file) files.add(file)
  }

  return Array.from(files).sort()
}

export function collectManifestRouteFiles(
  manifest: ViteManifest,
  sourcePatterns: RegExp[],
  options: { includeEntries: boolean; includeDynamic: boolean },
): Set<string> {
  const seeds = new Set(findManifestKeys(manifest, sourcePatterns))
  if (options.includeEntries) {
    for (const [key, chunk] of Object.entries(manifest)) {
      if (chunk.isEntry) seeds.add(key)
    }
  }

  const files = new Set<string>()
  const visited = new Set<string>()
  const pending = Array.from(seeds)
  while (pending.length > 0) {
    const key = pending.pop()
    if (!key || visited.has(key)) continue

    const chunk = manifest[key]
    if (!chunk) continue
    visited.add(key)
    files.add(chunk.file)
    for (const cssFile of chunk.css ?? []) files.add(cssFile)
    pending.push(...(chunk.imports ?? []))
    // Entry chunks enumerate every lazy route. Following those edges would
    // turn each route budget into the whole application instead of the route
    // being measured.
    if (options.includeDynamic && !chunk.isEntry) pending.push(...(chunk.dynamicImports ?? []))
  }

  return files
}

function findManifestKeys(manifest: ViteManifest, sourcePatterns: RegExp[]): string[] {
  return sourcePatterns.flatMap((pattern) => {
    const matched = Object.entries(manifest).find(
      ([key, chunk]) => pattern.test(chunk.src ?? key) || pattern.test(chunk.name ?? ''),
    )
    return matched ? [matched[0]] : []
  })
}

export function collectStaticJavaScriptClosure(distDir: string, entryFiles: string[]): Set<string> {
  const closure = new Set<string>()
  const pending = [...entryFiles]

  while (pending.length > 0) {
    const file = pending.pop()
    if (!file || closure.has(file) || !file.endsWith('.js')) continue

    const absolutePath = path.join(distDir, file)
    if (!existsSync(absolutePath)) continue
    closure.add(file)

    const source = readFileSync(absolutePath, 'utf-8')
    const staticImportPattern = /(?:\bfrom\s*|\bimport\s*)(["'])([^"']+)\1/g
    for (const match of source.matchAll(staticImportPattern)) {
      const specifier = match[2]
      if (!specifier.startsWith('.')) continue

      const dependency = path.posix.normalize(path.posix.join(path.posix.dirname(file), specifier))
      if (dependency.endsWith('.js') && !closure.has(dependency)) pending.push(dependency)
    }
  }

  return closure
}

function appendCompressedFailures(failures: string[], name: string, size: CompressedSize, budget: Budget) {
  if (size.gzip > budget.gzip) {
    failures.push(`${name} gzip ${formatBytes(size.gzip)} exceeds ${formatBytes(budget.gzip)}`)
  }
  if (size.brotli > budget.brotli) {
    failures.push(`${name} brotli ${formatBytes(size.brotli)} exceeds ${formatBytes(budget.brotli)}`)
  }
}

function sumCompressedSizes(distDir: string, files: string[]): CompressedSize {
  return files.reduce<CompressedSize>(
    (total, file) => {
      const source = readFileSync(path.join(distDir, file))
      total.raw += source.byteLength
      total.gzip += gzipSync(source).byteLength
      total.brotli += brotliCompressSync(source).byteLength
      return total
    },
    { raw: 0, gzip: 0, brotli: 0 },
  )
}

function formatBudgetRow(name: string, files: string[], size: CompressedSize, budget: Budget): string {
  return `${name}: ${formatBytes(size.raw)} raw, ${formatBytes(size.gzip)} / ${formatBytes(budget.gzip)} gzip, ${formatBytes(size.brotli)} / ${formatBytes(budget.brotli)} brotli (${files.length} files)`
}

function listFiles(directory: string, base = directory): string[] {
  return readdirSync(directory).flatMap((entry) => {
    const fullPath = path.join(directory, entry)
    const relativePath = path.relative(base, fullPath).replaceAll(path.sep, '/')
    if (statSync(fullPath).isDirectory()) return listFiles(fullPath, base)
    return relativePath
  })
}

function getHtmlAttribute(tag: string, name: string): string | undefined {
  const match = tag.match(new RegExp(`\\b${name}=(?:"([^"]*)"|'([^']*)')`, 'i'))
  return match?.[1] ?? match?.[2]
}

function toLocalDistPath(value: string | undefined): string | undefined {
  if (!value) return undefined
  try {
    const url = new URL(value, 'https://afilmory.local/')
    if (url.origin !== 'https://afilmory.local') return undefined
    return decodeURIComponent(url.pathname).replace(/^\/+/, '')
  } catch {
    return undefined
  }
}

function formatBytes(value: number) {
  return `${(value / KiB).toFixed(1)} KiB`
}

if (path.resolve(process.argv[1] ?? '') === fileURLToPath(import.meta.url)) {
  const distDir = path.resolve(process.cwd(), 'apps/web/dist')
  const { rows, failures } = checkBundleBudget(distDir)
  console.info(rows.join('\n'))
  if (failures.length > 0) throw new Error(failures.join('\n'))
}
