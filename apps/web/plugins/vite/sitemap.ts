import type { PhotoManifestItem } from '@afilmory/builder/photo-types'

import type { SiteConfig } from '../../../../site.config'
import { getPreferredPhotoDescription, getPreferredPhotoTitle } from './__internal__/photo-text'

const SEARCH_INDEXABLE_IMAGE_EXTENSION = /\.(?:avif|bmp|gif|jpe?g|png|svg|webp)$/i

function escapeXml(unsafe: string): string {
  return unsafe.replaceAll(/[<>&'"]/g, (character) => {
    switch (character) {
      case '<': {
        return '&lt;'
      }
      case '>': {
        return '&gt;'
      }
      case '&': {
        return '&amp;'
      }
      case "'": {
        return '&apos;'
      }
      case '"': {
        return '&quot;'
      }
      default: {
        return character
      }
    }
  })
}

export function generateSitemap(photos: PhotoManifestItem[], config: SiteConfig): string {
  const now = new Date().toISOString()
  const baseUrl = config.url.endsWith('/') ? config.url.slice(0, -1) : config.url
  const latestContentDate = getLatestContentDate(photos, now)
  const mainPageXml = `  <url>
    <loc>${escapeXml(baseUrl)}</loc>
    <lastmod>${latestContentDate}</lastmod>
  </url>`

  const photoUrls = photos
    .map((photo) => {
      const date = photo.lastModified || photo.dateTaken
      const lastmod = toIsoDate(date, now)
      const imageUrl = toAbsoluteUrl(getSitemapImageSource(photo), baseUrl)
      const imageTitle = getPreferredPhotoTitle(photo)
      const imageCaption = getPreferredPhotoDescription(photo)
      const imageXml = imageUrl
        ? `
    <image:image>
      <image:loc>${escapeXml(imageUrl)}</image:loc>${
        imageTitle
          ? `
      <image:title>${escapeXml(imageTitle)}</image:title>`
          : ''
      }${
        imageCaption
          ? `
      <image:caption>${escapeXml(imageCaption)}</image:caption>`
          : ''
      }
    </image:image>`
        : ''

      return `  <url>
    <loc>${escapeXml(`${baseUrl}/photos/${encodeURIComponent(photo.id)}/`)}</loc>
    <lastmod>${lastmod}</lastmod>${imageXml}
  </url>`
    })
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${mainPageXml}
${photoUrls}
</urlset>\n`
}

export function generateRobotsTxt(config: SiteConfig): string {
  const baseUrl = config.url.replace(/\/+$/u, '')
  return `User-agent: *
Allow: /
Sitemap: ${baseUrl}/sitemap.xml
`
}

function getSitemapImageSource(photo: PhotoManifestItem): string {
  if (photo.mediaType === 'video') return photo.thumbnailUrl
  if (isSearchIndexableImageUrl(photo.originalUrl)) return photo.originalUrl
  return photo.thumbnailUrl
}

function isSearchIndexableImageUrl(value: string | undefined): boolean {
  if (!value) return false

  try {
    return SEARCH_INDEXABLE_IMAGE_EXTENSION.test(new URL(value, 'https://afilmory.local/').pathname)
  } catch {
    return SEARCH_INDEXABLE_IMAGE_EXTENSION.test(value.split(/[?#]/, 1)[0] ?? '')
  }
}

function toAbsoluteUrl(value: string | undefined, baseUrl: string): string | undefined {
  if (!value) return undefined
  try {
    return new URL(value, `${baseUrl}/`).toString()
  } catch {
    return value
  }
}

function getLatestContentDate(photos: PhotoManifestItem[], fallback: string): string {
  const timestamps = photos
    .map((photo) => photo.lastModified || photo.dateTaken)
    .map((value) => (value ? new Date(value).getTime() : Number.NaN))
    .filter(Number.isFinite)

  return timestamps.length > 0 ? new Date(Math.max(...timestamps)).toISOString() : fallback
}

function toIsoDate(value: string | undefined, fallback: string): string {
  if (!value) return fallback
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? fallback : date.toISOString()
}
