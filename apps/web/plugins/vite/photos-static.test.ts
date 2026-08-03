import { mkdirSync, mkdtempSync, realpathSync, rmSync, symlinkSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'

import { afterEach, beforeEach, describe, expect, it } from 'vitest'

import { parseByteRange, resolvePhotoFileRequest } from './photos-static'

describe('photos-static request security', () => {
  let testDirectory: string
  let photosDirectory: string

  beforeEach(() => {
    testDirectory = mkdtempSync(path.join(tmpdir(), 'afilmory-photos-static-'))
    photosDirectory = path.join(testDirectory, 'photos')
    mkdirSync(path.join(photosDirectory, 'album'), { recursive: true })
    mkdirSync(path.join(photosDirectory, '.git'), { recursive: true })
    writeFileSync(path.join(photosDirectory, 'album', 'photo.jpg'), 'photo-bytes')
    writeFileSync(path.join(photosDirectory, '.git', 'HEAD'), 'private metadata')
    writeFileSync(path.join(photosDirectory, 'notes.txt'), 'not a photo')
  })

  afterEach(() => {
    rmSync(testDirectory, { force: true, recursive: true })
  })

  it('resolves supported media inside the photo root', () => {
    const result = resolvePhotoFileRequest('/album/photo.jpg?cache=1', photosDirectory)

    expect(result.ok).toBe(true)
    if (!result.ok) return
    expect(result.contentType).toBe('image/jpeg')
    expect(result.filePath).toBe(realpathSync(path.join(photosDirectory, 'album', 'photo.jpg')))
  })

  it.each([
    ['/.git/HEAD', 403],
    ['/notes.txt', 404],
    ['/../outside.jpg', 403],
    ['/..%2Foutside.jpg', 403],
    ['/%252e%252e%252foutside.jpg', 403],
    ['/album%5Cphoto.jpg', 403],
    ['/%E0%A4%A', 400],
  ])('rejects unsafe request %s', (requestUrl, expectedStatusCode) => {
    expect(resolvePhotoFileRequest(requestUrl, photosDirectory)).toEqual({
      ok: false,
      statusCode: expectedStatusCode,
    })
  })

  it('rejects symbolic links even when their target is a supported media file', () => {
    const outsidePhoto = path.join(testDirectory, 'outside.jpg')
    writeFileSync(outsidePhoto, 'outside photo')
    symlinkSync(outsidePhoto, path.join(photosDirectory, 'linked.jpg'))

    expect(resolvePhotoFileRequest('/linked.jpg', photosDirectory)).toEqual({ ok: false, statusCode: 403 })
  })
})

describe('parseByteRange', () => {
  it.each([
    ['bytes=0-0', 100, { start: 0, end: 0 }],
    ['bytes=10-', 100, { start: 10, end: 99 }],
    ['bytes=-10', 100, { start: 90, end: 99 }],
    ['bytes=-200', 100, { start: 0, end: 99 }],
    ['bytes=90-200', 100, { start: 90, end: 99 }],
  ])('parses %s', (rangeHeader, fileSize, expectedRange) => {
    expect(parseByteRange(rangeHeader, fileSize)).toEqual(expectedRange)
  })

  it.each(['bytes=', 'bytes=-0', 'bytes=100-101', 'bytes=20-10', 'bytes=0-1,4-5', 'items=0-1'])(
    'rejects invalid or unsupported range %s',
    (rangeHeader) => {
      expect(parseByteRange(rangeHeader, 100)).toBeNull()
    },
  )
})
