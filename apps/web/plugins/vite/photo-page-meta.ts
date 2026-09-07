import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'

import type { PhotoManifestItem } from '@afilmory/builder/photo-types'
import type { DefaultTreeAdapterMap } from 'parse5'
import { parse } from 'parse5'
import type { Plugin } from 'vite'

import type { SiteConfig } from '../../../../site.config'
import type { PageMeta } from '../../src/lib/page-meta'
import { createPhotoMeta, createSitePageMeta } from '../../src/lib/page-meta'
import { getPhotoDetailPath } from '../../src/lib/photo-route'
import { MANIFEST_PATH } from './__internal__/constants'
import { getPreferredPhotoDescription, getPreferredPhotoTitle } from './__internal__/photo-text'
import { normalizeProductionThumbnail } from './__internal__/production-thumbnail'
import { serializeForInlineScript } from './inline-script'

interface ManifestFile {
  data?: PhotoManifestItem[]
}

export const STATIC_GALLERY_LINK_LIMIT = 24

export const STATIC_APP_ROUTES = ['explory'] as const

interface PhotoPageMeta extends PageMeta {
  preload: string
  staticContent: string
}

export function createPhotoPageMetaPlugin(siteConfig: SiteConfig): Plugin {
  return {
    name: 'photo-page-meta',
    apply: 'build',
    generateBundle: {
      order: 'post',
      handler(_options, bundle) {
        const indexAsset = bundle['index.html']
        if (!indexAsset || indexAsset.type !== 'asset' || typeof indexAsset.source !== 'string') return
        const manifest = JSON.parse(readFileSync(MANIFEST_PATH, 'utf-8')) as ManifestFile
        indexAsset.source = applyHomePageMeta(indexAsset.source, manifest.data ?? [], siteConfig)
      },
    },
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
  const meta = createSitePageMeta(siteConfig, routePath)
  const next = applyPageMeta(html.replaceAll(/<link[^>]+data-afilmory-preload=["']gallery["'][^>]*>/gi, ''), meta)
  return replaceStaticContent(
    next,
    `<main data-afilmory-static-content><h1>${escapeHtmlText(siteConfig.title)}</h1><p>${escapeHtmlText(siteConfig.description)}</p><p><a href="/">Back to gallery</a></p><noscript><p>Enable JavaScript to explore the interactive map.</p></noscript></main>`,
  )
}

export function applyHomePageMeta(html: string, photos: PhotoManifestItem[], siteConfig: SiteConfig): string {
  const links = photos
    .toSorted((a, b) => (b.dateTaken || '').localeCompare(a.dateTaken || '') || a.id.localeCompare(b.id))
    .slice(0, STATIC_GALLERY_LINK_LIMIT)
    .map((photo) => {
      const title = getPreferredPhotoTitle(photo, photo.id)
      return `<li><a href="${escapeAttribute(getPhotoDetailPath(photo.id))}">${escapeHtmlText(title)}</a></li>`
    })
    .join('')
  const content = `<main data-afilmory-static-content><h1>${escapeHtmlText(siteConfig.title)}</h1><p>${escapeHtmlText(siteConfig.description)}</p><nav aria-label="Recent photographs"><ul>${links}</ul></nav><noscript><p>Enable JavaScript to browse the full gallery.</p></noscript></main>`
  return replaceStaticContent(applyPageMeta(html, createSitePageMeta(siteConfig)), content)
}

export function createPhotoPageMeta(photo: PhotoManifestItem, siteConfig: SiteConfig): PhotoPageMeta {
  const productionPhoto = normalizeProductionThumbnail(photo)
  const meta = createPhotoMeta(productionPhoto, siteConfig, {
    title: getPreferredPhotoTitle(productionPhoto, productionPhoto.id),
    description: getPreferredPhotoDescription(productionPhoto, siteConfig.description),
  })
  return {
    ...meta,
    preload: createPhotoPreloadLink(productionPhoto),
    staticContent: createPhotoStaticContent(productionPhoto, meta.description),
  }
}

export function applyPhotoPageMeta(html: string, meta: PhotoPageMeta): string {
  const next = applyPageMeta(
    html.replaceAll(/<link[^>]+data-afilmory-preload=["'](?:gallery|photo)["'][^>]*>/gi, ''),
    meta,
  ).replace('</head>', () => `${meta.preload}</head>`)
  return replaceStaticContent(next, meta.staticContent)
}

function applyPageMeta(html: string, meta: PageMeta): string {
  let next = html.replace(/<title>.*?<\/title>/i, () => `<title>${escapeHtmlText(meta.title)}</title>`)
  if (!/<title>/i.test(next))
    next = next.replace('</head>', () => `<title>${escapeHtmlText(meta.title)}</title></head>`)
  next = upsertMeta(next, 'name', 'description', meta.description)
  next = upsertMeta(next, 'property', 'og:type', meta.type)
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
  next = removePageJsonLd(next)
  return next.replace(
    '</head>',
    () =>
      `<script type="application/ld+json" data-afilmory-page-jsonld>${serializeForInlineScript(meta.jsonLd)}</script></head>`,
  )
}

function removePageJsonLd(html: string): string {
  const locations: { startOffset: number; endOffset: number }[] = []
  const visit = (node: DefaultTreeAdapterMap['node']) => {
    if (
      'tagName' in node &&
      node.tagName === 'script' &&
      node.attrs.some(({ name }) => name === 'data-afilmory-page-jsonld' || name === 'data-afilmory-photo-jsonld') &&
      node.sourceCodeLocation
    ) {
      locations.push(node.sourceCodeLocation)
      return
    }
    if ('childNodes' in node) node.childNodes.forEach(visit)
  }
  visit(parse(html, { sourceCodeLocationInfo: true }))

  // Keep the surrounding source unchanged; a comment prevents adjacent fragments joining into markup.
  let next = html
  for (const { startOffset, endOffset } of locations.toSorted((a, b) => b.startOffset - a.startOffset)) {
    next = `${next.slice(0, startOffset)}<!---->${next.slice(endOffset)}`
  }
  return next
}

function replaceStaticContent(html: string, content: string): string {
  const next = html.replaceAll(/<main data-afilmory-static-content>[\s\S]*?<\/main>/gi, '')
  // React replaces this content only after the application has loaded successfully.
  if (/<div\s+id=["']root["'][^>]*>/i.test(next)) {
    return next.replace(/<div\s+id=["']root["'][^>]*>/i, (rootTag) => `${rootTag}${content}`)
  }
  return next.replace('</body>', () => `${content}</body>`)
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

function createPhotoStaticContent(photo: PhotoManifestItem, description: string): string {
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
    media = `<video controls preload="none"${poster} ${dimensions}><source src="${escapeAttribute(source)}"${type}></video>`
  } else {
    const fallback = photo.thumbnailUrl || photo.originalUrl
    const webpSource = photo.thumbnailWebpSrcSet
      ? `<source type="image/webp" srcset="${escapeAttribute(photo.thumbnailWebpSrcSet)}" sizes="(max-width: 1024px) 100vw, 1024px">`
      : ''
    const srcSet = photo.thumbnailSrcSet ? ` srcset="${escapeAttribute(photo.thumbnailSrcSet)}"` : ''
    media = `<picture>${webpSource}<img src="${escapeAttribute(fallback)}"${srcSet} sizes="(max-width: 1024px) 100vw, 1024px" alt="${escapeAttribute(title)}" ${dimensions}></picture>`
  }

  return `<main data-afilmory-static-content><p><a href="/">Back to gallery</a></p><h1>${escapeHtmlText(title)}</h1><figure>${media}<figcaption>${escapeHtmlText(caption)}</figcaption></figure></main>`
}

function getFirstSrcFromSrcSet(srcSet: string): string {
  return srcSet.split(',')[0]?.trim().split(/\s+/)[0] ?? ''
}

function upsertMeta(html: string, attribute: 'name' | 'property', key: string, content: string): string {
  const pattern = new RegExp(`<meta\\s+[^>]*${attribute}=["']${escapeRegExp(key)}["'][^>]*>`, 'gi')
  let matched = false
  const next = html.replace(pattern, (tag) => {
    matched = true
    if (/\scontent=(?:"[^"]*"|'[^']*')/i.test(tag)) {
      return tag.replace(/\scontent=(?:"[^"]*"|'[^']*')/i, () => ` content="${escapeAttribute(content)}"`)
    }

    return tag.replace(/\s*\/?>$/, () => ` content="${escapeAttribute(content)}" />`)
  })

  if (matched) return next

  return next.replace(
    '</head>',
    () => `    <meta ${attribute}="${escapeAttribute(key)}" content="${escapeAttribute(content)}" />\n  </head>`,
  )
}

function upsertLink(html: string, rel: string, href: string): string {
  const pattern = new RegExp(`<link\\s+[^>]*rel=["']${escapeRegExp(rel)}["'][^>]*>`, 'gi')
  let matched = false
  const next = html.replace(pattern, (tag) => {
    matched = true
    if (/\shref=(?:"[^"]*"|'[^']*')/i.test(tag)) {
      return tag.replace(/\shref=(?:"[^"]*"|'[^']*')/i, () => ` href="${escapeAttribute(href)}"`)
    }

    return tag.replace(/\s*\/?>$/, () => ` href="${escapeAttribute(href)}" />`)
  })

  if (matched) return next

  return next.replace(
    '</head>',
    () => `    <link rel="${escapeAttribute(rel)}" href="${escapeAttribute(href)}" />\n  </head>`,
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
