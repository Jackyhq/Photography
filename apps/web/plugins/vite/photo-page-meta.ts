import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'

import type { PhotoManifestItem } from '@afilmory/builder'
import type { Plugin } from 'vite'

import type { SiteConfig } from '../../../../site.config'
import { MANIFEST_PATH } from './__internal__/constants'

interface ManifestFile {
  data?: PhotoManifestItem[]
}

interface PhotoPageMeta {
  title: string
  description: string
  url: string
  image?: string
}

export function createPhotoPageMetaPlugin(siteConfig: SiteConfig): Plugin {
  return {
    name: 'photo-page-meta',
    apply: 'build',
    writeBundle(options, bundle) {
      const indexAsset = bundle['index.html']
      if (!indexAsset || indexAsset.type !== 'asset' || typeof indexAsset.source !== 'string') return

      const outputDirectory = options.dir ? path.resolve(options.dir) : path.resolve('dist')

      const manifest = JSON.parse(readFileSync(MANIFEST_PATH, 'utf-8')) as ManifestFile
      const photos = Array.isArray(manifest.data) ? manifest.data : []

      for (const photo of photos) {
        const meta = createPhotoPageMeta(photo, siteConfig)
        const html = applyPhotoPageMeta(indexAsset.source, meta)
        const filePath = path.join(outputDirectory, 'photos', photo.id, 'index.html')

        mkdirSync(path.dirname(filePath), { recursive: true })
        writeFileSync(filePath, html)
      }

      console.info(`Generated ${photos.length} static photo pages`)
    },
  }
}

function createPhotoPageMeta(photo: PhotoManifestItem, siteConfig: SiteConfig): PhotoPageMeta {
  const title = `${photo.title || photo.id} | ${siteConfig.name}`
  const baseUrl = siteConfig.url.replace(/\/+$/, '')

  return {
    title,
    description: getPhotoDescription(photo) || siteConfig.description,
    url: `${baseUrl}/photos/${photo.id}/`,
    image: toAbsoluteUrl(photo.thumbnailUrl || photo.originalUrl, siteConfig.url),
  }
}

function applyPhotoPageMeta(html: string, meta: PhotoPageMeta): string {
  let next = html.replace(/<title>.*?<\/title>/i, `<title>${escapeHtmlText(meta.title)}</title>`)

  next = upsertMeta(next, 'name', 'description', meta.description)
  next = upsertMeta(next, 'property', 'og:type', 'article')
  next = upsertMeta(next, 'property', 'og:url', meta.url)
  next = upsertMeta(next, 'property', 'og:title', meta.title)
  next = upsertMeta(next, 'property', 'og:description', meta.description)
  next = upsertMeta(next, 'property', 'twitter:url', meta.url)
  next = upsertMeta(next, 'property', 'twitter:title', meta.title)
  next = upsertMeta(next, 'property', 'twitter:description', meta.description)
  next = upsertLink(next, 'canonical', meta.url)

  if (meta.image) {
    next = upsertMeta(next, 'property', 'og:image', meta.image)
    next = upsertMeta(next, 'property', 'twitter:image', meta.image)
  }

  return next
}

function upsertMeta(html: string, attribute: 'name' | 'property', key: string, content: string): string {
  const pattern = new RegExp(`<meta\\s+[^>]*${attribute}=["']${escapeRegExp(key)}["'][^>]*>`, 'gi')
  let matched = false
  const next = html.replace(pattern, (tag) => {
    matched = true
    if (/\scontent=(?:"[^"]*"|'[^']*')/i.test(tag)) {
      return tag.replace(/\scontent=(?:"[^"]*"|'[^']*')/i, ` content="${escapeAttribute(content)}"`)
    }

    return tag.replace(/\s*\/?>$/, ` content="${escapeAttribute(content)}" />`)
  })

  if (matched) return next

  return next.replace(
    '</head>',
    `    <meta ${attribute}="${escapeAttribute(key)}" content="${escapeAttribute(content)}" />\n  </head>`,
  )
}

function upsertLink(html: string, rel: string, href: string): string {
  const pattern = new RegExp(`<link\\s+[^>]*rel=["']${escapeRegExp(rel)}["'][^>]*>`, 'gi')
  let matched = false
  const next = html.replace(pattern, (tag) => {
    matched = true
    if (/\shref=(?:"[^"]*"|'[^']*')/i.test(tag)) {
      return tag.replace(/\shref=(?:"[^"]*"|'[^']*')/i, ` href="${escapeAttribute(href)}"`)
    }

    return tag.replace(/\s*\/?>$/, ` href="${escapeAttribute(href)}" />`)
  })

  if (matched) return next

  return next.replace(
    '</head>',
    `    <link rel="${escapeAttribute(rel)}" href="${escapeAttribute(href)}" />\n  </head>`,
  )
}

function getPhotoDescription(photo: PhotoManifestItem): string {
  return photo.descriptions?.['zh-CN']?.trim() || photo.descriptions?.en?.trim() || photo.description?.trim() || ''
}

function toAbsoluteUrl(value: string | undefined, baseUrl: string): string | undefined {
  if (!value) return undefined

  try {
    return new URL(value, baseUrl).toString()
  } catch {
    return value
  }
}

function escapeAttribute(value: string): string {
  return value.replaceAll(/[&"<]/g, (char) => {
    switch (char) {
      case '&': {
        return '&amp;'
      }
      case '"': {
        return '&quot;'
      }
      case '<': {
        return '&lt;'
      }
      default: {
        return char
      }
    }
  })
}

function escapeHtmlText(value: string): string {
  return value.replaceAll(/[<>&]/g, (char) => {
    switch (char) {
      case '<': {
        return '&lt;'
      }
      case '>': {
        return '&gt;'
      }
      case '&': {
        return '&amp;'
      }
      default: {
        return char
      }
    }
  })
}

function escapeRegExp(value: string): string {
  return value.replaceAll(/[.*+?^${}()|[\]\\]/g, '\\$&')
}
