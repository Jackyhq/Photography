import { readFileSync } from 'node:fs'

import type { PhotoManifestItem } from '@afilmory/builder'
import type { Plugin } from 'vite'

import type { SiteConfig } from '../../../../site.config'
import { MANIFEST_PATH } from './__internal__/constants'

export const FEATURED_PHOTOS_FILE_NAME = 'featured-photos.json'
export const FEATURED_PHOTO_COUNT = 30
export const FEATURED_PHOTOS_MAX_BYTES = 45 * 1024

export type FeaturedPhotoSource = Pick<
  PhotoManifestItem,
  | 'dateTaken'
  | 'description'
  | 'descriptions'
  | 'height'
  | 'id'
  | 'mediaType'
  | 'thumbnailUrl'
  | 'thumbnailWebpSrcSet'
  | 'title'
  | 'titles'
  | 'width'
>

export interface FeaturedPhotosManifest {
  data?: FeaturedPhotoSource[]
}

export interface FeaturedPhoto {
  id: string
  title: string
  titleEn: string
  description: string
  photoUrl: string
  thumbnailUrl: string
  thumbnailWebpSrcSet: string
  width: number
  height: number
  takenAt: string
}

export interface FeaturedPhotosResponse {
  version: 1
  updatedAt: string
  totalPhotos: number
  items: FeaturedPhoto[]
}

export function createFeaturedPhotosResponse(
  manifest: FeaturedPhotosManifest,
  siteUrl: string,
  updatedAt: Date | string = new Date(),
): FeaturedPhotosResponse {
  const baseUrl = resolveBaseUrl(siteUrl)
  const publicPhotos = (manifest.data ?? []).filter((photo) => photo.mediaType !== 'video')
  const sortedPhotos = publicPhotos
    .map((photo, index) => ({
      index,
      photo,
      timestamp: parseDate(photo.dateTaken, `dateTaken for photo ${photo.id}`),
    }))
    .sort((left, right) => right.timestamp - left.timestamp || left.index - right.index)

  if (sortedPhotos.length < FEATURED_PHOTO_COUNT) {
    throw new Error(
      `Featured photos require at least ${FEATURED_PHOTO_COUNT} public photos; found ${sortedPhotos.length}`,
    )
  }

  return {
    version: 1,
    updatedAt: toIsoDate(updatedAt, 'updatedAt'),
    totalPhotos: publicPhotos.length,
    items: sortedPhotos.slice(0, FEATURED_PHOTO_COUNT).map(({ photo }) => createFeaturedPhoto(photo, baseUrl)),
  }
}

export function serializeFeaturedPhotos(response: FeaturedPhotosResponse): string {
  const source = `${JSON.stringify(response, null, 2)}\n`
  const byteLength = Buffer.byteLength(source)

  if (byteLength > FEATURED_PHOTOS_MAX_BYTES) {
    throw new Error(`Featured photos JSON exceeds ${FEATURED_PHOTOS_MAX_BYTES} bytes; generated ${byteLength} bytes`)
  }

  return source
}

export function featuredPhotosPlugin(siteConfig: Pick<SiteConfig, 'url'>): Plugin {
  return {
    name: 'featured-photos',
    apply: 'build',
    generateBundle() {
      // The public PR fixture intentionally contains only two photos and is never deployed.
      if (process.env.AFILMORY_E2E_FIXTURE === 'true') {
        console.info('[featured-photos] Skipping output for the synthetic E2E fixture')
        return
      }

      const manifest = JSON.parse(readFileSync(MANIFEST_PATH, 'utf-8')) as FeaturedPhotosManifest
      const response = createFeaturedPhotosResponse(manifest, siteConfig.url)
      const source = serializeFeaturedPhotos(response)

      this.emitFile({
        type: 'asset',
        fileName: FEATURED_PHOTOS_FILE_NAME,
        source,
      })

      console.info(`[featured-photos] Generated ${FEATURED_PHOTOS_FILE_NAME} with ${response.items.length} photos`)
    },
  }
}

