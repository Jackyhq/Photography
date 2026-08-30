import { existsSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'

import { describe, expect, it } from 'vitest'

import { pruneJpegThumbnails, pruneJpegThumbnailsPlugin } from './prune-jpeg-thumbnails'

describe('prune-jpeg-thumbnails', () => {
  it('removes only top-level production JPEG thumbnails and reports their size', async () => {
    const root = mkdtempSync(path.join(tmpdir(), 'afilmory-prune-thumbnails-'))
    const outputDirectory = path.join(root, 'dist')
    const thumbnailDirectory = path.join(outputDirectory, 'thumbnails')
    const publicThumbnailDirectory = path.join(root, 'public', 'thumbnails')

    try {
      mkdirSync(path.join(thumbnailDirectory, 'nested'), { recursive: true })
      mkdirSync(publicThumbnailDirectory, { recursive: true })
      writeFileSync(path.join(thumbnailDirectory, 'one.jpg'), Buffer.alloc(7))
      writeFileSync(path.join(thumbnailDirectory, 'two.jpg'), Buffer.alloc(11))
      writeFileSync(path.join(thumbnailDirectory, 'keep.webp'), Buffer.alloc(13))
      writeFileSync(path.join(thumbnailDirectory, 'nested', 'keep.jpg'), Buffer.alloc(17))
      writeFileSync(path.join(publicThumbnailDirectory, 'source.jpg'), Buffer.alloc(19))

      await expect(pruneJpegThumbnails(outputDirectory)).resolves.toEqual({
        deletedBytes: 18,
        deletedCount: 2,
      })

      expect(existsSync(path.join(thumbnailDirectory, 'one.jpg'))).toBe(false)
      expect(existsSync(path.join(thumbnailDirectory, 'two.jpg'))).toBe(false)
      expect(existsSync(path.join(thumbnailDirectory, 'keep.webp'))).toBe(true)
      expect(existsSync(path.join(thumbnailDirectory, 'nested', 'keep.jpg'))).toBe(true)
      expect(existsSync(path.join(publicThumbnailDirectory, 'source.jpg'))).toBe(true)
    } finally {
      rmSync(root, { force: true, recursive: true })
    }
  })

  it('is build-only and tolerates an output without thumbnails', async () => {
    const root = mkdtempSync(path.join(tmpdir(), 'afilmory-prune-empty-'))

    try {
      expect(pruneJpegThumbnailsPlugin()).toMatchObject({
        apply: 'build',
        enforce: 'post',
        name: 'prune-jpeg-thumbnails',
      })
      await expect(pruneJpegThumbnails(path.join(root, 'dist'))).resolves.toEqual({
        deletedBytes: 0,
        deletedCount: 0,
      })
    } finally {
      rmSync(root, { force: true, recursive: true })
    }
  })
})
