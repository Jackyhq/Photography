import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'

import { afterEach, describe, expect, it } from 'vitest'

import type { ViteManifest } from './check-bundle-budget'
import {
  checkBundleBudget,
  collectManifestRouteFiles,
  collectStartupFiles,
  collectStaticJavaScriptClosure,
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

  it('aggregates desktop viewer code, full manifest, and GPS map assets', () => {
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
      'Reaction-main.js',
    ]) {
      writeFileSync(path.join(directory, 'assets', file), 'export {}')
    }
    writeFileSync(
      path.join(directory, 'assets/photos-index.main.js'),
      'window.__MANIFEST__={};window.__FULL_MANIFEST_URL__="/assets/photos-manifest.main.json";window.__PHOTO_TEXT_URLS__={"en":"/assets/photo-text.en.main.json"};',
    )
    writeFileSync(path.join(directory, 'assets/photos-manifest.main.json'), '{"data":[]}')
    writeFileSync(path.join(directory, 'assets/photo-text.en.main.json'), '{"language":"en","photos":{}}')
    mkdirSync(path.join(directory, 'vendor'), { recursive: true })
    writeFileSync(path.join(directory, 'vendor/heic-main.js'), 'export {}')
    writeFileSync(path.join(directory, 'sw.js'), 'precacheAndRoute([])')
    writeFileSync(path.join(directory, 'photos/photo-1/index.html'), '<!doctype html>')

    const result = checkBundleBudget(directory)
    expect(result.failures).toEqual([])
    expect(result.rows).toEqual(
      expect.arrayContaining([
        expect.stringContaining('homepage startup (en):'),
        expect.stringContaining('homepage startup (zh-CN):'),
        expect.stringContaining('homepage startup (jp):'),
        expect.stringContaining('PWA optional code: 2 heavy chunks excluded'),
        expect.stringContaining('photo-viewer base route:'),
        expect.stringContaining('photo-viewer GPS route:'),
      ]),
    )

    rmSync(path.join(directory, 'assets/photo-text.en.main.json'))
    writeFileSync(
      path.join(directory, 'assets/photos-index.main.js'),
      'window.__MANIFEST__={};window.__FULL_MANIFEST_URL__="/assets/photos-manifest.main.json";window.__PHOTO_TEXT_URLS__={};',
    )

    const resultWithoutPhotoText = checkBundleBudget(directory)
    expect(resultWithoutPhotoText.failures).toEqual([])
    expect(resultWithoutPhotoText.rows.find((row) => row.startsWith('homepage startup (en):'))).not.toEqual(
      result.rows.find((row) => row.startsWith('homepage startup (en):')),
    )
  })
})
