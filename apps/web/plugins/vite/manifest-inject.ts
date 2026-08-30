import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'

import type { Plugin, ResolvedConfig } from 'vite'

import { MANIFEST_PATH } from './__internal__/constants'
import { normalizeProductionThumbnail } from './__internal__/production-thumbnail'
import { serializeForInlineScript } from './inline-script'

export { serializeForInlineScript } from './inline-script'

interface PreloadManifestItem {
  thumbnailUrl?: string
  thumbnailWebpSrcSet?: string
}

export interface FullManifest {
  version?: string
  data?: FullManifestItem[]
  cameras?: unknown[]
  lenses?: unknown[]
}

export interface FullManifestItem extends PreloadManifestItem {
  id: string
  mediaType?: string
  title?: string
  titles?: Record<string, string>
  description?: string
  descriptions?: Record<string, string>
  dateTaken?: string
  tags?: string[]
  originalUrl?: string
  videoUrl?: string
  mimeType?: string
  duration?: number
  thumbHash?: string | null
  thumbnailSrcSet?: string
  width?: number
  height?: number
  aspectRatio?: number
  size?: number
  lastModified?: string
  isHDR?: boolean
  video?: unknown
  exif?: Record<string, any> | null
}

interface PhotoTextEntry {
  title?: string
  description?: string
}

export interface PhotoTextPack {
  version?: string
  language: string
  photos: Record<string, PhotoTextEntry>
}

