// @vitest-environment node

import type { PhotoManifestItem } from '@afilmory/builder/photo-types'
import { describe, expect, it, vi } from 'vitest'

import type { SiteConfig } from '../../../../site.config'
import { createFeedSitemapPlugin } from './feed-sitemap'
import { generateRobotsTxt, generateSitemap } from './sitemap'

const config = {
  name: 'Gallery',
  title: 'Gallery',
  description: 'Description',
  url: 'https://photos.example.com/',
  accentColor: '#000',
  author: { name: 'Jacky', url: 'https://example.com' },
} satisfies SiteConfig

describe('image sitemap', () => {
  it('adds escaped image metadata and safe photo routes', () => {
    const photo = {
      id: 'photo/1',
      title: 'Title & light',
      description: 'Sea < sky',
      dateTaken: '2026-01-02T03:04:05.000Z',
      lastModified: '2026-01-02T03:04:05.000Z',
      originalUrl: '/media/photo.jpg',
    } as PhotoManifestItem

    const sitemap = generateSitemap([photo], config)
    expect(sitemap).toContain('xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"')
    expect(sitemap).toContain('<loc>https://photos.example.com/photos/photo%2F1/</loc>')
    expect(sitemap).toContain('<image:loc>https://photos.example.com/media/photo.jpg</image:loc>')
    expect(sitemap).toContain('<image:title>Title &amp; light</image:title>')
    expect(sitemap).toContain('<image:caption>Sea &lt; sky</image:caption>')
    expect(sitemap.match(/<lastmod>2026-01-02T03:04:05.000Z<\/lastmod>/g)).toHaveLength(2)
    expect(sitemap).not.toContain('<priority>')
    expect(sitemap).not.toContain('<changefreq>')
  })

  it('generates robots.txt from the canonical site URL', () => {
    expect(generateRobotsTxt(config)).toBe('User-agent: *\nAllow: /\nSitemap: https://photos.example.com/sitemap.xml\n')
  })

  it('uses a web-indexable thumbnail for unsupported original image formats', () => {
    const photo = {
      id: 'heic-photo',
      title: 'HEIC photo',
      description: 'Converted thumbnail',
      dateTaken: '2026-01-02T03:04:05.000Z',
      lastModified: '2026-01-02T03:04:05.000Z',
      originalUrl: 'https://cdn.example.com/photos/photo.heic?version=1',
      thumbnailUrl: '/thumbnails/photo.jpg',
    } as PhotoManifestItem

    const sitemap = generateSitemap([photo], config)
    expect(sitemap).toContain('<image:loc>https://photos.example.com/thumbnails/photo.jpg</image:loc>')
    expect(sitemap).not.toContain('.heic')
  })

  it('emits the production WebP thumbnail for video sitemap metadata', async () => {
    const video = {
      id: 'video-1',
      mediaType: 'video',
      title: 'Video',
      description: 'Video description',
      dateTaken: '2026-01-02T03:04:05.000Z',
      lastModified: '2026-01-02T03:04:05.000Z',
      originalUrl: 'https://cdn.example.com/photos/video.mp4',
      thumbnailUrl: '/thumbnails/video-1.jpg',
      thumbnailSrcSet: '/thumbnails/video-1.jpg 640w',
      thumbnailWebpSrcSet: '/thumbnails/video-1-360.webp 360w, /thumbnails/video-1-640.webp 640w',
    } as PhotoManifestItem
    const plugin = createFeedSitemapPlugin(config, () => JSON.stringify({ data: [video] }))
    const { generateBundle } = plugin

    expect(generateBundle).toBeTypeOf('function')
    if (typeof generateBundle !== 'function') return

    const emitFile = vi.fn()
    await generateBundle.call({ emitFile } as never, {} as never, {} as never, false)
    const sitemapAsset = emitFile.mock.calls
      .map(([asset]) => asset as { fileName?: string; source?: string })
      .find((asset) => asset.fileName === 'sitemap.xml')
    const robotsAsset = emitFile.mock.calls
      .map(([asset]) => asset as { fileName?: string; source?: string })
      .find((asset) => asset.fileName === 'robots.txt')

    expect(sitemapAsset?.source).toContain(
      '<image:loc>https://photos.example.com/thumbnails/video-1-640.webp</image:loc>',
    )
    expect(sitemapAsset?.source).not.toContain('/thumbnails/video-1.jpg')
    expect(robotsAsset?.source).toContain('Sitemap: https://photos.example.com/sitemap.xml')
  })

  it('fails the build when feed and sitemap generation cannot read the manifest', async () => {
    const manifestError = new Error('manifest unavailable')
    const plugin = createFeedSitemapPlugin(config, () => {
      throw manifestError
    })
    const { generateBundle } = plugin

    expect(generateBundle).toBeTypeOf('function')
    if (typeof generateBundle !== 'function') return

    const emitFile = vi.fn()
    await expect(generateBundle.call({ emitFile } as never, {} as never, {} as never, false)).rejects.toThrow(
      'Failed to generate RSS feed and sitemap',
    )
    expect(emitFile).not.toHaveBeenCalled()
  })
})
