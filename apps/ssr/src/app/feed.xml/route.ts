import type { PhotoManifestItem } from '@afilmory/builder'
import __MANIFEST__ from '@afilmory/data/manifest'
import { generateRSSFeed } from '@afilmory/utils'
import siteConfig from '@config'

export const GET = async () => {
  const photos = __MANIFEST__.data as unknown as PhotoManifestItem[]

  const rssXml = generateRSSFeed(photos, {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    author: {
      name: siteConfig.author.name,
      url: siteConfig.author.url,
      avatar: siteConfig.author.avatar,
    },
  })

  return new Response(rssXml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}
