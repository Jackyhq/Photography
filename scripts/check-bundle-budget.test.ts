import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'

import { afterEach, describe, expect, it } from 'vitest'

import {
  createLightManifest,
  createManifestBootstrapScript,
  createPhotoTextPacks,
  createProductionManifest,
} from '../apps/web/plugins/vite/manifest-inject'
import type { ViteManifest } from './check-bundle-budget'
import {
  checkBundleBudget,
  collectManifestRouteFiles,
  collectStartupFiles,
  collectStaticJavaScriptClosure,
  getGalleryDataBudget,
  HOMEPAGE_STARTUP_SOURCE_PATTERNS,
  parsePhotoTextUrls,
  PHOTO_VIEWER_GPS_SOURCE_PATTERNS,
  PHOTO_VIEWER_IMMEDIATE_SOURCE_PATTERNS,
} from './check-bundle-budget'

const directories: string[] = []

afterEach(() => {
  for (const directory of directories.splice(0)) rmSync(directory, { force: true, recursive: true })
})

describe('bundle budget graph helpers', () => {
  it('counts local startup scripts, styles, and module preloads without image or remote preloads', () => {
    const files = collectStartupFiles(`
      <script src="/assets/photos-index.abc.js"></script>
      <script type="module" src="/assets/main.js"></script>
      <script src="https://example.com/tag.js"></script>
      <link rel="modulepreload" href="/vendor/react.js">
      <link rel="stylesheet" href="/assets/main.css">
      <link rel="preload" as="image" href="/thumbnail.webp">
    `)

    expect(files).toEqual(['assets/main.css', 'assets/main.js', 'assets/photos-index.abc.js', 'vendor/react.js'])
  })

  it('reads optional photo text assets from the manifest bootstrap', () => {
    expect(parsePhotoTextUrls('window.__PHOTO_TEXT_URLS__={"en":"/assets/photo-text.en.hash.json"};')).toEqual({
      en: '/assets/photo-text.en.hash.json',
    })
    expect(parsePhotoTextUrls('window.__PHOTO_TEXT_URLS__={};')).toEqual({})
    expect(parsePhotoTextUrls('window.__PHOTO_TEXT_URLS__=invalid;')).toBeNull()
    expect(parsePhotoTextUrls('window.__MANIFEST__={}')).toBeNull()
  })

  it('walks every static JavaScript dependency but excludes dynamic imports', () => {
    const directory = mkdtempSync(path.join(tmpdir(), 'afilmory-budget-'))
    directories.push(directory)
    mkdirSync(path.join(directory, 'assets'), { recursive: true })
    writeFileSync(
      path.join(directory, 'assets/route.js'),
      `import { value } from './shared.js'; import('./lazy.js'); export { value }`,
    )
    writeFileSync(path.join(directory, 'assets/shared.js'), `import './nested.js'`)
    writeFileSync(path.join(directory, 'assets/nested.js'), 'export const value = 1')
    writeFileSync(path.join(directory, 'assets/lazy.js'), 'export const lazy = 1')

    expect(Array.from(collectStaticJavaScriptClosure(directory, ['assets/route.js'])).sort()).toEqual([
      'assets/nested.js',
      'assets/route.js',
      'assets/shared.js',
    ])
  })

  it('counts the conditionally loaded gallery in the homepage startup graph', () => {
    const manifest: ViteManifest = {
      'index.html': {
        file: 'assets/main.js',
        isEntry: true,
        dynamicImports: ['src/pages/(main)/layout.tsx', 'src/pages/explory/index.tsx'],
        imports: ['vendor.ts'],
      },
      'vendor.ts': { file: 'vendor/react.js' },
      'src/pages/(main)/layout.tsx': {
        file: 'assets/layout.js',
        src: 'src/pages/(main)/layout.tsx',
        dynamicImports: ['src/modules/gallery/GalleryRouteContent.tsx'],
      },
      'src/modules/gallery/GalleryRouteContent.tsx': {
        file: 'assets/gallery-route.js',
        src: 'src/modules/gallery/GalleryRouteContent.tsx',
        imports: ['src/modules/gallery/MasonryRoot.tsx'],
      },
      'src/modules/gallery/MasonryRoot.tsx': {
        file: 'assets/gallery.js',
        css: ['assets/gallery.css'],
      },
      'src/pages/explory/index.tsx': {
        file: 'assets/map-page.js',
        src: 'src/pages/explory/index.tsx',
      },
    }

    expect(
      Array.from(
        collectManifestRouteFiles(manifest, HOMEPAGE_STARTUP_SOURCE_PATTERNS, {
          includeEntries: true,
          includeDynamic: false,
        }),
      ).sort(),
    ).toEqual([
      'assets/gallery-route.js',
      'assets/gallery.css',
      'assets/gallery.js',
      'assets/layout.js',
      'assets/main.js',
      'vendor/react.js',
    ])
  })

  it('can seed a route from its manifest chunk name when Vite omits src', () => {
    const manifest: ViteManifest = {
      '_PhotoViewer.js': {
        file: 'assets/PhotoViewer.js',
        name: 'PhotoViewer',
        dynamicImports: ['src/components/ui/photo-viewer/ExifPanel.tsx'],
      },
      'src/components/ui/photo-viewer/ExifPanel.tsx': {
        file: 'assets/ExifPanel.js',
      },
    }

    expect(
      Array.from(
        collectManifestRouteFiles(manifest, [/PhotoViewer(?:\.tsx)?$/], {
          includeEntries: false,
          includeDynamic: true,
        }),
      ).sort(),
    ).toEqual(['assets/ExifPanel.js', 'assets/PhotoViewer.js'])
  })

  it('includes desktop-immediate EXIF modules without following interaction-only dynamic imports', () => {
    const manifest: ViteManifest = {
      '_PhotoViewer.js': {
        file: 'assets/PhotoViewer.js',
        name: 'PhotoViewer',
        imports: ['shared.ts'],
        dynamicImports: ['src/components/ui/photo-viewer/Reaction.tsx'],
      },
      'src/components/ui/photo-viewer/ExifPanel.tsx': {
        file: 'assets/ExifPanel.js',
        src: 'src/components/ui/photo-viewer/ExifPanel.tsx',
        imports: ['shared.ts'],
        dynamicImports: ['src/components/ui/photo-viewer/MiniMap.tsx'],
      },
      'src/components/ui/photo-viewer/RawExifViewer.tsx': {
        file: 'assets/RawExifViewer.js',
        src: 'src/components/ui/photo-viewer/RawExifViewer.tsx',
        dynamicImports: ['src/lib/exiftool.ts'],
      },
      'src/components/ui/photo-viewer/Reaction.tsx': {
        file: 'assets/Reaction.js',
      },
      'src/components/ui/photo-viewer/MiniMap.tsx': {
        file: 'assets/MiniMap.js',
      },
      'src/lib/exiftool.ts': {
        file: 'assets/exiftool.js',
      },
      'shared.ts': {
        file: 'assets/shared.js',
      },
    }

    expect(
      Array.from(
        collectManifestRouteFiles(manifest, PHOTO_VIEWER_IMMEDIATE_SOURCE_PATTERNS, {
          includeEntries: false,
          includeDynamic: false,
        }),
      ).sort(),
    ).toEqual(['assets/ExifPanel.js', 'assets/PhotoViewer.js', 'assets/RawExifViewer.js', 'assets/shared.js'])

    expect(
      Array.from(
        collectManifestRouteFiles(manifest, PHOTO_VIEWER_GPS_SOURCE_PATTERNS, {
          includeEntries: false,
          includeDynamic: false,
        }),
      ).sort(),
    ).toEqual([
      'assets/ExifPanel.js',
      'assets/MiniMap.js',
      'assets/PhotoViewer.js',
      'assets/RawExifViewer.js',
      'assets/shared.js',
    ])
  })

  it('counts the separately emitted worker in the map runtime and both map routes', () => {
    const directory = createBudgetFixture()
    expect(checkBundleBudget(directory).failures).toEqual([])

    // The worker is not a Vite manifest entry. Growing it must still exceed
    // each map budget without affecting the viewer that has no GPS map.
    writeFileSync(path.join(directory, 'assets/maplibre-gl-worker-main.js'), deterministicBytes(540 * 1024))

    const result = checkBundleBudget(directory)
    for (const target of ['maplibre runtime', 'map route', 'photo-viewer GPS route']) {
      const codeLabel = target === 'maplibre runtime' ? target : `${target} code`
      expect(result.failures).toEqual(expect.arrayContaining([expect.stringMatching(`^${codeLabel} gzip .* exceeds`)]))
    }
    expect(result.failures.some((failure) => failure.startsWith('photo-viewer base route'))).toBe(false)
    expect(result.failures.some((failure) => failure.startsWith('homepage startup'))).toBe(false)
  })

  it.each(['vendor/heic-main.js', 'assets/maplibre-gl-main.js', 'assets/maplibre-gl-worker-main.js'])(
    'rejects optional code in the service worker precache: %s',
    (file) => {
      const directory = createBudgetFixture()
      writeFileSync(path.join(directory, 'sw.js'), `precacheAndRoute([{url:${JSON.stringify(file)},revision:null}])`)

      expect(checkBundleBudget(directory).failures).toEqual([`Optional code is unexpectedly precached: ${file}`])
    },
  )

  it.each(['assets/maplibre-gl-main.js', 'assets/maplibre-gl-worker-main.js'])(
    'requires both MapLibre chunks even when the other is present: %s',
    (file) => {
      const directory = createBudgetFixture()
      rmSync(path.join(directory, file))

      expect(checkBundleBudget(directory).failures).toEqual([
        'Expected one HEIC chunk, one MapLibre main chunk, and one MapLibre worker chunk for optional-code precache validation',
      ])
    },
  )

  it('aggregates desktop viewer code, full manifest, and GPS map assets', () => {
    const directory = createBudgetFixture()

    const result = checkBundleBudget(directory)
    expect(result.failures).toEqual([])
    expect(result.rows).toEqual(
      expect.arrayContaining([
        expect.stringContaining('homepage startup (en):'),
        expect.stringContaining('homepage startup (zh-CN):'),
        expect.stringContaining('homepage startup (jp):'),
        expect.stringContaining('PWA optional code: 3 heavy chunks excluded'),
        expect.stringContaining('photo-viewer base route:'),
        expect.stringContaining('photo-viewer GPS route:'),
      ]),
    )

    rmSync(path.join(directory, 'assets/photo-text.en.main.json'))
    writeFileSync(
      path.join(directory, 'assets/photos-index.main.js'),
      'window.__MANIFEST__={"data":[]};window.__FULL_MANIFEST_URL__="/assets/photos-manifest.main.json";window.__PHOTO_TEXT_URLS__={};',
    )

    const resultWithoutPhotoText = checkBundleBudget(directory)
    expect(resultWithoutPhotoText.failures).toEqual([])
    expect(resultWithoutPhotoText.rows.find((row) => row.startsWith('homepage startup (en):'))).not.toEqual(
      result.rows.find((row) => row.startsWith('homepage startup (en):')),
    )
  })
})

