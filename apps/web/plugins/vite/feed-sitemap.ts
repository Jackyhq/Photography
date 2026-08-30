import { readFileSync } from 'node:fs'

import type { PhotoManifestItem } from '@afilmory/builder/photo-types'
import { tsImport } from 'tsx/esm/api'
import type { Plugin } from 'vite'

import type { SiteConfig } from '../../../../site.config'
import { MANIFEST_PATH } from './__internal__/constants'
import { normalizeProductionThumbnail } from './__internal__/production-thumbnail'
import { generateSitemap } from './sitemap'

type ReadManifest = () => string

const readManifest: ReadManifest = () => readFileSync(MANIFEST_PATH, 'utf-8')

export function createFeedSitemapPlugin(siteConfig: SiteConfig, readManifestFile: ReadManifest = readManifest): Plugin {
  return {
    name: 'feed-sitemap-generator',
    apply: 'build',
    async generateBundle() {
      try {
        const { generateRSSFeed } = await tsImport('@afilmory/utils', import.meta.url)
        const sourcePhotos: PhotoManifestItem[] = JSON.parse(readManifestFile()).data
        const photosData = sourcePhotos.map((photo) => normalizeProductionThumbnail(photo))

        // Sort photos by date taken (newest first)
        const sortedPhotos = photosData.sort(
          (a, b) => new Date(b.dateTaken).getTime() - new Date(a.dateTaken).getTime(),
        )

        // Generate RSS feed
        const rssXml = generateRSSFeed(sortedPhotos, {
          title: siteConfig.title,
          description: siteConfig.description,
          url: siteConfig.url,
          author: {
            name: siteConfig.author.name,
            url: siteConfig.author.url,
            avatar: siteConfig.author.avatar,
          },
        })

        // Generate sitemap
        const sitemapXml = generateSitemap(sortedPhotos, siteConfig)

        // Emit RSS feed
        this.emitFile({
          type: 'asset',
          fileName: 'feed.xml',
          source: rssXml,
        })

        // Emit sitemap
        this.emitFile({
          type: 'asset',
          fileName: 'sitemap.xml',
          source: sitemapXml,
        })

        console.info(`Generated RSS feed with ${sortedPhotos.length} photos`)
        console.info(`Generated sitemap with ${sortedPhotos.length + 1} URLs`)
      } catch (error) {
        throw new Error('Failed to generate RSS feed and sitemap', { cause: error })
      }
    },
  }
}
