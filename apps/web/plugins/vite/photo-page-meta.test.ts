import { existsSync, mkdtempSync, readFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'

import type { PhotoManifestItem } from '@afilmory/builder/photo-types'
import { describe, expect, it } from 'vitest'

import type { SiteConfig } from '../../../../site.config'
import {
  applyHomePageMeta,
  applyPhotoPageMeta,
  createPhotoPageMeta,
  createPhotoPreloadLink,
  STATIC_APP_ROUTES,
  STATIC_GALLERY_LINK_LIMIT,
  writeStaticAppRoutePages,
} from './photo-page-meta'

const siteConfig: SiteConfig = {
  name: 'Gallery',
  title: 'Gallery',
  description: 'Site description',
  url: 'https://photos.example.com',
  accentColor: '#000000',
  author: { name: 'Jacky', url: 'https://example.com' },
}

const photo: PhotoManifestItem = {
  id: 'photo/unsafe',
  title: 'Fallback title',
  titles: { 'zh-CN': '标题 </script>' },
  description: 'Description',
  descriptions: { 'zh-CN': '图像描述' },
  dateTaken: '2026-01-02T03:04:05.000Z',
  tags: [],
  originalUrl: 'https://cdn.example.com/photos/photo.jpg',
  thumbnailUrl: '/thumbnails/photo.jpg',
  thumbnailSrcSet: '/thumbnails/photo.jpg 640w',
  thumbnailWebpSrcSet: '/thumbnails/photo-360.webp 360w, /thumbnails/photo-640.webp 640w',
  thumbHash: null,
  width: 1200,
  height: 800,
  aspectRatio: 1.5,
  s3Key: 'photo.jpg',
  lastModified: '2026-01-02T03:04:05.000Z',
  size: 123,
  exif: null,
  toneAnalysis: null,
}

describe('photo-page-meta', () => {
  it('replaces gallery preloads with the current photo and adds safe fallback SEO', () => {
    const baseHtml = `<!doctype html><html><head><title>Gallery</title><link rel="preload" as="image" data-afilmory-preload="gallery" href="/wrong.webp"></head><body><main></main></body></html>`
    const html = applyPhotoPageMeta(baseHtml, createPhotoPageMeta(photo, siteConfig))

    expect(html).not.toContain('/wrong.webp')
    expect(html).toContain('data-afilmory-preload="photo"')
    expect(html).toContain('imagesrcset="/thumbnails/photo-360.webp 360w, /thumbnails/photo-640.webp 640w"')
    expect(html).toContain('type="application/ld+json"')
    expect(html).toContain('"@type":"ImageObject"')
    expect(html).toContain('property="og:image" content="https://cdn.example.com/photos/photo.jpg"')
    expect(html).toContain('property="twitter:image" content="https://cdn.example.com/photos/photo.jpg"')
    expect(html).toContain('"thumbnailUrl":"https://photos.example.com/thumbnails/photo-640.webp"')
    expect(html).toContain('<img src="/thumbnails/photo-640.webp"')
    expect(html).not.toContain('/thumbnails/photo.jpg')
    expect(html).not.toContain('标题 </script>')
    expect(html).toContain('data-afilmory-static-content')
    expect(html).toContain('photos/photo%2Funsafe/')
  })

  it('adds a bounded, escaped static gallery index inside the React root', () => {
    const photos = Array.from({ length: 80 }, (_, index) => ({ ...photo, id: `photo-${index}` }))
    const html = applyHomePageMeta(
      '<html><head><title>Gallery</title></head><body><div id="root"><div id="splash-screen"></div></div></body></html>',
      photos,
      siteConfig,
    )
    const document = new DOMParser().parseFromString(html, 'text/html')

    expect(document.querySelectorAll('#root nav a')).toHaveLength(STATIC_GALLERY_LINK_LIMIT)
    expect(document.querySelector('#root nav a')?.textContent).toBe('标题 </script>')
    expect(document.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe('https://photos.example.com/')
    expect(document.querySelector('script[data-afilmory-page-jsonld]')?.textContent).toContain('"@type":"WebSite"')
    expect(html).not.toContain('https://cdn.example.com/photos/photo.jpg')

    const photoHtml = applyPhotoPageMeta(html, createPhotoPageMeta(photo, siteConfig))
    const photoDocument = new DOMParser().parseFromString(photoHtml, 'text/html')
    expect(photoDocument.querySelectorAll('[data-afilmory-static-content]')).toHaveLength(1)
    expect(photoDocument.querySelector('#root picture img')).not.toBeNull()
    expect(photoDocument.querySelector('#root nav')).toBeNull()
    expect(photoDocument.querySelectorAll('script[type="application/ld+json"]')).toHaveLength(1)
  })

  it('makes the generated fallback visible without JavaScript and credits the known author without inventing a license', () => {
    const template = readFileSync(path.resolve('apps/web/index.html'), 'utf-8')
    const meta = createPhotoPageMeta(photo, siteConfig)

    expect(template).toMatch(/<noscript><style>#splash-screen\s*\{\s*display: none !important;/)
    expect(meta.jsonLd.creator).toEqual({ '@type': 'Person', name: 'Jacky', url: 'https://example.com' })
    expect(meta.jsonLd.creditText).toBe('Jacky')
    expect(meta.jsonLd.copyrightNotice).toBe('Jacky')
    expect(meta.jsonLd).not.toHaveProperty('license')
    expect(meta.jsonLd).not.toHaveProperty('uploadDate')
  })

  it('replaces owned JSON-LD nodes across legacy names, attribute forms, and repeated rendering', () => {
    const template = `<html><head><title>Gallery</title>
      <script type="application/ld+json" data-afilmory-page-jsonld>{"old":1}</script>
      <script title="quoted > value" DATA-AFILMORY-PHOTO-JSONLD=legacy>{"old":2}</script>
      <script data-afilmory-page-jsonld='owned'>{"old":3}</script>
      </head><body><div id="root"></div></body></html>`
    const meta = createPhotoPageMeta(photo, siteConfig)
    const once = applyPhotoPageMeta(template, meta)
    const twice = applyPhotoPageMeta(once, meta)

    for (const html of [once, twice]) {
      const document = new DOMParser().parseFromString(html, 'text/html')
      expect(document.querySelectorAll('script')).toHaveLength(1)
      expect(JSON.parse(document.querySelector('script')!.textContent!)).toEqual(meta.jsonLd)
      expect(document.querySelectorAll('#root [data-afilmory-static-content]')).toHaveLength(1)
      expect(document.querySelectorAll('link[data-afilmory-preload="photo"]')).toHaveLength(1)
    }
  })

  it('preserves unrelated scripts and marker-like text instead of treating them as owned nodes', () => {
    const runtime = `window.example = '<script data-afilmory-page-jsonld>';`
    const template = `<!doctype html><html><head><title>Gallery</title>
      <script id="runtime" type="module">${runtime}</script>
      <script id="config" data-note="data-afilmory-page-jsonld">window.config = {};</script>
      <script id="analytics" src="/data-afilmory-photo-jsonld.js"></script>
      <script id="unrelated" type="application/ld+json">{"@type":"Organization"}</script>
      <!-- <script data-afilmory-page-jsonld>comment example</script> -->
      </head><body><div id="root"></div></body></html>`
    const html = applyPhotoPageMeta(template, createPhotoPageMeta(photo, siteConfig))
    const document = new DOMParser().parseFromString(html, 'text/html')

    expect(document.doctype?.name).toBe('html')
    expect(document.querySelectorAll('script')).toHaveLength(5)
    expect(document.querySelector('#runtime')?.textContent).toBe(runtime)
    expect(document.querySelector('#config')?.textContent).toBe('window.config = {};')
    expect(document.querySelector('#analytics')?.getAttribute('src')).toBe('/data-afilmory-photo-jsonld.js')
    expect(document.querySelector('#unrelated')?.textContent).toBe('{"@type":"Organization"}')
    expect(html).toContain('<!-- <script data-afilmory-page-jsonld>comment example</script> -->')
  })

  it('removes nested owned nodes once without deleting the surrounding document', () => {
    const template = `<html><head><title>Gallery</title></head><body>
      <svg><script data-afilmory-page-jsonld><script data-afilmory-photo-jsonld>{}</script></script></svg>
      <p id="sentinel">Keep this content</p><div id="root"></div></body></html>`
    const html = applyHomePageMeta(template, [photo], siteConfig)
    const document = new DOMParser().parseFromString(html, 'text/html')

    expect(document.querySelector('#sentinel')?.textContent).toBe('Keep this content')
    expect(document.querySelectorAll('svg script')).toHaveLength(0)
    expect(document.querySelectorAll('#root nav a')).toHaveLength(1)
    expect(document.querySelectorAll('script[data-afilmory-page-jsonld]')).toHaveLength(1)
  })

  it.each([
    '<scrip<script data-afilmory-page-jsonld>{}</script>t id="reassembled">void 0</script>',
    '<<script data-afilmory-photo-jsonld>{}</script>script id="reassembled">void 0</script>',
  ])('does not turn inert fragments into a script when replacing metadata: %s', (fragment) => {
    const template = `<html><head><title>Gallery</title></head><body>${fragment}<div id="root"></div></body></html>`
    const before = new DOMParser().parseFromString(template, 'text/html')
    expect(before.querySelector('script#reassembled')).toBeNull()

    const html = applyPhotoPageMeta(template, createPhotoPageMeta(photo, siteConfig))
    const document = new DOMParser().parseFromString(html, 'text/html')
    expect(document.querySelector('script#reassembled')).toBeNull()
    expect(document.querySelectorAll('script:not([type="application/ld+json"])')).toHaveLength(0)
    expect(document.querySelectorAll('script[data-afilmory-page-jsonld]')).toHaveLength(1)
  })

  it.each([
    '</script><script id="injected">void 0</script><!-- & $&',
    '</title><script id="injected">void 0</script><!-- & $&',
  ])('round-trips hostile metadata text without opening another script element: %s', (title) => {
    const meta = createPhotoPageMeta({ ...photo, titles: { 'zh-CN': title } }, siteConfig)
    const html = applyPhotoPageMeta(
      '<html><head><title>Gallery</title></head><body><div id="root"></div></body></html>',
      meta,
    )
    const document = new DOMParser().parseFromString(html, 'text/html')

    expect(document.querySelectorAll('script')).toHaveLength(1)
    expect(JSON.parse(document.querySelector('script')!.textContent!)).toEqual(meta.jsonLd)
    expect(document.querySelector('#root h1')?.textContent).toBe(title)
    expect(document.title).toBe(meta.title)
  })

  it('uses the first candidate of the selected responsive source for preload', () => {
    const preload = createPhotoPreloadLink(photo)
    expect(preload).toContain('href="/thumbnails/photo-360.webp"')
    expect(preload).toContain('type="image/webp"')
  })

  it('preserves literal dollar signs and markup-like text when updating an existing head', () => {
    const textPhoto = { ...photo, titles: { 'zh-CN': '$& <light>' }, descriptions: { 'zh-CN': '$1 & light' } }
    const html = applyPhotoPageMeta(
      '<html><head><title>Old</title><meta name="description" content="Old"></head><body><div id="root"></div></body></html>',
      createPhotoPageMeta(textPhoto, siteConfig),
    )
    const document = new DOMParser().parseFromString(html, 'text/html')
    expect(document.title).toBe('$& <light> | Gallery')
    expect(document.querySelector('meta[name="description"]')?.getAttribute('content')).toBe('$1 & light')
    expect(document.querySelector('#root h1')?.textContent).toBe('$& <light>')
  })

  it('uses the production WebP thumbnail when the original format is not social-preview compatible', () => {
    const heicPhoto = {
      ...photo,
      originalUrl: 'https://cdn.example.com/photos/photo.heic?version=1',
      mimeType: 'image/heic',
    }
    const html = applyPhotoPageMeta(
      '<html><head><title>x</title></head><body></body></html>',
      createPhotoPageMeta(heicPhoto, siteConfig),
    )

    expect(html).toContain('property="og:image" content="https://photos.example.com/thumbnails/photo-640.webp"')
    expect(html).toContain('property="twitter:image" content="https://photos.example.com/thumbnails/photo-640.webp"')
    expect(html).not.toContain('property="og:image" content="https://cdn.example.com/photos/photo.heic?version=1"')
  })

  it('describes independent videos as VideoObject', () => {
    const video = {
      ...photo,
      mediaType: 'video' as const,
      originalUrl: 'https://cdn.example.com/photos/movie.mp4',
      videoUrl: 'https://cdn.example.com/photos/movie.mp4',
      mimeType: 'video/mp4',
      duration: 12.5,
    }
    const html = applyPhotoPageMeta(
      '<html><head><title>x</title></head><body></body></html>',
      createPhotoPageMeta(video, siteConfig),
    )
    expect(html).toContain('"@type":"VideoObject"')
    expect(html).toContain('"duration":"PT12.5S"')
    expect(html).toContain('property="og:image" content="https://photos.example.com/thumbnails/photo-640.webp"')
    expect(html).toContain('property="twitter:image" content="https://photos.example.com/thumbnails/photo-640.webp"')
    expect(html).toContain('poster="/thumbnails/photo-640.webp"')
    expect(html).not.toContain('property="og:image" content="https://cdn.example.com/photos/movie.mp4"')
    expect(html).toContain('<video controls')
  })

  it('writes static entry pages for client routes without relying on an SPA fallback', () => {
    const outputDirectory = mkdtempSync(path.join(tmpdir(), 'afilmory-static-routes-'))
    const baseHtml = `<!doctype html><html><head><link rel="canonical" href="https://photos.example.com/"><meta property="og:url" content="https://photos.example.com/"><meta property="twitter:url" content="https://photos.example.com/"><link rel="preload" as="image" data-afilmory-preload="gallery" href="/gallery.webp"></head><body><div id="root"></div></body></html>`

    try {
      expect(writeStaticAppRoutePages(outputDirectory, baseHtml, siteConfig)).toBe(STATIC_APP_ROUTES.length)

      for (const routePath of STATIC_APP_ROUTES) {
        const html = readFileSync(path.join(outputDirectory, routePath, 'index.html'), 'utf-8')
        const expectedUrl = `https://photos.example.com/${routePath}/`

        expect(html).toContain('<div id="root"><main data-afilmory-static-content>')
        expect(html).toContain(`rel="canonical" href="${expectedUrl}"`)
        expect(html).toContain(`property="og:url" content="${expectedUrl}"`)
        expect(html).toContain(`property="twitter:url" content="${expectedUrl}"`)
        expect(html).not.toContain('data-afilmory-preload="gallery"')
      }

      expect(existsSync(path.join(outputDirectory, 'manifest', 'index.html'))).toBe(false)
    } finally {
      rmSync(outputDirectory, { force: true, recursive: true })
    }
  })
})
