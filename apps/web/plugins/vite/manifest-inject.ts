import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'

import type { Plugin, ResolvedConfig } from 'vite'

import { MANIFEST_PATH } from './__internal__/constants'

interface PreloadManifestItem {
  thumbnailUrl?: string
  thumbnailWebpSrcSet?: string
}

interface FullManifest {
  version?: string
  data?: FullManifestItem[]
  cameras?: unknown[]
  lenses?: unknown[]
}

interface FullManifestItem extends PreloadManifestItem {
  id: string
  mediaType?: string
  title?: string
  description?: string
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

const PRELOAD_THUMBNAIL_COUNT = 2
const FULL_MANIFEST_ROUTE = '/__afilmory_full_manifest.json'
const GALLERY_EXIF_KEYS = ['ISO', 'FNumber', 'ExposureTime', 'FocalLength', 'FocalLengthIn35mmFormat'] as const

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

function compactObject<T extends Record<string, unknown>>(value: T): Partial<T> {
  return Object.fromEntries(Object.entries(value).filter(([, entryValue]) => entryValue !== undefined)) as Partial<T>
}

function createLightManifest(manifest: FullManifest) {
  return {
    version: manifest.version,
    data:
      manifest.data?.map((item) => {
        const {exif} = item
        const lensDisplayName = getDisplayName(exif?.LensMake, exif?.LensModel) ?? getDisplayName(exif?.LensModel)

        return compactObject({
          id: item.id,
          mediaType: item.mediaType,
          title: item.title,
          description: item.description,
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

function createThumbnailPreloadLinks(manifest: { data?: PreloadManifestItem[] }): string {
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

export function manifestInjectPlugin(): Plugin {
  let embedManifest: boolean | undefined
  let resolvedConfig: ResolvedConfig | undefined
  let fullManifestAsset: { fileName: string; source: string } | undefined
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
    const fullManifest = JSON.parse(manifestContent) as FullManifest
    const fullManifestSource = JSON.stringify(fullManifest)
    const lightManifest = createLightManifest(fullManifest)

    if (command === 'build') {
      const fileName = `assets/photos-manifest.${getContentHash(fullManifestSource)}.json`
      fullManifestAsset = {
        fileName,
        source: fullManifestSource,
      }
      const base = normalizeBase(resolvedConfig?.base ?? '/')
      return {
        lightManifest,
        fullManifestUrl: `${base}${fileName}`,
      }
    }

    return {
      lightManifest,
      fullManifestUrl: FULL_MANIFEST_ROUTE,
    }
  }

  return {
    name: 'manifest-inject',

    configResolved(config) {
      resolvedConfig = config
      embedManifest = resolveEmbedPreference(config.command as 'serve' | 'build')
    },

    buildStart() {
      const shouldEmbed = embedManifest ?? resolveEmbedPreference('build')
      if (!shouldEmbed) return

      buildPayload = buildManifestPayload('build')
      if (!fullManifestAsset) return

      this.emitFile({
        type: 'asset',
        fileName: fullManifestAsset.fileName,
        source: fullManifestAsset.source,
      })
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

    transformIndexHtml(html, ctx) {
      const command: 'serve' | 'build' = ctx?.server ? 'serve' : 'build'
      const shouldEmbed = embedManifest ?? resolveEmbedPreference(command)
      embedManifest = shouldEmbed
      if (!shouldEmbed) {
        return html
      }

      const { lightManifest, fullManifestUrl } =
        command === 'build' && buildPayload ? buildPayload : buildManifestPayload(command)

      // 将 manifest 内容注入到 script#manifest 标签中
      const scriptContent = `window.__MANIFEST__=${JSON.stringify(lightManifest)};window.__FULL_MANIFEST_URL__=${JSON.stringify(fullManifestUrl)};`
      const preloadLinks = createThumbnailPreloadLinks(lightManifest)

      return html.replace(
        '<script id="manifest"></script>',
        `${preloadLinks}<script id="manifest">${scriptContent}</script>`,
      )
    },
  }
}