describe('gallery data and code budgets', () => {
  // Real Brotli compression needs extra time on coverage-instrumented CI runners.
  it('accepts 400 distinct bilingual photos with EXIF and reports data plus route traffic separately', () => {
    const directory = createBudgetFixture(400)
    const result = checkBundleBudget(directory)

    expect(result.failures).toEqual([])
    expect(result.rows).toEqual(
      expect.arrayContaining([
        'gallery data: 400 photos with unique IDs',
        expect.stringMatching(/^gallery index data: .* \/ 83\.0 KiB gzip, .* \/ 62\.3 KiB brotli/),
        expect.stringMatching(/^English photo text data: .* \/ 32\.3 KiB gzip, .* \/ 26\.0 KiB brotli/),
        expect.stringMatching(/^full manifest data: .* \/ 158\.0 KiB gzip, .* \/ 118\.5 KiB brotli/),
        expect.stringMatching(/^homepage startup \(jp\) code: .* \/ 270\.0 KiB gzip/),
        expect.stringMatching(/^map route: .*includes English homepage baseline; additional/),
      ]),
    )
    // The map's full metadata is not part of the Vite import graph, but its
    // actual navigation total and additional traffic must both include it.
    const withoutFullManifest = result.rows.find((row) => row.startsWith('map route:'))!
    const full = readJson(directory, 'assets/photos-manifest.main.json')
    full.data[0].exif.Comment = entropyText(2048)
    writeJson(directory, 'assets/photos-manifest.main.json', full)
    const changed = checkBundleBudget(directory)
    expect(changed.failures).toEqual([])
    expect(changed.rows.find((row) => row.startsWith('map route:'))).not.toBe(withoutFullManifest)
    expect(changed.rows.find((row) => row.startsWith('map route code:'))).toBe(
      result.rows.find((row) => row.startsWith('map route code:')),
    )
  }, 15_000)

  it.each([
    {
      kind: 'index' as const,
      label: 'gallery index data',
      consumers: [
        'homepage startup (en)',
        'homepage startup (zh-CN)',
        'homepage startup (jp)',
        'homepage startup (ko)',
      ],
    },
    {
      kind: 'photoText' as const,
      label: 'English photo text data',
      consumers: ['homepage startup (en)', 'homepage startup (jp)', 'homepage startup (ko)'],
    },
    {
      kind: 'fullManifest' as const,
      label: 'full manifest data',
      consumers: ['photo-viewer base route', 'photo-viewer GPS route', 'map route'],
    },
  ])('rejects oversized $label independently of code and identifies its consumers', ({ kind, label, consumers }) => {
    const directory = createBudgetFixture(1)
    writeBudgetPhotoData(directory, 1, { [kind]: entropyText(24 * 1024) })
    const result = checkBundleBudget(directory)
    const dataFailures = result.failures.filter((failure) => failure.startsWith(label))

    expect(dataFailures).toEqual(expect.arrayContaining([expect.stringMatching(/gzip .* exceeds/)]))
    for (const consumer of consumers) expect(dataFailures.join('\n')).toContain(consumer)
    expect(result.failures.every((failure) => failure.startsWith(label))).toBe(true)
    if (kind === 'photoText') {
      expect(dataFailures.join('\n')).not.toContain('homepage startup (zh-CN)')
      expect(dataFailures.join('\n')).not.toContain('homepage startup (zh-HK)')
      expect(dataFailures.join('\n')).not.toContain('homepage startup (zh-TW)')
    }
  })

  it('rejects application code growth without charging it to gallery data', () => {
    const directory = createBudgetFixture(400)
    writeFileSync(
      path.join(directory, 'assets/index-main.js'),
      `export const payload=${JSON.stringify(entropyText(400 * 1024))}`,
    )
    const result = checkBundleBudget(directory)

    for (const locale of ['en', 'zh-CN', 'zh-HK', 'zh-TW', 'jp', 'ko']) {
      expect(result.failures).toEqual(
        expect.arrayContaining([expect.stringMatching(`^homepage startup \\(${locale}\\) code gzip .* exceeds`)]),
      )
    }
    expect(result.failures.every((failure) => failure.startsWith('homepage startup'))).toBe(true)
  })

  // Keep the real compression check while allowing slower coverage CI workers.
  it('caps data allowances even when the gallery keeps growing', () => {
    expect(getGalleryDataBudget('index', 10_000)).toEqual({ gzip: 128 * 1024, brotli: 96 * 1024 })
    expect(getGalleryDataBudget('photoText', 10_000)).toEqual({ gzip: 64 * 1024, brotli: 48 * 1024 })
    expect(getGalleryDataBudget('fullManifest', 10_000)).toEqual({ gzip: 256 * 1024, brotli: 192 * 1024 })

    const directory = createBudgetFixture(1000)
    writeBudgetPhotoData(directory, 1000, { index: entropyText(176 * 1024) })
    const { failures } = checkBundleBudget(directory)
    expect(failures).toEqual(
      expect.arrayContaining([expect.stringMatching(/^gallery index data gzip .* exceeds 128\.0 KiB/)]),
    )
    expect(failures.every((failure) => failure.startsWith('gallery index data'))).toBe(true)
  }, 15_000)

  it('keeps fixed overhead allowances for empty galleries and empty English packs', () => {
    expect(getGalleryDataBudget('index', 0)).toEqual({ gzip: 8192, brotli: 6144 })
    expect(getGalleryDataBudget('photoText', 0)).toEqual({ gzip: 1024, brotli: 1024 })
    expect(getGalleryDataBudget('fullManifest', 0)).toEqual({ gzip: 8192, brotli: 6144 })
    expect(checkBundleBudget(createBudgetFixture()).failures).toEqual([])

    const directory = createBudgetFixture(400)
    writeJson(directory, 'assets/photo-text.en.main.json', { language: 'en', photos: {} })
    const result = checkBundleBudget(directory)
    expect(result.failures).toEqual([])
    expect(result.rows).toEqual(
      expect.arrayContaining([expect.stringMatching(/^English photo text data: .* \/ 1\.0 KiB gzip/)]),
    )
  })

  it.each([
    ['invalid JSON', '{', /Invalid full manifest JSON/],
    ['missing data', '{}', /must contain a data array/],
    ['non-array data', '{"data":{}}', /must contain a data array/],
    ['non-object entry', '{"data":[null]}', /non-empty string IDs/],
    ['missing ID', '{"data":[{}]}', /non-empty string IDs/],
    ['empty ID', '{"data":[{"id":" "}]}', /non-empty string IDs/],
    ['duplicate ID', '{"data":[{"id":"same"},{"id":"same"}]}', /duplicate photo ID/],
  ])('rejects a full manifest with %s', (_name, source, error) => {
    const directory = createBudgetFixture()
    writeFileSync(path.join(directory, 'assets/photos-manifest.main.json'), source as string)
    expect(checkBundleBudget(directory).failures).toEqual(
      expect.arrayContaining([expect.stringMatching(error as RegExp)]),
    )
  })

  it('rejects missing or multiple full manifests instead of deriving a permissive count', () => {
    const directory = createBudgetFixture()
    rmSync(path.join(directory, 'assets/photos-manifest.main.json'))
    expect(checkBundleBudget(directory).failures).toContain('Expected one full manifest data asset, found 0')
    writeJson(directory, 'assets/photos-manifest.main.json', { data: [] })
    writeJson(directory, 'assets/photos-manifest.stale.json', { data: [] })
    expect(checkBundleBudget(directory).failures).toContain('Expected one full manifest data asset, found 2')
  })

  it('requires the bootstrap to reference the validated full manifest and identical photo IDs', () => {
    const directory = createBudgetFixture(1)
    const file = path.join(directory, 'assets/photos-index.main.js')
    const source = readFileSync(file, 'utf-8')
    writeFileSync(file, source.replace('/assets/photos-manifest.main.json', '/assets/photos-manifest.stale.json'))
    expect(checkBundleBudget(directory).failures).toContain(
      'Manifest bootstrap full-manifest URL does not match the emitted full manifest',
    )
    writeFileSync(file, source.replace('"id":"photo-0"', '"id":"unknown"'))
    expect(checkBundleBudget(directory).failures).toContain(
      'Manifest bootstrap index and full manifest have different photo IDs',
    )
  })

  it.each([
    ['invalid JSON', '{', /Invalid English photo text JSON/],
    ['unknown ID', '{"language":"en","photos":{"unknown":{"title":"Unknown"}}}', /unknown photo ID/],
    ['empty text', '{"language":"en","photos":{"photo-0":{"title":" "}}}', /empty or invalid entry/],
  ])('rejects English packs with %s', (_name, source, error) => {
    const directory = createBudgetFixture(1)
    writeFileSync(path.join(directory, 'assets/photo-text.en.main.json'), source as string)
    expect(checkBundleBudget(directory).failures).toEqual(
      expect.arrayContaining([expect.stringMatching(error as RegExp)]),
    )
  })

  it('reports a missing declared English pack without crashing', () => {
    const directory = createBudgetFixture(1)
    rmSync(path.join(directory, 'assets/photo-text.en.main.json'))
    expect(checkBundleBudget(directory).failures).toContain(
      'Declared startup photo text asset is missing: assets/photo-text.en.main.json',
    )
  })
})

