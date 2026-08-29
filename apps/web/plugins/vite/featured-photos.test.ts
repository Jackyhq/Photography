import { describe, expect, it } from 'vitest'

import type { FeaturedPhotoSource } from './featured-photos'
import {
  createFeaturedPhotosResponse,
  FEATURED_PHOTO_COUNT,
  FEATURED_PHOTOS_FILE_NAME,
  FEATURED_PHOTOS_MAX_BYTES,
  serializeFeaturedPhotos,
} from './featured-photos'

const SITE_URL = 'https://photo.jackyw.cn'
const UPDATED_AT = '2026-08-29T00:00:00.000Z'

function createPhoto(index: number, overrides: Partial<FeaturedPhotoSource> = {}): FeaturedPhotoSource {
  const id = `photo-${String(index).padStart(2, '0')}`

  return {
    id,
    mediaType: 'photo',
    title: `中文标题 ${index}`,
    titles: {
      'zh-CN': `中文标题 ${index}`,
      en: `English title ${index}`,
    },
    description: `公开描述 ${index}`,
    descriptions: {
      'zh-CN': `公开描述 ${index}`,
      en: `Public description ${index}`,
    },
    dateTaken: new Date(Date.UTC(2026, 7, 29, 0, 0) - index * 60_000).toISOString(),
    thumbnailUrl: `/thumbnails/${id}.jpg`,
    thumbnailWebpSrcSet: `/thumbnails/${id}-360.webp 360w, /thumbnails/${id}-640.webp 640w`,
    width: 3000 + index,
    height: 4000 + index,
    ...overrides,
  }
}

function createManifest(photoCount = FEATURED_PHOTO_COUNT + 2) {
  const photos = Array.from({ length: photoCount }, (_, index) => createPhoto(index)).reverse()
  const video = createPhoto(99, {
    id: 'newer-video',
    mediaType: 'video',
    dateTaken: '2026-08-30T00:00:00.000Z',
  })

  return { data: [video, ...photos] }
}

describe('featured photos output', () => {
  it('creates a newest-first, public-only response with absolute URLs', () => {
    const manifest = createManifest()
    const privateFields = {
      exif: { GPSLatitude: 1, GPSLongitude: 2 },
      originalUrl: 'https://private.example.com/original.jpg',
      s3Key: 'private/original.jpg',
    }
    Object.assign(manifest.data.at(-1)!, privateFields)

    const response = createFeaturedPhotosResponse(manifest, SITE_URL, UPDATED_AT)

    expect(FEATURED_PHOTOS_FILE_NAME).toBe('featured-photos.json')
    expect(response.version).toBe(1)
    expect(response.updatedAt).toBe(UPDATED_AT)
    expect(response.totalPhotos).toBe(FEATURED_PHOTO_COUNT + 2)
    expect(response.items).toHaveLength(FEATURED_PHOTO_COUNT)
    expect(response.items[0]).toEqual({
      id: 'photo-00',
      title: '中文标题 0',
      titleEn: 'English title 0',
      description: '公开描述 0',
      photoUrl: 'https://photo.jackyw.cn/photos/photo-00/',
      thumbnailUrl: 'https://photo.jackyw.cn/thumbnails/photo-00.jpg',
      thumbnailWebpSrcSet:
        'https://photo.jackyw.cn/thumbnails/photo-00-360.webp 360w, https://photo.jackyw.cn/thumbnails/photo-00-640.webp 640w',
      width: 3000,
      height: 4000,
      takenAt: '2026-08-29T00:00:00.000Z',
    })
    expect(response.items.at(-1)?.id).toBe('photo-29')
    expect(response.items.some((photo) => photo.id === 'newer-video')).toBe(false)
    expect(Object.keys(response.items[0]!)).toEqual([
      'id',
      'title',
      'titleEn',
      'description',
      'photoUrl',
      'thumbnailUrl',
      'thumbnailWebpSrcSet',
      'width',
      'height',
      'takenAt',
    ])
    expect(response.items[0]).not.toHaveProperty('exif')
    expect(response.items[0]).not.toHaveProperty('originalUrl')
    expect(response.items[0]).not.toHaveProperty('s3Key')
  })

  it('falls back between localized and legacy public text', () => {
    const manifest = createManifest()
    manifest.data.splice(
      -1,
      1,
      createPhoto(0, {
        title: 'Legacy title',
        titles: { en: ' English only ' },
        description: 'Legacy description',
        descriptions: { en: ' English alt only ' },
      }),
    )
    manifest.data.splice(
      -2,
      1,
      createPhoto(1, {
        title: '',
        titles: { 'zh-CN': ' 只有中文 ' },
      }),
    )

    const response = createFeaturedPhotosResponse(manifest, SITE_URL, UPDATED_AT)

    expect(response.items[0]).toMatchObject({
      title: 'English only',
      titleEn: 'English only',
      description: 'English alt only',
    })
    expect(response.items[1]).toMatchObject({
      title: '只有中文',
      titleEn: '只有中文',
    })
  })

  it('requires 30 real public photos', () => {
    expect(() => createFeaturedPhotosResponse(createManifest(FEATURED_PHOTO_COUNT - 1), SITE_URL, UPDATED_AT)).toThrow(
      'require at least 30 public photos',
    )
  })

  it.each([
    ['a positive integer width', { width: 0 }, 'Invalid width'],
    ['a valid date', { dateTaken: 'not-a-date' }, 'Invalid dateTaken'],
    ['a public description', { description: '', descriptions: {} }, 'Missing description'],
    [
      'both required WebP widths',
      { thumbnailWebpSrcSet: '/thumbnails/photo-00-360.webp 360w' },
      'missing the 640w WebP thumbnail',
    ],
    [
      'same-origin thumbnail URLs',
      { thumbnailUrl: 'https://private.example.com/photo.jpg' },
      'must use the Photography HTTPS origin',
    ],
  ])('rejects a featured item without %s', (_label, overrides, error) => {
    const manifest = createManifest()
    manifest.data.splice(-1, 1, createPhoto(0, overrides))

    expect(() => createFeaturedPhotosResponse(manifest, SITE_URL, UPDATED_AT)).toThrow(error)
  })

  it('serializes a compact-enough newline-terminated JSON file', () => {
    const response = createFeaturedPhotosResponse(createManifest(), SITE_URL, UPDATED_AT)
    const source = serializeFeaturedPhotos(response)

    expect(source.endsWith('\n')).toBe(true)
    expect(Buffer.byteLength(source)).toBeLessThan(FEATURED_PHOTOS_MAX_BYTES)
    expect(JSON.parse(source)).toEqual(response)
  })

  it('rejects output larger than the contract budget', () => {
    const response = createFeaturedPhotosResponse(createManifest(), SITE_URL, UPDATED_AT)
    response.items[0]!.description = 'x'.repeat(FEATURED_PHOTOS_MAX_BYTES)

    expect(() => serializeFeaturedPhotos(response)).toThrow('exceeds 46080 bytes')
  })
})
