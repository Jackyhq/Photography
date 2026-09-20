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

type GalleryDataKind = 'index' | 'photoText' | 'fullManifest'

interface GalleryDataPolicy {
  name: string
  fixed: Budget
  perPhoto: Budget
  maximum: Budget
}

interface GalleryDataCheck {
  failures: string[]
  consumers: Set<string>
}

const KiB = 1024
const PHOTO_HTML_PAGE_BUDGET = 25 * KiB
const PHOTO_HTML_TOTAL_BUDGET = 10 * 1024 * KiB
const STARTUP_CODE_BUDGET: Budget = { gzip: 270 * KiB, brotli: 235 * KiB }
const MOBILE_STARTUP_CODE_BUDGET: Budget = { gzip: 245 * KiB, brotli: 215 * KiB }
const STARTUP_LOCALES = ['en', 'zh-CN', 'zh-HK', 'zh-TW', 'jp', 'ko'] as const
const DEFAULT_STARTUP_LOCALE = 'en'
const STARTUP_PHOTO_TEXT_LOCALES = new Set<(typeof STARTUP_LOCALES)[number]>(['en', 'jp', 'ko'])
const FULL_MANIFEST_PATTERN = /^assets\/photos-manifest\.[\w-]+\.json$/
const GALLERY_INDEX_PATTERN = /^assets\/photos-index\.[\w-]+\.js$/
const MAPLIBRE_ASSET_PATTERN = /^assets\/maplibre-gl-[\w-]+\.js$/
const MAPLIBRE_MAIN_ASSET_PATTERN = /^assets\/maplibre-gl-(?!worker-)[\w-]+\.js$/
const MAPLIBRE_WORKER_ASSET_PATTERN = /^assets\/maplibre-gl-worker-[\w-]+\.js$/
const HEIC_ASSET_PATTERN = /^vendor\/heic-[\w-]+\.js$/
const STARTUP_PHOTO_TEXT_PATTERN = /^assets\/photo-text\.en\.[\w-]+\.json$/

const GALLERY_DATA_POLICIES: Record<GalleryDataKind, GalleryDataPolicy> = {
  index: {
    name: 'gallery index data',
    fixed: { gzip: 8 * KiB, brotli: 6 * KiB },
    perPhoto: { gzip: 192, brotli: 144 },
    maximum: { gzip: 128 * KiB, brotli: 96 * KiB },
  },
  photoText: {
    name: 'English photo text data',
    fixed: { gzip: KiB, brotli: KiB },
    perPhoto: { gzip: 80, brotli: 64 },
    maximum: { gzip: 64 * KiB, brotli: 48 * KiB },
  },
  fullManifest: {
    name: 'full manifest data',
    fixed: { gzip: 8 * KiB, brotli: 6 * KiB },
    perPhoto: { gzip: 384, brotli: 288 },
    maximum: { gzip: 256 * KiB, brotli: 192 * KiB },
  },
}

export function getGalleryDataBudget(kind: GalleryDataKind, photoCount: number): Budget {
  if (!Number.isSafeInteger(photoCount) || photoCount < 0) {
    throw new Error('Gallery data budgets require a non-negative integer photo count')
  }
  const policy = GALLERY_DATA_POLICIES[kind]
  return {
    gzip: Math.min(policy.fixed.gzip + policy.perPhoto.gzip * photoCount, policy.maximum.gzip),
    brotli: Math.min(policy.fixed.brotli + policy.perPhoto.brotli * photoCount, policy.maximum.brotli),
  }
}

export const HOMEPAGE_STARTUP_SOURCE_PATTERNS = [
  /src\/pages\/\(main\)\/layout\.tsx$|^layout$/,
  /GalleryRouteContent(?:\.tsx)?$/,
]

export const DESKTOP_GALLERY_SOURCE_PATTERNS = [
  /src\/modules\/gallery\/DesktopGalleryScrollArea\.tsx$/,
  /src\/modules\/gallery\/components\/DesktopActionButton\.tsx$/,
]

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
    name: 'maplibre runtime',
    pattern: MAPLIBRE_ASSET_PATTERN,
    budget: { gzip: 390 * KiB, brotli: 320 * KiB },
  },
  {
    name: 'reaction chunk',
    pattern: /^assets\/Reaction-[\w-]+\.js$/,
    budget: { gzip: 90 * KiB, brotli: 80 * KiB },
  },
]