function createBudgetFixture(photoCount = 0): string {
  const directory = mkdtempSync(path.join(tmpdir(), 'afilmory-budget-'))
  directories.push(directory)
  mkdirSync(path.join(directory, '.vite'), { recursive: true })
  mkdirSync(path.join(directory, 'assets'), { recursive: true })
  mkdirSync(path.join(directory, 'photos/photo-1'), { recursive: true })

  const manifest: ViteManifest = {
    'index.html': {
      file: 'assets/index-main.js',
      isEntry: true,
    },
    'src/pages/(main)/layout.tsx': {
      file: 'assets/layout-main.js',
      src: 'src/pages/(main)/layout.tsx',
    },
    '_PhotoViewer.js': {
      file: 'assets/PhotoViewer-main.js',
      name: 'PhotoViewer',
    },
    'src/components/ui/photo-viewer/ExifPanel.tsx': {
      file: 'assets/ExifPanel-main.js',
      src: 'src/components/ui/photo-viewer/ExifPanel.tsx',
    },
    'src/components/ui/photo-viewer/RawExifViewer.tsx': {
      file: 'assets/RawExifViewer-main.js',
      src: 'src/components/ui/photo-viewer/RawExifViewer.tsx',
    },
    'src/components/ui/photo-viewer/MiniMap.tsx': {
      file: 'assets/MiniMap-main.js',
      src: 'src/components/ui/photo-viewer/MiniMap.tsx',
    },
    'src/pages/explory/index.tsx': {
      file: 'assets/map-page-main.js',
      src: 'src/pages/explory/index.tsx',
    },
  }

  writeFileSync(path.join(directory, '.vite/manifest.json'), JSON.stringify(manifest))
  writeFileSync(
    path.join(directory, 'index.html'),
    '<script id="manifest" src="/assets/photos-index.main.js"></script><script type="module" src="/assets/index-main.js"></script>',
  )
  for (const file of [
    'index-main.js',
    'layout-main.js',
    'en-main.js',
    'zh-CN-main.js',
    'zh-HK-main.js',
    'zh-TW-main.js',
    'jp-main.js',
    'ko-main.js',
    'PhotoViewer-main.js',
    'ExifPanel-main.js',
    'RawExifViewer-main.js',
    'MiniMap-main.js',
    'map-page-main.js',
    'maplibre-gl-main.js',
    'maplibre-gl-worker-main.js',
    'Reaction-main.js',
  ]) {
    writeFileSync(path.join(directory, 'assets', file), 'export {}')
  }
  writeBudgetPhotoData(directory, photoCount)
  mkdirSync(path.join(directory, 'vendor'), { recursive: true })
  writeFileSync(path.join(directory, 'vendor/heic-main.js'), 'export {}')
  writeFileSync(path.join(directory, 'sw.js'), 'precacheAndRoute([])')
  writeFileSync(path.join(directory, 'photos/photo-1/index.html'), '<!doctype html>')

  return directory
}

