import { describe, expect, it } from 'vitest'

import { getPhotoSocialPreview } from './social-preview'

const photo = {
  mediaType: 'photo' as const,
  originalUrl: 'https://cdn.example.com/photo.jpg?version=1',
  thumbnailUrl: '/thumbnails/photo.webp',
  width: 1200,
  height: 800,
}

describe('photo social preview', () => {
  it('uses compatible originals with their real dimensions', () => {
    expect(getPhotoSocialPreview(photo)).toEqual({
      source: photo.originalUrl,
      width: 1200,
      height: 800,
    })
  })

  it('uses dimensionless browser-compatible thumbnails for HEIC and video media', () => {
    expect(getPhotoSocialPreview({ ...photo, originalUrl: '/photo.heic' })).toEqual({
      source: photo.thumbnailUrl,
    })
    expect(getPhotoSocialPreview({ ...photo, mediaType: 'video', originalUrl: '/movie.mp4' })).toEqual({
      source: photo.thumbnailUrl,
    })
  })
})
