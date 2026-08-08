import type { PhotoManifestItem } from '@afilmory/builder'

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
  const mainPageXml = `  <url>
    <loc>${escapeXml(baseUrl)}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>`

  const photoUrls = photos
    .map((photo) => {
      const date = photo.lastModified || photo.dateTaken
      const lastmod = date ? new Date(date).toISOString() : now
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
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>${imageXml}
  </url>`
    })
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${mainPageXml}
${photoUrls}
</urlset>\n`
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