function writeBudgetPhotoData(
  directory: string,
  count: number,
  padding: Partial<Record<'index' | 'photoText' | 'fullManifest', string>> = {},
) {
  const manifest = createProductionManifest({
    version: 'fixture-v1',
    cameras: [],
    lenses: [],
    data: Array.from({ length: count }, (_, index) => ({
      id: `photo-${index}`,
      title: `湖边树影 ${index}`,
      titles: { 'zh-CN': `湖边树影 ${index}`, en: `Trees by the Lake ${index}` },
      description: `树木与湖面映着午后的光线，第 ${index} 个取景展示沿岸的不同细节。`,
      descriptions: {
        'zh-CN': `树木与湖面映着午后的光线，第 ${index} 个取景展示沿岸的不同细节。`,
        en: `Afternoon light falls across the trees and lake, with a different stretch of shoreline in photograph ${index}.`,
      },
      dateTaken: new Date(Date.UTC(2026, 0, 1, 0, index)).toISOString(),
      tags: ['风光', '湖泊'],
      originalUrl: `https://example.com/photos/landscape/photo-${index}.jpg`,
      thumbnailUrl: `/thumbnails/photo-${index}.jpg`,
      thumbnailWebpSrcSet: `/thumbnails/photo-${index}-360.webp 360w, /thumbnails/photo-${index}-640.webp 640w`,
      width: 4000,
      height: 3000,
      aspectRatio: 4 / 3,
      exif: {
        Make: 'Synthetic Camera',
        Model: `Model ${index % 4}`,
        LensModel: '35mm F2',
        ISO: 100 + (index % 8) * 100,
        FNumber: 2,
        GPSLatitude: 25 + index / 10_000,
        GPSLongitude: 102 + index / 10_000,
      },
    })),
  })
  const index = createLightManifest(manifest)
  const pack = createPhotoTextPacks(manifest).en ?? { language: 'en', photos: {} }
  if (padding.index) index.data[0].description = padding.index
  if (padding.photoText) pack.photos['photo-0'].description = padding.photoText
  if (padding.fullManifest) manifest.data![0].exif!.Comment = padding.fullManifest
  writeFileSync(
    path.join(directory, 'assets/photos-index.main.js'),
    createManifestBootstrapScript(index, '/assets/photos-manifest.main.json', {
      en: '/assets/photo-text.en.main.json',
    }),
  )
  writeJson(directory, 'assets/photos-manifest.main.json', manifest)
  writeJson(directory, 'assets/photo-text.en.main.json', pack)
}

function writeJson(directory: string, file: string, value: unknown) {
  writeFileSync(path.join(directory, file), JSON.stringify(value))
}

function readJson(directory: string, file: string) {
  return JSON.parse(readFileSync(path.join(directory, file), 'utf-8'))
}

function deterministicBytes(length: number): Buffer {
  const buffer = Buffer.alloc(length)
  let state = 0x12345678
  for (let index = 0; index < length; index += 1) {
    state ^= state << 13
    state ^= state >>> 17
    state ^= state << 5
    buffer[index] = state & 255
  }
  return buffer
}

function entropyText(length: number): string {
  return deterministicBytes(Math.ceil((length * 3) / 4))
    .toString('base64')
    .slice(0, length)
}