const routeTargets: RouteBudgetTarget[] = [
  {
    // This runs automatically when idle; budget it separately from critical
    // homepage code so moving work after first paint cannot hide its cost.
    name: 'homepage idle notifications',
    sourcePatterns: [/packages\/ui\/src\/sonner\.tsx$/],
    includeDynamic: false,
    budget: { gzip: 20 * KiB, brotli: 17 * KiB },
  },
  {
    name: 'photo-viewer base route',
    // ExifPanel and its raw-EXIF trigger render as soon as the desktop viewer
    // has loaded the full manifest. Seed them explicitly without following the
    // EXIF parser, Reaction, or other user-triggered dynamic imports.
    sourcePatterns: PHOTO_VIEWER_IMMEDIATE_SOURCE_PATTERNS,
    assetPatterns: [FULL_MANIFEST_PATTERN],
    includeDynamic: false,
    budget: { gzip: 130 * KiB, brotli: 130 * KiB },
  },
  {
    name: 'photo-viewer GPS route',
    // GPS photos render MiniMap immediately. Include its static graph and the
    // separately emitted MapLibre main and worker chunks to reflect real traffic.
    sourcePatterns: PHOTO_VIEWER_GPS_SOURCE_PATTERNS,
    assetPatterns: [FULL_MANIFEST_PATTERN, MAPLIBRE_ASSET_PATTERN],
    includeDynamic: false,
    budget: { gzip: 520 * KiB, brotli: 445 * KiB },
  },
  {
    name: 'map route',
    sourcePatterns: [/src\/pages\/explory\/index\.tsx$/],
    // MapSection fetches the full manifest, while Vite emits the worker
    // outside the route's manifest import graph. Count both explicitly.
    assetPatterns: [FULL_MANIFEST_PATTERN, MAPLIBRE_ASSET_PATTERN],
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
  // Route totals, code budgets, and data budgets reuse many assets. Keep this
  // cache local so another check sees rebuilt files rather than stale sizes.
  const compressedSizes = new Map<string, CompressedSize>()
  const measure = (assetFiles: string[]) => sumCompressedSizes(distDir, assetFiles, compressedSizes)
  const dataChecks = new Map<string, GalleryDataCheck>()
  const photoIds = readGalleryPhotoIds(distDir, files, failures)
  const fullManifestFile = files.find((file) => FULL_MANIFEST_PATTERN.test(file))
  const registerGalleryData = (kind: GalleryDataKind, file: string, count = photoIds?.size) => {
    if (count === undefined) return
    const { name } = GALLERY_DATA_POLICIES[kind]
    const budget = getGalleryDataBudget(kind, count)
    const size = measure([file])
    const dataFailures: string[] = []
    rows.push(formatBudgetRow(name, [file], size, budget))
    appendCompressedFailures(dataFailures, name, size, budget)
    dataChecks.set(file, { failures: dataFailures, consumers: new Set() })
  }
  if (photoIds && fullManifestFile) {
    rows.push(`gallery data: ${photoIds.size} photos with unique IDs`)
    registerGalleryData('fullManifest', fullManifestFile)
  }

  const checkRouteBudget = (name: string, routeFiles: string[], codeBudget: Budget, baselineFiles: string[] = []) => {
    // Only validated, actually referenced data assets are excluded from code.
    const codeFiles = routeFiles.filter((file) => !dataChecks.has(file))
    const codeSize = measure(codeFiles)
    const totalFiles = Array.from(new Set([...baselineFiles, ...routeFiles]))
    const totalSize = measure(totalFiles)
    const incrementalSize = measure(routeFiles)
    const navigationContext =
      baselineFiles.length > 0
        ? `; includes English desktop homepage baseline; additional ${formatBytes(incrementalSize.gzip)} gzip / ${formatBytes(incrementalSize.brotli)} brotli`
        : ''
    rows.push(
      `${name}: ${formatBytes(totalSize.raw)} raw, ${formatBytes(totalSize.gzip)} gzip, ${formatBytes(totalSize.brotli)} brotli total (${totalFiles.length} files${navigationContext})`,
      formatBudgetRow(`${name} code`, codeFiles, codeSize, codeBudget),
    )
    appendCompressedFailures(failures, `${name} code`, codeSize, codeBudget)
    for (const file of routeFiles) dataChecks.get(file)?.consumers.add(name)
  }
  const indexPath = path.join(distDir, 'index.html')
  const viteManifestPath = path.join(distDir, '.vite/manifest.json')

  if (!existsSync(indexPath)) {
    failures.push('Missing index.html')
  } else if (!existsSync(viteManifestPath)) {
    failures.push('Missing .vite/manifest.json; keep Vite build.manifest enabled for route budgets')
  } else {
    const viteManifest = JSON.parse(readFileSync(viteManifestPath, 'utf-8')) as ViteManifest
    const indexHtml = readFileSync(indexPath, 'utf-8')
    const indexStartupFiles = collectStartupFiles(indexHtml)
    const manifestBootstrapFiles = indexStartupFiles.filter((file) => GALLERY_INDEX_PATTERN.test(file))
    let startupPhotoTextFile: string | undefined

    if (manifestBootstrapFiles.length !== 1) {
      failures.push(`Expected one manifest bootstrap asset, found ${manifestBootstrapFiles.length}`)
    } else {
      const manifestBootstrapFile = manifestBootstrapFiles[0]
      if (files.includes(manifestBootstrapFile)) {
        const source = readFileSync(path.join(distDir, manifestBootstrapFile), 'utf-8')
        if (photoIds && fullManifestFile && validateManifestBootstrap(source, fullManifestFile, photoIds, failures)) {
          registerGalleryData('index', manifestBootstrapFile)
        }
        const photoTextUrls = parsePhotoTextUrls(source)
        if (photoTextUrls === null) {
          failures.push('Manifest bootstrap has a missing or invalid photo-text URL map')
        } else if (photoTextUrls.en) {
          startupPhotoTextFile = toLocalDistPath(photoTextUrls.en)
          if (!startupPhotoTextFile) {
            failures.push(`Startup photo text URL must reference a local asset: ${photoTextUrls.en}`)
          }
        }
      }
    }

    const emittedStartupPhotoTextFiles = files.filter((file) => STARTUP_PHOTO_TEXT_PATTERN.test(file))
    if (startupPhotoTextFile) {
      if (!STARTUP_PHOTO_TEXT_PATTERN.test(startupPhotoTextFile)) {
        failures.push(`Declared startup photo text asset has an unexpected path: ${startupPhotoTextFile}`)
      }
      if (emittedStartupPhotoTextFiles.length !== 1 || emittedStartupPhotoTextFiles[0] !== startupPhotoTextFile) {
        failures.push(`Declared startup photo text asset is missing: ${startupPhotoTextFile}`)
      } else if (photoIds) {
        const textCount = readPhotoTextCount(distDir, startupPhotoTextFile, photoIds, failures)
        if (textCount !== undefined) registerGalleryData('photoText', startupPhotoTextFile, textCount)
      }
    } else if (emittedStartupPhotoTextFiles.length > 0) {
      failures.push('Found an English photo text asset that is not declared by the manifest bootstrap')
    }

    const startupLocaleFiles = new Map(
      STARTUP_LOCALES.map((locale) => {
        const pattern = new RegExp(`^assets/${locale}-[\\w-]+\\.js$`)
        const matches = files.filter((file) => pattern.test(file))
        if (matches.length !== 1) {
          failures.push(`Expected one startup locale asset for ${locale}, found ${matches.length}`)
        }
        return [locale, matches[0]] as const
      }),
    )
    const homepageSources = findManifestKeys(viteManifest, HOMEPAGE_STARTUP_SOURCE_PATTERNS)
    if (homepageSources.length !== HOMEPAGE_STARTUP_SOURCE_PATTERNS.length) {
      failures.push(
        `Missing homepage source: expected ${HOMEPAGE_STARTUP_SOURCE_PATTERNS.length}, found ${homepageSources.length}`,
      )
    }
    const mobileStartupBaseFiles = Array.from(
      new Set([
        ...indexStartupFiles,
        // GalleryRouteContent is conditionally imported so direct photo routes
        // skip it, but homepage navigation preloads it during layout evaluation.
        ...collectManifestRouteFiles(viteManifest, HOMEPAGE_STARTUP_SOURCE_PATTERNS, {
          includeEntries: true,
          includeDynamic: false,
        }),
      ]),
    ).sort()
    const desktopSources = findManifestKeys(viteManifest, DESKTOP_GALLERY_SOURCE_PATTERNS)
    if (desktopSources.length !== DESKTOP_GALLERY_SOURCE_PATTERNS.length) {
      failures.push(
        `Missing desktop gallery source: expected ${DESKTOP_GALLERY_SOURCE_PATTERNS.length}, found ${desktopSources.length}`,
      )
    }
    const desktopFiles = collectManifestRouteFiles(viteManifest, DESKTOP_GALLERY_SOURCE_PATTERNS, {
      includeEntries: false,
      includeDynamic: false,
    })
    // These lazy modules render immediately on desktop. Keep counting them there
    // even though mobile no longer downloads their static dependency graph.
    const startupBaseFiles = Array.from(new Set([...mobileStartupBaseFiles, ...desktopFiles])).sort()
    for (const key of desktopSources) {
      const { file } = viteManifest[key]
      if (mobileStartupBaseFiles.includes(file)) {
        failures.push(`Desktop gallery module is unexpectedly included in mobile startup: ${file}`)
      }
    }
    const missingStartupFiles = startupBaseFiles.filter((file) => !files.includes(file))
    failures.push(...missingStartupFiles.map((file) => `Missing startup asset: ${file}`))

    const existingStartupBaseFiles = startupBaseFiles.filter((file) => files.includes(file))
    const defaultLocaleFile = startupLocaleFiles.get(DEFAULT_STARTUP_LOCALE)
    let defaultStartupFiles = existingStartupBaseFiles
    for (const locale of STARTUP_LOCALES) {
      const localeFile = startupLocaleFiles.get(locale)
      if (!localeFile) continue

      // Include English as a conservative fallback for non-English startup paths.
      // This catches regressions even when i18next's exact fallback hierarchy changes.
      const localeChainFiles = locale === DEFAULT_STARTUP_LOCALE ? [localeFile] : [defaultLocaleFile, localeFile]
      const localeFiles = localeChainFiles.filter((file): file is string => !!file)
      const localizedFiles = [
        ...localeFiles,
        ...collectManifestRouteFiles(viteManifest, [], {
          includeEntries: false,
          includeDynamic: false,
          entryFiles: localeFiles,
        }),
        ...(STARTUP_PHOTO_TEXT_LOCALES.has(locale) && startupPhotoTextFile && files.includes(startupPhotoTextFile)
          ? [startupPhotoTextFile]
          : []),
      ]
      const startupFiles = Array.from(new Set([...existingStartupBaseFiles, ...localizedFiles])).sort()
      if (locale === DEFAULT_STARTUP_LOCALE) defaultStartupFiles = startupFiles
      const budgetName = `homepage startup (${locale})`
      checkRouteBudget(budgetName, startupFiles, STARTUP_CODE_BUDGET)
      const mobileStartupFiles = Array.from(
        new Set([...mobileStartupBaseFiles.filter((file) => files.includes(file)), ...localizedFiles]),
      ).sort()
      checkRouteBudget(`mobile homepage startup (${locale})`, mobileStartupFiles, MOBILE_STARTUP_CODE_BUDGET)
    }

    const baseline = new Set(defaultStartupFiles)
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
      checkRouteBudget(target.name, routeFiles, target.budget, Array.from(baseline))
    }
  }

  for (const check of dataChecks.values()) {
    const consumers = Array.from(check.consumers)
    const context = consumers.length > 0 ? ` (loaded by ${consumers.join(', ')})` : ''
    failures.push(...check.failures.map((failure) => `${failure}${context}`))
  }

  for (const target of chunkTargets) {
    const candidates = files.filter((file) => target.pattern.test(file))
    if (candidates.length === 0) {
      failures.push(`Missing bundle target: ${target.name}`)
      continue
    }

    // Sum every matching chunk so a split cannot make the check pass by only
    // measuring the largest fragment.
    const size = measure(candidates)
    rows.push(formatBudgetRow(target.name, candidates, size, target.budget))
    appendCompressedFailures(failures, target.name, size, target.budget)
  }

  const optionalCodeMatches = [HEIC_ASSET_PATTERN, MAPLIBRE_MAIN_ASSET_PATTERN, MAPLIBRE_WORKER_ASSET_PATTERN].map(
    (pattern) => files.filter((file) => pattern.test(file)),
  )
  if (optionalCodeMatches.some((matches) => matches.length !== 1)) {
    failures.push(
      'Expected one HEIC chunk, one MapLibre main chunk, and one MapLibre worker chunk for optional-code precache validation',
    )
  }
  const optionalCodeFiles = optionalCodeMatches.flat()
  const serviceWorkerPath = path.join(distDir, 'sw.js')
  if (!existsSync(serviceWorkerPath)) {
    failures.push('Missing sw.js for optional-code precache validation')
  } else {
    const serviceWorkerSource = readFileSync(serviceWorkerPath, 'utf-8')
    const precachedOptionalCode = optionalCodeFiles.filter((file) => serviceWorkerSource.includes(file))
    rows.push(`PWA optional code: ${optionalCodeFiles.length} heavy chunks excluded from install precache`)
    failures.push(...precachedOptionalCode.map((file) => `Optional code is unexpectedly precached: ${file}`))
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

export function parsePhotoTextUrls(bootstrapSource: string): Record<string, string> | null {
  const marker = 'window.__PHOTO_TEXT_URLS__='
  const markerIndex = bootstrapSource.lastIndexOf(marker)
  if (markerIndex === -1) return null

  const serializedUrls = bootstrapSource
    .slice(markerIndex + marker.length)
    .replace(/;\s*$/, '')
    .trim()
  try {
    const parsed = JSON.parse(serializedUrls) as unknown
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return null

    const entries = Object.entries(parsed)
    if (entries.some(([, value]) => typeof value !== 'string')) return null
    return Object.fromEntries(entries) as Record<string, string>
  } catch {
    return null
  }
}

export function collectManifestRouteFiles(
  manifest: ViteManifest,
  sourcePatterns: RegExp[],
  options: { includeEntries: boolean; includeDynamic: boolean; entryFiles?: string[] },
): Set<string> {
  const seeds = new Set(findManifestKeys(manifest, sourcePatterns))
  for (const [key, chunk] of Object.entries(manifest)) {
    if ((options.includeEntries && chunk.isEntry) || options.entryFiles?.includes(chunk.file)) seeds.add(key)
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

function readGalleryPhotoIds(distDir: string, files: string[], failures: string[]): Set<string> | undefined {
  const manifests = files.filter((file) => FULL_MANIFEST_PATTERN.test(file))
  if (manifests.length !== 1) {
    failures.push(`Expected one full manifest data asset, found ${manifests.length}`)
    return
  }

  const file = manifests[0]
  let manifest: unknown
  try {
    manifest = JSON.parse(readFileSync(path.join(distDir, file), 'utf-8'))
  } catch {
    failures.push(`Invalid full manifest JSON: ${file}`)
    return
  }

  return getManifestPhotoIds(manifest, `Full manifest ${file}`, failures)
}

function getManifestPhotoIds(manifest: unknown, label: string, failures: string[]): Set<string> | undefined {
  if (!manifest || typeof manifest !== 'object' || !('data' in manifest) || !Array.isArray(manifest.data)) {
    failures.push(`${label} must contain a data array`)
    return
  }

  const ids = new Set<string>()
  for (const photo of manifest.data) {
    if (
      !photo ||
      typeof photo !== 'object' ||
      Array.isArray(photo) ||
      typeof photo.id !== 'string' ||
      !photo.id.trim()
    ) {
      failures.push(`${label} must contain photos with non-empty string IDs`)
      return
    }
    if (ids.has(photo.id)) {
      failures.push(`${label} contains duplicate photo ID ${JSON.stringify(photo.id)}`)
      return
    }
    ids.add(photo.id)
  }

  return ids
}

function validateManifestBootstrap(
  source: string,
  fullManifestFile: string,
  photoIds: Set<string>,
  failures: string[],
): boolean {
  const indexMarker = 'window.__MANIFEST__='
  const fullMarker = ';window.__FULL_MANIFEST_URL__='
  const textMarker = ';window.__PHOTO_TEXT_URLS__='
  const fullIndex = source.lastIndexOf(fullMarker)
  const textIndex = source.lastIndexOf(textMarker)
  if (!source.startsWith(indexMarker) || fullIndex < indexMarker.length || textIndex <= fullIndex) {
    failures.push('Manifest bootstrap has invalid data assignments')
    return false
  }

  let index: unknown
  let fullUrl: unknown
  try {
    // The producer writes these JSON assignments in this order. Parse the
    // literals only; never evaluate the generated JavaScript during validation.
    index = JSON.parse(source.slice(indexMarker.length, fullIndex))
    fullUrl = JSON.parse(source.slice(fullIndex + fullMarker.length, textIndex))
  } catch {
    failures.push('Manifest bootstrap has invalid manifest JSON or full-manifest URL')
    return false
  }
  if (typeof fullUrl !== 'string' || toLocalDistPath(fullUrl) !== fullManifestFile) {
    failures.push('Manifest bootstrap full-manifest URL does not match the emitted full manifest')
    return false
  }
  const indexIds = getManifestPhotoIds(index, 'Manifest bootstrap index', failures)
  if (!indexIds) return false
  if (indexIds.size !== photoIds.size || Array.from(indexIds).some((id) => !photoIds.has(id))) {
    failures.push('Manifest bootstrap index and full manifest have different photo IDs')
    return false
  }
  return true
}

function readPhotoTextCount(
  distDir: string,
  file: string,
  photoIds: Set<string>,
  failures: string[],
): number | undefined {
  let pack: unknown
  try {
    pack = JSON.parse(readFileSync(path.join(distDir, file), 'utf-8'))
  } catch {
    failures.push(`Invalid English photo text JSON: ${file}`)
    return
  }
  if (
    !pack ||
    typeof pack !== 'object' ||
    !('language' in pack) ||
    pack.language !== 'en' ||
    !('photos' in pack) ||
    !pack.photos ||
    typeof pack.photos !== 'object' ||
    Array.isArray(pack.photos)
  ) {
    failures.push(`English photo text pack must contain an en language and photos object: ${file}`)
    return
  }
  const entries = Object.entries(pack.photos)
  for (const [id, text] of entries) {
    if (!photoIds.has(id)) {
      failures.push(`English photo text contains unknown photo ID ${JSON.stringify(id)}: ${file}`)
      return
    }
    if (
      !text ||
      typeof text !== 'object' ||
      Array.isArray(text) ||
      !['title', 'description'].some((field) => typeof text[field] === 'string' && text[field].trim())
    ) {
      failures.push(`English photo text contains an empty or invalid entry for ${JSON.stringify(id)}: ${file}`)
      return
    }
  }
  return entries.length
}

function sumCompressedSizes(distDir: string, files: string[], cache: Map<string, CompressedSize>): CompressedSize {
  return files.reduce<CompressedSize>(
    (total, file) => {
      let size = cache.get(file)
      if (!size) {
        const source = readFileSync(path.join(distDir, file))
        size = {
          raw: source.byteLength,
          gzip: gzipSync(source).byteLength,
          brotli: brotliCompressSync(source).byteLength,
        }
        cache.set(file, size)
      }
      total.raw += size.raw
      total.gzip += size.gzip
      total.brotli += size.brotli
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
