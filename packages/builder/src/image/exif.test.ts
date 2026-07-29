// @vitest-environment node

import fs from 'node:fs/promises'

import { beforeEach, describe, expect, it, vi } from 'vitest'

import { extractExifData } from './exif.js'

const mocks = vi.hoisted(() => ({
  exifRead: vi.fn(),
  sharpMetadata: vi.fn(),
  log: {
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
    success: vi.fn(),
  },
}))

vi.mock('sharp', () => ({
  default: vi.fn(() => ({
    metadata: mocks.sharpMetadata,
  })),
}))

vi.mock('exiftool-vendored', () => ({
  exiftool: {
    read: mocks.exifRead,
  },
}))

vi.mock('../photo/logger-adapter.js', () => ({
  getGlobalLoggers: () => ({
    exif: mocks.log,
  }),
}))

beforeEach(() => {
  vi.clearAllMocks()
  mocks.exifRead.mockReset()
  mocks.sharpMetadata.mockReset()
  mocks.sharpMetadata.mockResolvedValue({
    width: 4032,
    height: 3024,
  })
})

describe('extractExifData', () => {
  it('reads EXIF from the original buffer when the processed image has no embedded EXIF', async () => {
    const processedBuffer = Buffer.from('converted-jpeg-without-exif')
    const originalBuffer = Buffer.from('original-heic-with-exif')
    let temporaryPath = ''

    mocks.exifRead.mockImplementation(async (filePath: string) => {
      temporaryPath = filePath
      expect(await fs.readFile(filePath)).toEqual(originalBuffer)

      return {
        DateTimeOriginal: '2025-09-25T13:15:13.713+08:00',
        Make: 'Apple',
        Model: 'iPhone 16 Pro',
        ExifImageWidth: 4284,
        ExifImageHeight: 5712,
      }
    })

    const result = await extractExifData(processedBuffer, originalBuffer)

    expect(result).toMatchObject({
      DateTimeOriginal: '2025-09-25T05:15:13.713Z',
      Make: 'Apple',
      Model: 'iPhone 16 Pro',
      ImageWidth: 4284,
      ImageHeight: 5712,
    })
    expect(mocks.exifRead).toHaveBeenCalledOnce()
    await expect(fs.access(temporaryPath)).rejects.toMatchObject({ code: 'ENOENT' })
  })

  it('cleans up the temporary source when ExifTool fails', async () => {
    let temporaryPath = ''
    mocks.exifRead.mockImplementation(async (filePath: string) => {
      temporaryPath = filePath
      throw new Error('ExifTool failed')
    })

    await expect(extractExifData(Buffer.from('processed'), Buffer.from('original'))).resolves.toBeNull()
    await expect(fs.access(temporaryPath)).rejects.toMatchObject({ code: 'ENOENT' })
    expect(mocks.log.error).toHaveBeenCalled()
  })

  it('keeps returning null for images without useful EXIF fields', async () => {
    mocks.exifRead.mockResolvedValue({
      FileType: 'JPEG',
      ImageWidth: 1200,
      ImageHeight: 800,
    })

    await expect(extractExifData(Buffer.from('plain-jpeg'))).resolves.toBeNull()
    expect(mocks.log.warn).toHaveBeenCalledWith('未找到 EXIF 数据')
  })
})
