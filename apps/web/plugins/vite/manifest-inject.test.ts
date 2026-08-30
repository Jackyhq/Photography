import { describe, expect, it } from 'vitest'

import {
  createLightManifest,
  createManifestBootstrapScript,
  createPhotoTextPacks,
  createProductionManifest,
  createProductionManifestAssets,
  createThumbnailPreloadLinks,
  injectManifestBootstrap,
  PUBLIC_MANIFEST_FILE_NAME,
  serializeForInlineScript,
} from './manifest-inject'

describe('manifest-inject helpers', () => {
  it('creates a light manifest with default text, display metadata, and compact gallery exif', () => {
    const manifest = createLightManifest({
      version: 'v9',
      cameras: [{ name: 'camera' }],
      lenses: [{ name: 'lens' }],
      data: [
        {
          id: 'photo-1',
          title: 'Photo 1',
          titles: {
            'zh-CN': '照片 1',
            en: 'Photo 1',
          },
          description: 'Photo description',
          descriptions: {
            'zh-CN': '中文描述',
            en: 'English description',
          },
          tags: ['travel'],
          thumbnailUrl: '/thumb.jpg',
          width: 100,
          height: 50,
          aspectRatio: 2,
          dateTaken: '2024:05:10 12:30:00',
          exif: {
            Make: 'Fujifilm',
            Model: 'X-T5',
            LensModel: '35mm',
            ISO: 200,
            Rating: 5,
          },
        },
      ],
    })

    expect(manifest.version).toBe('v9')
    expect(manifest.data[0]).toMatchObject({
      id: 'photo-1',
      title: '照片 1',
      description: '中文描述',
      cameraDisplayName: 'Fujifilm X-T5',
      lensDisplayName: '35mm',
      rating: 5,
      galleryExif: {
        ISO: 200,
      },
    })
    expect(manifest.data[0]).not.toHaveProperty('titles')
    expect(manifest.data[0]).not.toHaveProperty('descriptions')
    expect(manifest.data[0].sortTime).toBe(new Date('2024-05-10 12:30:00').getTime())
  })

  it('creates separate non-default photo text packs', () => {
    const packs = createPhotoTextPacks({
      version: 'v9',
      data: [
        {
          id: 'photo-1',
          title: '照片 1',
          titles: {
            'zh-CN': '照片 1',
            en: 'Photo 1',
          },
          description: '中文描述',
          descriptions: {
            'zh-CN': '中文描述',
            en: 'English description',
          },
        },
        {
          id: 'photo-2',
          title: '照片 2',
          description: '中文描述 2',
        },
      ],
    })

    expect(packs).toEqual({
      en: {
        version: 'v9',
        language: 'en',
        photos: {
          'photo-1': {
            title: 'Photo 1',
            description: 'English description',
          },
        },
      },
    })
  })

  it('normalizes production manifests to the 640w WebP thumbnail without a JPEG srcset', () => {
    const sourceManifest = {
      version: 'v10',
      data: [
        {
          id: 'photo-1',
          originalUrl: 'https://cdn.example.com/photo-1.jpg',
          thumbnailUrl: '/thumbnails/photo-1.jpg',
          thumbnailSrcSet: '/thumbnails/photo-1.jpg 640w',
          thumbnailWebpSrcSet: '/thumbnails/photo-1-360.webp 360w, /thumbnails/photo-1-640.webp 640w',
        },
      ],
    }

    const productionManifest = createProductionManifest(sourceManifest)
    const productionPhoto = productionManifest.data?.[0]
    const lightPhoto = createLightManifest(productionManifest).data[0]

    expect(productionPhoto?.thumbnailUrl).toBe('/thumbnails/photo-1-640.webp')
    expect(productionPhoto).not.toHaveProperty('thumbnailSrcSet')
    expect(lightPhoto?.thumbnailUrl).toBe('/thumbnails/photo-1-640.webp')
    expect(lightPhoto).not.toHaveProperty('thumbnailSrcSet')
    expect(JSON.stringify(productionManifest)).not.toContain('/thumbnails/photo-1.jpg')

    expect(sourceManifest.data[0]).toMatchObject({
      thumbnailUrl: '/thumbnails/photo-1.jpg',
      thumbnailSrcSet: '/thumbnails/photo-1.jpg 640w',
    })
  })

  it('creates a stable public copy of the hashed production manifest', () => {
    const assets = createProductionManifestAssets({
      version: 'v10',
      data: [
        {
          id: 'photo-1',
          thumbnailUrl: '/thumbnails/photo-1.jpg',
          thumbnailSrcSet: '/thumbnails/photo-1.jpg 640w',
          thumbnailWebpSrcSet: '/thumbnails/photo-1-360.webp 360w, /thumbnails/photo-1-640.webp 640w',
        },
      ],
    })

    expect(assets.publicAsset.fileName).toBe(PUBLIC_MANIFEST_FILE_NAME)
    expect(assets.runtimeAsset.fileName).toMatch(/^assets\/photos-manifest\.[a-f0-9]{10}\.json$/)
    expect(assets.publicAsset.source).toBe(assets.runtimeAsset.source)
    expect(JSON.parse(assets.publicAsset.source).data[0]).toMatchObject({
      thumbnailUrl: '/thumbnails/photo-1-640.webp',
    })
    expect(JSON.parse(assets.publicAsset.source).data[0]).not.toHaveProperty('thumbnailSrcSet')
  })

  it('serializes inline script data safely', () => {
    expect(serializeForInlineScript({ html: '</script><img />' })).toContain('\\u003C/script\\u003E')
  })

  it('generates responsive thumbnail preload links', () => {
    const links = createThumbnailPreloadLinks({
      data: [
        {
          thumbnailUrl: '/fallback.jpg',
          thumbnailWebpSrcSet: '/one.webp 360w, /two.webp 640w',
        },
      ],
    })

    expect(links).toContain('rel="preload"')
    expect(links).toContain('data-afilmory-preload="gallery"')
    expect(links).toContain('href="/one.webp"')
    expect(links).toContain('imagesrcset="/one.webp 360w, /two.webp 640w"')
  })

  it('emits a safe bootstrap and places an external production index before the main module', () => {
    const source = createManifestBootstrapScript(
      createLightManifest({ data: [{ id: '</script>', title: '<Photo>' }] }),
      '/assets/photos-manifest.hash.json',
      { en: '/assets/photo-text.en.hash.json' },
    )
    expect(source).toContain('window.__MANIFEST__=')
    expect(source).not.toContain('</script>')

    const html = injectManifestBootstrap(
      '<html><head></head><body><script id="manifest"></script><script type="module" src="/main.js"></script></body></html>',
      {
        preloadLinks: '<link rel="preload" as="image" href="/thumb.webp">',
        scriptUrl: '/assets/photos-index.abc123.js',
      },
    )

    expect(html).toContain('<head><link rel="preload" as="image" href="/thumb.webp"></head>')
    expect(html.indexOf('photos-index.abc123.js')).toBeLessThan(html.indexOf('type="module"'))
    expect(html).not.toContain('<script id="manifest"></script>')
  })

  it('removes every duplicate manifest marker before injecting the bootstrap', () => {
    const html = injectManifestBootstrap(
      '<html><head></head><body><script id="manifest"></script><script id=\'manifest\'></script><script type="module" src="/main.js"></script></body></html>',
      { scriptUrl: '/assets/photos-index.abc123.js' },
    )

    expect(html.match(/id=["']manifest["']/g)).toHaveLength(1)
    expect(html).toContain('<script id="manifest" src="/assets/photos-index.abc123.js"></script>')
  })

  it('keeps development bootstrap synchronous without requiring a built asset', () => {
    const html = injectManifestBootstrap(
      '<html><head></head><body><script id="manifest"></script><script type="module" src="/src/main.tsx"></script></body></html>',
      { scriptSource: 'window.__MANIFEST__={data:[],cameras:[],lenses:[]};' },
    )

    expect(html).toContain('<script id="manifest">window.__MANIFEST__=')
    expect(html.indexOf('window.__MANIFEST__=')).toBeLessThan(html.indexOf('type="module"'))
    expect(html).not.toContain('photos-index.')
  })
})