function createFeaturedPhoto(photo: FeaturedPhotoSource, baseUrl: URL): FeaturedPhoto {
  const id = requireText(photo.id, 'id')
  const title = requireText(firstText(photo.titles?.['zh-CN'], photo.titles?.en, photo.title), `title for ${id}`)
  const titleEn = requireText(firstText(photo.titles?.en, photo.titles?.['zh-CN'], photo.title), `titleEn for ${id}`)
  const description = requireText(
    firstText(photo.descriptions?.['zh-CN'], photo.descriptions?.en, photo.description),
    `description for ${id}`,
  )
  const thumbnailUrl = toPublicAbsoluteUrl(photo.thumbnailUrl, baseUrl, `thumbnailUrl for ${id}`)
  const thumbnailWebpSrcSet = toAbsoluteWebpSrcSet(photo.thumbnailWebpSrcSet, baseUrl, id)

  if (!Number.isInteger(photo.width) || photo.width <= 0) {
    throw new Error(`Invalid width for featured photo ${id}`)
  }
  if (!Number.isInteger(photo.height) || photo.height <= 0) {
    throw new Error(`Invalid height for featured photo ${id}`)
  }

  return {
    id,
    title,
    titleEn,
    description,
    photoUrl: new URL(`/photos/${encodeURIComponent(id)}/`, baseUrl).toString(),
    thumbnailUrl,
    thumbnailWebpSrcSet,
    width: photo.width,
    height: photo.height,
    takenAt: toIsoDate(photo.dateTaken, `takenAt for ${id}`),
  }
}

function resolveBaseUrl(siteUrl: string): URL {
  let url: URL
  try {
    url = new URL(siteUrl)
  } catch {
    throw new Error(`Invalid Photography site URL: ${siteUrl}`)
  }

  if (url.protocol !== 'https:') {
    throw new Error(`Photography site URL must use HTTPS: ${siteUrl}`)
  }

  return new URL('/', url)
}

function toPublicAbsoluteUrl(value: string | undefined, baseUrl: URL, label: string): string {
  const source = requireText(value, label)
  let url: URL

  try {
    url = new URL(source, baseUrl)
  } catch {
    throw new Error(`Invalid ${label}: ${source}`)
  }

  if (url.protocol !== 'https:' || url.origin !== baseUrl.origin) {
    throw new Error(`${label} must use the Photography HTTPS origin`)
  }

  return url.toString()
}

function toAbsoluteWebpSrcSet(value: string | undefined, baseUrl: URL, photoId: string): string {
  const source = requireText(value, `thumbnailWebpSrcSet for ${photoId}`)
  const widths = new Set<number>()
  const candidates = source.split(',').map((candidate) => {
    const parts = candidate.trim().split(/\s+/u)
    if (parts.length !== 2 || !/^\d+w$/u.test(parts[1] ?? '')) {
      throw new Error(`Invalid WebP srcset candidate for featured photo ${photoId}: ${candidate.trim()}`)
    }

    const width = Number.parseInt(parts[1]!, 10)
    widths.add(width)

    return `${toPublicAbsoluteUrl(parts[0], baseUrl, `WebP thumbnail URL for ${photoId}`)} ${width}w`
  })

  for (const requiredWidth of [360, 640]) {
    if (!widths.has(requiredWidth)) {
      throw new Error(`Featured photo ${photoId} is missing the ${requiredWidth}w WebP thumbnail`)
    }
  }

  return candidates.join(', ')
}

function firstText(...values: Array<string | null | undefined>): string | undefined {
  for (const value of values) {
    const text = value?.trim()
    if (text) return text
  }
}

function requireText(value: string | null | undefined, label: string): string {
  const text = value?.trim()
  if (!text) throw new Error(`Missing ${label}`)
  return text
}

function parseDate(value: string, label: string): number {
  const timestamp = Date.parse(value)
  if (Number.isNaN(timestamp)) throw new Error(`Invalid ${label}: ${value}`)
  return timestamp
}

function toIsoDate(value: Date | string, label: string): string {
  const timestamp = value instanceof Date ? value.getTime() : Date.parse(value)
  if (Number.isNaN(timestamp)) throw new Error(`Invalid ${label}`)
  return new Date(timestamp).toISOString()
}
