import { describe, expect, it } from 'vitest'

import type { StorageObject } from './interfaces.js'
import { filterSupportedImages, findLivePhotoPairs, isSupportedImageKey } from './media-files.js'

describe('storage media files', () => {
  it('recognizes supported image keys case-insensitively', () => {
    expect(isSupportedImageKey('album/photo.HEIC')).toBe(true)
    expect(isSupportedImageKey('album/video.mov')).toBe(false)
  })

  it('filters objects without changing their type or order', () => {
    const objects = [
      { key: 'one.jpg', etag: 'one' },
      { key: 'two.mov', etag: 'two' },
      { key: 'three.PNG', etag: 'three' },
    ]

    expect(filterSupportedImages(objects)).toEqual([objects[0], objects[2]])
  })

  it('pairs images and videos by normalized directory and stem', () => {
    const image: StorageObject = { key: 'trip\\IMG_0001.HEIC' }
    const video: StorageObject = { key: 'trip/IMG_0001.MOV' }
    const otherDirectoryVideo: StorageObject = { key: 'other/IMG_0001.mov' }

    expect(findLivePhotoPairs([image, otherDirectoryVideo, video], (object) => object.key)).toEqual(
      new Map([[image.key, video]]),
    )
  })

  it('supports explicit video extensions for legacy callers', () => {
    const image: StorageObject = { key: 'clip.jpg' }
    const video: StorageObject = { key: 'clip.mp4' }

    expect(findLivePhotoPairs([image, video], (object) => object.key, new Set(['.mov', '.mp4']))).toEqual(
      new Map([[image.key, video]]),
    )
  })
})
