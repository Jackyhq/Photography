import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'

import type { PhotoManifestItem } from '@afilmory/builder'
import type { Plugin } from 'vite'

import type { SiteConfig } from '../../../../site.config'
import { MANIFEST_PATH } from './__internal__/constants'
import { getPreferredPhotoDescription, getPreferredPhotoTitle } from './__internal__/photo-text'
import { serializeForInlineScript } from './inline-script'

interface ManifestFile {
  data?: PhotoManifestItem[]
}

export const STATIC_APP_ROUTES = ['explory'] as const

interface PhotoPageMeta {
  title: string
  description: string
  url: string
  image?: string
  mediaType: 'photo' | 'video'
  jsonLd: Record<string, unknown>
  preload: string
  noscript: string
}

export function createPhotoPageMetaPlugin(siteConfig: SiteConfig): Plugin {
  return {
    name: 'photo-page-meta',
    apply: 'build',
    writeBundle(options, bundle) {
      const indexAsset = bundle['index.html']
      if (!indexAsset || indexAsset.type !== 'asset' || typeof indexAsset.source !== 'string') return

      const outputDirectory = options.dir ? path.resolve(options.dir) : path.resolve('dist')
      const photosOutputDirectory = path.join(outputDirectory, 'photos')

      const manifest = JSON.parse(readFileSync(MANIFEST_PATH, 'utf-8')) as ManifestFile
      const photos = Array.isArray(manifest.data) ? manifest.data : []

      for (const photo of photos) {
        const meta = createPhotoPageMeta(photo, siteConfig)
        const html = applyPhotoPageMeta(indexAsset.source, meta)
        const filePath = resolvePhotoPagePath(photosOutputDirectory, photo.id)

        mkdirSync(path.dirname(filePath), { recursive: true })
        writeFileSync(filePath, html)
      }

      const staticAppRouteCount = writeStaticAppRoutePages(outputDirectory, indexAsset.source, siteConfig)

      console.info(`Generated ${photos.length} static photo pages and ${staticAppRouteCount} static app route pages`)
    },
  }
}

export function writeStaticAppRoutePages(outputDirectory: string, indexHtml: string, siteConfig: SiteConfig): number {
  for (const routePath of STATIC_APP_ROUTES) {
    const html = applyStaticAppRouteMeta(indexHtml, routePath, siteConfig)
    const filePath = resolveStaticAppRoutePagePath(outputDirectory, routePath)

    mkdirSync(path.dirname(filePath), { recursive: true })
    writeFileSync(filePath, html)
  }

  return STATIC_APP_ROUTES.length
}