const PRELOAD_THUMBNAIL_COUNT = 2
const FULL_MANIFEST_ROUTE = '/__afilmory_full_manifest.json'
const PHOTO_TEXT_ROUTE_PREFIX = '/__afilmory_photo_text/'
const DEFAULT_INLINE_PHOTO_TEXT_LANGUAGE = 'zh-CN'
const GALLERY_EXIF_KEYS = ['ISO', 'FNumber', 'ExposureTime', 'FocalLength', 'FocalLengthIn35mmFormat'] as const
const MANIFEST_SCRIPT_MARKER = /<script\s+id=["']manifest["']\s*><\/script>/gi

function resolveEmbedPreference(_command: 'serve' | 'build'): boolean {
  const flag = process.env.AFILMORY_EMBED_MANIFEST?.trim().toLowerCase()
  if (flag === 'true') return true
  if (flag === 'false') return false
  return true
}

function escapeAttribute(value: string): string {
  return value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
}

function getFirstSrcFromSrcSet(srcSet: string): string {
  return srcSet.split(',')[0]?.trim().split(/\s+/)[0] ?? ''
}

function parsePhotoTime(value: unknown): number | null {
  if (typeof value !== 'string' || !value) return null

  const normalized = value.replace(/^(\d{4}):(\d{2}):(\d{2})/, '$1-$2-$3')
  const timestamp = new Date(normalized).getTime()
  return Number.isNaN(timestamp) ? null : timestamp
}

function getDisplayName(...parts: unknown[]): string | undefined {
  const displayName = parts
    .filter((part): part is string => typeof part === 'string' && part.trim().length > 0)
    .map((part) => part.trim())
    .join(' ')

  return displayName || undefined
}

function pickGalleryExif(exif: FullManifestItem['exif']) {
  if (!exif) return

  const galleryExif: Record<string, unknown> = {}
  for (const key of GALLERY_EXIF_KEYS) {
    const value = exif[key]
    if (value !== undefined && value !== null && value !== '') {
      galleryExif[key] = value
    }
  }

  return Object.keys(galleryExif).length > 0 ? galleryExif : undefined
}

function trimText(value: unknown): string | undefined {
  return typeof value === 'string' && value.trim().length > 0 ? value.trim() : undefined
}

function pickLocalizedText(
  values: Record<string, string> | undefined,
  language: string,
  fallback?: string,
): string | undefined {
  return trimText(values?.[language]) ?? trimText(fallback)
}

function compactObject<T extends Record<string, unknown>>(value: T): Partial<T> {
  return Object.fromEntries(Object.entries(value).filter(([, entryValue]) => entryValue !== undefined)) as Partial<T>
}

export function createLightManifest(manifest: FullManifest) {
  return {
    version: manifest.version,
    data:
      manifest.data?.map((item) => {
        const { exif } = item
        const lensDisplayName = getDisplayName(exif?.LensMake, exif?.LensModel) ?? getDisplayName(exif?.LensModel)

        return compactObject({
          id: item.id,
          mediaType: item.mediaType,
          title: pickLocalizedText(item.titles, DEFAULT_INLINE_PHOTO_TEXT_LANGUAGE, item.title),
          description: pickLocalizedText(item.descriptions, DEFAULT_INLINE_PHOTO_TEXT_LANGUAGE, item.description),
          dateTaken: item.dateTaken,
          tags: item.tags,
          thumbnailUrl: item.thumbnailUrl,
          thumbnailSrcSet: item.thumbnailSrcSet,
          thumbnailWebpSrcSet: item.thumbnailWebpSrcSet,
          thumbHash: item.thumbHash,
          width: item.width,
          height: item.height,
          aspectRatio: item.aspectRatio,
          size: item.size,
          lastModified: item.lastModified,
          originalUrl: item.originalUrl,
          videoUrl: item.videoUrl,
          mimeType: item.mimeType,
          duration: item.duration,
          isHDR: item.isHDR,
          video: item.video,
          sortTime:
            parsePhotoTime(exif?.DateTimeOriginal) ??
            parsePhotoTime(item.dateTaken) ??
            parsePhotoTime(item.lastModified) ??
            0,
          cameraDisplayName: getDisplayName(exif?.Make, exif?.Model),
          lensDisplayName,
          rating: exif?.Rating,
          galleryExif: pickGalleryExif(exif),
        })
      }) ?? [],
    cameras: manifest.cameras ?? [],
    lenses: manifest.lenses ?? [],
  }
}

export function createProductionManifest(manifest: FullManifest): FullManifest {
  if (!manifest.data) return { ...manifest }

  return {
    ...manifest,
    data: manifest.data.map((item) => normalizeProductionThumbnail(item)),
  }
}

export function createPhotoTextPacks(manifest: FullManifest): Record<string, PhotoTextPack> {
  const languages = new Set<string>()

  for (const item of manifest.data ?? []) {
    Object.keys(item.titles ?? {}).forEach((language) => languages.add(language))
    Object.keys(item.descriptions ?? {}).forEach((language) => languages.add(language))
  }

  languages.delete(DEFAULT_INLINE_PHOTO_TEXT_LANGUAGE)

  const packs: Record<string, PhotoTextPack> = {}
  for (const language of Array.from(languages).sort()) {
    const photos: Record<string, PhotoTextEntry> = {}

    for (const item of manifest.data ?? []) {
      const title = trimText(item.titles?.[language])
      const description = trimText(item.descriptions?.[language])
      if (!title && !description) continue

      photos[item.id] = compactObject({
        title,
        description,
      })
    }

    if (Object.keys(photos).length > 0) {
      packs[language] = {
        version: manifest.version,
        language,
        photos,
      }
    }
  }

  return packs
}

export function createThumbnailPreloadLinks(manifest: { data?: PreloadManifestItem[] }): string {
  try {
    const items = manifest.data?.slice(0, PRELOAD_THUMBNAIL_COUNT) ?? []

    return items
      .map((item, index) => {
        const webpSrcSet = item.thumbnailWebpSrcSet?.trim()
        const href = webpSrcSet ? getFirstSrcFromSrcSet(webpSrcSet) : item.thumbnailUrl
        if (!href) return ''

        const attributes = [
          'rel="preload"',
          'as="image"',
          'data-afilmory-preload="gallery"',
          `href="${escapeAttribute(href)}"`,
          'imagesizes="(max-width: 640px) 50vw, 350px"',
        ]

        if (index === 0) {
          attributes.push('fetchpriority="high"')
        }

        if (webpSrcSet) {
          attributes.push('type="image/webp"', `imagesrcset="${escapeAttribute(webpSrcSet)}"`)
        }

        return `<link ${attributes.join(' ')}>`
      })
      .filter(Boolean)
      .join('')
  } catch (error) {
    console.warn('Failed to create thumbnail preload links:', error)
    return ''
  }
}

function getContentHash(content: string): string {
  return createHash('sha256').update(content).digest('hex').slice(0, 10)
}

function normalizeBase(base: string): string {
  if (!base || base === './') return ''
  return base.endsWith('/') ? base : `${base}/`
}

function encodePhotoTextRoute(language: string): string {
  return `${PHOTO_TEXT_ROUTE_PREFIX}${encodeURIComponent(language)}.json`
}

export function createManifestBootstrapScript(
  lightManifest: ReturnType<typeof createLightManifest>,
  fullManifestUrl: string,
  photoTextUrls: Record<string, string>,
): string {
  return `window.__MANIFEST__=${serializeForInlineScript(lightManifest)};window.__FULL_MANIFEST_URL__=${serializeForInlineScript(fullManifestUrl)};window.__PHOTO_TEXT_URLS__=${serializeForInlineScript(photoTextUrls)};`
}

export function injectManifestBootstrap(
  html: string,
  options: { preloadLinks?: string; scriptSource?: string; scriptUrl?: string },
): string {
  const { preloadLinks = '', scriptSource, scriptUrl } = options
  if ((scriptSource === undefined) === (scriptUrl === undefined)) {
    throw new Error('Exactly one manifest bootstrap source must be provided')
  }

  let next = html
  while (true) {
    const sanitized = next.replaceAll(MANIFEST_SCRIPT_MARKER, '')
    if (sanitized === next) break
    next = sanitized
  }
  if (preloadLinks) {
    next = next.replace('</head>', `${preloadLinks}</head>`)
  }

  const script = scriptUrl
    ? `<script id="manifest" src="${escapeAttribute(scriptUrl)}"></script>`
    : `<script id="manifest">${scriptSource}</script>`
  const moduleScript = next.match(/<script[^>]+type=["']module["'][^>]*>/i)?.[0]

  if (moduleScript) {
    const moduleScriptIndex = next.indexOf(moduleScript)
    return `${next.slice(0, moduleScriptIndex)}${script}${next.slice(moduleScriptIndex)}`
  }

  return next.replace('</head>', `${script}</head>`)
}

export function manifestInjectPlugin(): Plugin {
  let embedManifest: boolean | undefined
  let resolvedConfig: ResolvedConfig | undefined
  let fullManifestAsset: { fileName: string; source: string } | undefined
  let photosIndexAsset: { fileName: string; source: string } | undefined
  let photoTextAssets: { fileName: string; source: string; language: string }[] = []
  let buildPayload: ReturnType<typeof buildManifestPayload> | undefined

  function getManifestContent(): string {
    try {
      const content = readFileSync(MANIFEST_PATH, 'utf-8')
      return content
    } catch (error) {
      console.warn('Failed to read manifest file:', error)
      return '{}'
    }
  }

  function buildManifestPayload(command: 'serve' | 'build') {
    const manifestContent = getManifestContent()
    const sourceManifest = JSON.parse(manifestContent) as FullManifest
    const fullManifest = command === 'build' ? createProductionManifest(sourceManifest) : sourceManifest
    const fullManifestSource = JSON.stringify(fullManifest)
    const lightManifest = createLightManifest(fullManifest)
    const photoTextPacks = createPhotoTextPacks(fullManifest)

    if (command === 'build') {
      const fileName = `assets/photos-manifest.${getContentHash(fullManifestSource)}.json`
      fullManifestAsset = {
        fileName,
        source: fullManifestSource,
      }
      const base = normalizeBase(resolvedConfig?.base ?? '/')
      photoTextAssets = Object.entries(photoTextPacks).map(([language, pack]) => {
        const source = JSON.stringify(pack)
        return {
          language,
          source,
          fileName: `assets/photo-text.${language}.${getContentHash(source)}.json`,
        }
      })

      const photoTextUrls = Object.fromEntries(
        photoTextAssets.map((asset) => [asset.language, `${base}${asset.fileName}`]),
      ) as Record<string, string>
      const fullManifestUrl = `${base}${fileName}`
      const photosIndexSource = createManifestBootstrapScript(lightManifest, fullManifestUrl, photoTextUrls)
      const photosIndexFileName = `assets/photos-index.${getContentHash(photosIndexSource)}.js`
      photosIndexAsset = {
        fileName: photosIndexFileName,
        source: photosIndexSource,
      }

      return {
        lightManifest,
        fullManifestUrl,
        photoTextUrls,
        photosIndexUrl: `${base}${photosIndexFileName}`,
      }
    }

    return {
      lightManifest,
      fullManifestUrl: FULL_MANIFEST_ROUTE,
      photoTextUrls: Object.fromEntries(
        Object.keys(photoTextPacks).map((language) => [language, encodePhotoTextRoute(language)]),
      ) as Record<string, string>,
    }
  }

  return {
    name: 'manifest-inject',

    configResolved(config) {
      resolvedConfig = config
      embedManifest = resolveEmbedPreference(config.command as 'serve' | 'build')
    },

    buildStart() {
      if (resolvedConfig?.command !== 'build') return

      const shouldEmbed = embedManifest ?? resolveEmbedPreference('build')
      if (!shouldEmbed) return

      buildPayload = buildManifestPayload('build')
      if (!fullManifestAsset) return

      this.emitFile({
        type: 'asset',
        fileName: fullManifestAsset.fileName,
        source: fullManifestAsset.source,
      })

      if (photosIndexAsset) {
        this.emitFile({
          type: 'asset',
          fileName: photosIndexAsset.fileName,
          source: photosIndexAsset.source,
        })
      }

      for (const asset of photoTextAssets) {
        this.emitFile({
          type: 'asset',
          fileName: asset.fileName,
          source: asset.source,
        })
      }
    },

    configureServer(server) {
      const shouldEmbed = embedManifest ?? resolveEmbedPreference(server.config.command as 'serve')
      if (!shouldEmbed) {
        return
      }

      // 监听 manifest 文件变化
      server.watcher.add(MANIFEST_PATH)
      server.middlewares.use(FULL_MANIFEST_ROUTE, (_req, res) => {
        res.setHeader('Content-Type', 'application/json; charset=utf-8')
        res.end(JSON.stringify(JSON.parse(getManifestContent())))
      })
      server.middlewares.use((req, res, next) => {
        const url = req.url?.split('?')[0] ?? ''
        if (!url.startsWith(PHOTO_TEXT_ROUTE_PREFIX)) {
          next()
          return
        }

        const encodedLanguage = url.slice(PHOTO_TEXT_ROUTE_PREFIX.length).replace(/\.json$/, '')
        const language = decodeURIComponent(encodedLanguage)
        const fullManifest = JSON.parse(getManifestContent()) as FullManifest
        const pack = createPhotoTextPacks(fullManifest)[language]
        if (!pack) {
          res.statusCode = 404
          res.end('Not found')
          return
        }

        res.setHeader('Content-Type', 'application/json; charset=utf-8')
        res.end(JSON.stringify(pack))
      })

      server.watcher.on('change', (file) => {
        if (file === MANIFEST_PATH) {
          console.info('[manifest-inject] Manifest file changed, triggering HMR...')
          // 触发页面重新加载
          server.ws.send({
            type: 'full-reload',
          })
        }
      })
    },

    transformIndexHtml: {
      order: 'post',
      handler(html, ctx) {
        const command: 'serve' | 'build' = ctx?.server ? 'serve' : 'build'
        const shouldEmbed = embedManifest ?? resolveEmbedPreference(command)
        embedManifest = shouldEmbed
        if (!shouldEmbed) {
          return html
        }

        const { lightManifest, fullManifestUrl, photoTextUrls, photosIndexUrl } =
          command === 'build' && buildPayload ? buildPayload : buildManifestPayload(command)
        const preloadLinks = createThumbnailPreloadLinks(lightManifest)

        if (command === 'build') {
          if (!photosIndexUrl) throw new Error('Manifest bootstrap asset was not created')
          return injectManifestBootstrap(html, { preloadLinks, scriptUrl: photosIndexUrl })
        }

        return injectManifestBootstrap(html, {
          preloadLinks,
          scriptSource: createManifestBootstrapScript(lightManifest, fullManifestUrl, photoTextUrls),
        })
      },
    },
  }
}
