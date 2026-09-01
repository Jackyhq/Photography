import { existsSync, mkdtempSync, readFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'

import type { PhotoManifestItem } from '@afilmory/builder/photo-types'
import { describe, expect, it } from 'vitest'

import type { SiteConfig } from '../../../../site.config'
import {
  applyPhotoPageMeta,
  createPhotoPageMeta,
  createPhotoPreloadLink,
  STATIC_APP_ROUTES,
  writeNotFoundPage,
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
    expect(html).toContain('"creator":{"@type":"Person","@id":"https://example.com/#person"')
    expect(html).toContain('"creditText":"Jacky"')
    expect(html).toContain('"copyrightNotice":"© Jacky"')
    expect(html).toContain('"isPartOf":{"@id":"https://photos.example.com/#website"}')
    expect(html).toContain('"representativeOfPage":true')
    expect(html).toContain('property="og:image" content="https://cdn.example.com/photos/photo.jpg"')
    expect(html).toContain('property="og:image:alt" content="标题 &lt;/script&gt; | Gallery"')
    expect(html).toContain('property="og:image:width" content="1200"')
    expect(html).toContain('property="og:image:height" content="800"')
    expect(html).toContain('property="twitter:image" content="https://cdn.example.com/photos/photo.jpg"')
    expect(html).toContain('"thumbnailUrl":"https://photos.example.com/thumbnails/photo-640.webp"')
    expect(html).toContain('<img src="/thumbnails/photo-640.webp"')
    expect(html).not.toContain('/thumbnails/photo.jpg')
    expect(html).not.toContain('标题 </script>')
    expect(html).toContain('data-afilmory-photo-noscript')
    expect(html).toContain('photos/photo%2Funsafe/')
  })

  it('uses the first candidate of the selected responsive source for preload', () => {
    const preload = createPhotoPreloadLink(photo)
    expect(preload).toContain('href="/thumbnails/photo-360.webp"')
    expect(preload).toContain('type="image/webp"')
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

        expect(html).toContain('<div id="root"></div>')
        expect(html).toContain('<title>照片地图 | Gallery</title>')
        expect(html).toContain('name="robots" content="noindex, follow"')
        expect(html).toContain(`rel="canonical" href="${expectedUrl}"`)
        expect(html).toContain(`property="og:url" content="${expectedUrl}"`)
        expect(html).toContain(`property="twitter:url" content="${expectedUrl}"`)
        expect(html).not.toContain('data-afilmory-preload="gallery"')
      }

      writeNotFoundPage(outputDirectory, baseHtml, siteConfig)
      const notFoundHtml = readFileSync(path.join(outputDirectory, '404.html'), 'utf-8')
      expect(notFoundHtml).toContain('<title>页面未找到 | Gallery</title>')
      expect(notFoundHtml).toContain('name="robots" content="noindex, follow"')
      expect(notFoundHtml).not.toContain('rel="canonical"')
      expect(notFoundHtml).not.toContain('property="og:url"')
      expect(notFoundHtml).not.toContain('property="twitter:url"')

      expect(existsSync(path.join(outputDirectory, 'manifest', 'index.html'))).toBe(false)
    } finally {
      rmSync(outputDirectory, { force: true, recursive: true })
    }
  })
})