export function applyStaticAppRouteMeta(html: string, routePath: string, siteConfig: SiteConfig): string {
  const baseUrl = siteConfig.url.replace(/\/+$/, '')
  const normalizedRoutePath = routePath.replaceAll(/^\/+|\/+$/g, '')
  const url = `${baseUrl}/${normalizedRoutePath}/`

  let next = html.replaceAll(/<link[^>]+data-afilmory-preload=["']gallery["'][^>]*>/gi, '')
  next = upsertMeta(next, 'property', 'og:url', url)
  next = upsertMeta(next, 'property', 'twitter:url', url)
  next = upsertLink(next, 'canonical', url)

  return next
}

export function createPhotoPageMeta(photo: PhotoManifestItem, siteConfig: SiteConfig): PhotoPageMeta {
  const title = `${getPreferredPhotoTitle(photo, photo.id)} | ${siteConfig.name}`
  const baseUrl = siteConfig.url.replace(/\/+$/, '')
  const description = getPreferredPhotoDescription(photo, siteConfig.description)
  const url = `${baseUrl}/photos/${toSafePathSegment(photo.id)}/`
  const mediaType = photo.mediaType === 'video' ? 'video' : 'photo'

  return {
    title,
    description,
    url,
    image: toAbsoluteUrl(photo.thumbnailUrl || photo.originalUrl, siteConfig.url),
    mediaType,
    jsonLd: createPhotoStructuredData(photo, siteConfig, { title, description, url, mediaType }),
    preload: createPhotoPreloadLink(photo),
    noscript: createPhotoNoscriptFigure(photo, description),
  }
}

export function applyPhotoPageMeta(html: string, meta: PhotoPageMeta): string {
  let next = html
    .replaceAll(/<link[^>]+data-afilmory-preload=["']gallery["'][^>]*>/gi, '')
    .replace(/<title>.*?<\/title>/i, `<title>${escapeHtmlText(meta.title)}</title>`)

  next = upsertMeta(next, 'name', 'description', meta.description)
  next = upsertMeta(next, 'property', 'og:type', meta.mediaType === 'video' ? 'video.other' : 'article')
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

  const headContent = `${meta.preload}<script type="application/ld+json" data-afilmory-photo-jsonld>${serializeJsonLd(meta.jsonLd)}</script>`
  next = next.replace('</head>', `${headContent}</head>`)
  next = next.replace('</body>', `${meta.noscript}</body>`)

  return next
}

export function createPhotoPreloadLink(
  photo: Pick<PhotoManifestItem, 'thumbnailUrl' | 'thumbnailSrcSet' | 'thumbnailWebpSrcSet'>,
): string {
  const webpSrcSet = photo.thumbnailWebpSrcSet?.trim()
  const srcSet = webpSrcSet || photo.thumbnailSrcSet?.trim()
  const href = (srcSet ? getFirstSrcFromSrcSet(srcSet) : '') || photo.thumbnailUrl
  if (!href) return ''

  const attributes = [
    'rel="preload"',
    'as="image"',
    'data-afilmory-preload="photo"',
    `href="${escapeAttribute(href)}"`,
    'imagesizes="(max-width: 1024px) 100vw, 1024px"',
    'fetchpriority="high"',
  ]

  if (srcSet) attributes.push(`imagesrcset="${escapeAttribute(srcSet)}"`)
  if (webpSrcSet) attributes.push('type="image/webp"')

  return `<link ${attributes.join(' ')}>`
}

function createPhotoStructuredData(
  photo: PhotoManifestItem,
  siteConfig: SiteConfig,
  meta: Pick<PhotoPageMeta, 'title' | 'description' | 'url' | 'mediaType'>,
): Record<string, unknown> {
  const contentUrl = toAbsoluteUrl(
    meta.mediaType === 'video' ? photo.videoUrl || photo.originalUrl : photo.originalUrl,
    siteConfig.url,
  )
  const thumbnailUrl = toAbsoluteUrl(photo.thumbnailUrl, siteConfig.url)
  const uploadDate = toIsoDate(photo.dateTaken || photo.lastModified)

  const result: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': meta.mediaType === 'video' ? 'VideoObject' : 'ImageObject',
    name: meta.title,
    description: meta.description,
    url: meta.url,
    contentUrl,
    thumbnailUrl,
    uploadDate,
    encodingFormat: photo.mimeType,
    width: photo.width > 0 ? photo.width : undefined,
    height: photo.height > 0 ? photo.height : undefined,
  }

  if (meta.mediaType === 'video' && typeof photo.duration === 'number' && Number.isFinite(photo.duration)) {
    result.duration = `PT${Math.max(0, photo.duration)}S`
  }

  return Object.fromEntries(Object.entries(result).filter(([, value]) => value !== undefined))
}

function createPhotoNoscriptFigure(photo: PhotoManifestItem, description: string): string {
  const title = getPreferredPhotoTitle(photo, photo.id)
  const caption = description && description !== title ? `${title} — ${description}` : title
  const dimensions = [
    photo.width > 0 ? `width="${photo.width}"` : '',
    photo.height > 0 ? `height="${photo.height}"` : '',
  ]
    .filter(Boolean)
    .join(' ')

  let media: string
  if (photo.mediaType === 'video') {
    const source = photo.videoUrl || photo.originalUrl
    const type = photo.mimeType ? ` type="${escapeAttribute(photo.mimeType)}"` : ''
    const poster = photo.thumbnailUrl ? ` poster="${escapeAttribute(photo.thumbnailUrl)}"` : ''
    media = `<video controls preload="metadata"${poster} ${dimensions}><source src="${escapeAttribute(source)}"${type}></video>`
  } else {
    const fallback = photo.thumbnailUrl || photo.originalUrl
    const webpSource = photo.thumbnailWebpSrcSet
      ? `<source type="image/webp" srcset="${escapeAttribute(photo.thumbnailWebpSrcSet)}">`
      : ''
    const srcSet = photo.thumbnailSrcSet ? ` srcset="${escapeAttribute(photo.thumbnailSrcSet)}"` : ''
    media = `<picture>${webpSource}<img src="${escapeAttribute(fallback)}"${srcSet} alt="${escapeAttribute(title)}" ${dimensions}></picture>`
  }

  return `<noscript><figure data-afilmory-photo-noscript>${media}<figcaption>${escapeHtmlText(caption)}</figcaption></figure></noscript>`
}

function serializeJsonLd(value: unknown): string {
  return serializeForInlineScript(value)
}

function getFirstSrcFromSrcSet(srcSet: string): string {
  return srcSet.split(',')[0]?.trim().split(/\s+/)[0] ?? ''
}

function toIsoDate(value: string | undefined): string | undefined {
  if (!value) return undefined
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? undefined : date.toISOString()
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

function resolvePhotoPagePath(photosOutputDirectory: string, photoId: string): string {
  const safePhotoId = toSafePathSegment(photoId)
  const filePath = path.join(photosOutputDirectory, safePhotoId, 'index.html')
  const relativePath = path.relative(photosOutputDirectory, filePath)

  if (relativePath === '..' || relativePath.startsWith(`..${path.sep}`) || path.isAbsolute(relativePath)) {
    throw new Error(`Refusing to write photo page outside photos output directory for id: ${photoId}`)
  }

  return filePath
}

function resolveStaticAppRoutePagePath(outputDirectory: string, routePath: string): string {
  const normalizedRoutePath = routePath.replaceAll(/^\/+|\/+$/g, '')
  const filePath = path.resolve(outputDirectory, normalizedRoutePath, 'index.html')
  const relativePath = path.relative(outputDirectory, filePath)

  if (
    !normalizedRoutePath ||
    relativePath === '..' ||
    relativePath.startsWith(`..${path.sep}`) ||
    path.isAbsolute(relativePath)
  ) {
    throw new Error(`Refusing to write static app route outside output directory: ${routePath}`)
  }

  return filePath
}

function toSafePathSegment(value: string): string {
  return encodeURIComponent(value)
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
