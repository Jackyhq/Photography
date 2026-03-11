import type { PhotoManifestItem } from '@afilmory/builder'
import __MANIFEST__ from '@afilmory/data/manifest'
import siteConfig from '@config'

export const GET = async () => {
  const photos = __MANIFEST__.data as unknown as PhotoManifestItem[]
  const sitemapXml = generateSitemap(photos)

  return new Response(sitemapXml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}

function escapeXml(unsafe: string): string {
  return unsafe.replaceAll(/[<>&'"]/g, (c) => {
    switch (c) {
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
        return c
      }
    }
  })
}

function generateSitemap(photos: PhotoManifestItem[]): string {
  const now = new Date().toISOString()
  const baseUrl = siteConfig.url.endsWith('/') ? siteConfig.url.slice(0, -1) : siteConfig.url

  // Main page
  const mainPageXml = `  <url>
    <loc>${escapeXml(baseUrl)}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>`

  // Photo pages
  const photoUrls = photos
    .map((photo) => {
      const date = photo.lastModified || photo.dateTaken
      const lastmod = date ? new Date(date).toISOString() : now
      return `  <url>
    <loc>${escapeXml(`${baseUrl}/${photo.id}`)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`
    })
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${mainPageXml}
${photoUrls}
</urlset>\n`
}
