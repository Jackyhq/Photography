import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'

import { compressUint8Array } from '@afilmory/utils'
import ffmpeg from '@ffmpeg-installer/ffmpeg'
import { execa } from 'execa'
import { exiftool } from 'exiftool-vendored'

import type { AfilmoryBuilder, BuilderOptions } from '../builder/builder.js'
import { VIDEO_MIME_TYPES } from '../constants/index.js'
import { logger } from '../logger/index.js'
import { generateMediaId } from '../media/id.js'
import { processThumbnailAndBlurhash } from '../photo/data-processors.js'
import { createStorageKeyNormalizer, runWithPhotoExecutionContext } from '../photo/execution-context.js'
import { extractPhotoInfo } from '../photo/info-extractor.js'
import { createPhotoProcessingLoggers } from '../photo/logger-adapter.js'
import type { PhotoProcessorOptions } from '../photo/processor.js'
import type { StorageObject } from '../storage/interfaces.js'
import type { PhotoManifestItem, ProcessPhotoResult } from '../types/photo.js'

export async function processVideoFile(
  obj: StorageObject,
  index: number,
  workerId: number,
  totalVideos: number,
  existingManifestMap: Map<string, PhotoManifestItem>,
  options: PhotoProcessorOptions,
  builder: AfilmoryBuilder,
  _runtime: {
    builderOptions: BuilderOptions
  },
): Promise<ProcessPhotoResult> {
  const { key } = obj
  if (!key) {
    logger.image.warn('跳过没有 key 的视频对象')
    return { item: null, type: 'failed' }
  }

  const storageManager = builder.getStorageManager()
  const storageConfig = builder.getStorageConfig()
  const videoLoggers = createPhotoProcessingLoggers(workerId, logger)
  const existingItem = existingManifestMap.get(key)
  const videoId = generateMediaId(key, builder.getConfig().system.processing.digestSuffixLength)

  const shouldProcess = await shouldProcessVideo(videoId, existingItem, obj, options)
  if (!shouldProcess.shouldProcess) {
    videoLoggers.image.info(`⏭️ 跳过视频处理 (${shouldProcess.reason}): ${key}`)
    return { item: existingItem ?? null, type: 'skipped' }
  }

  return await runWithPhotoExecutionContext(
    {
      builder,
      storageManager,
      storageConfig,
      normalizeStorageKey: createStorageKeyNormalizer(storageConfig),
      loggers: videoLoggers,
    },
    async () => {
      videoLoggers.image.info(`🎬 [${index + 1}/${totalVideos}] ${key}`)

      try {
        const item = await executeVideoProcessingPipeline({
          key,
          obj,
          videoId,
          existingItem,
          options,
          builder,
        })

        if (!item) {
          return { item: null, type: 'failed' }
        }

        return {
          item,
          type: existingItem ? 'processed' : 'new',
        }
      } catch (error) {
        videoLoggers.image.error(`❌ 视频处理失败：${key}`, error)
        return { item: null, type: 'failed' }
      }
    },
  )
}

async function shouldProcessVideo(
  videoId: string,
  existingItem: PhotoManifestItem | undefined,
  obj: StorageObject,
  options: PhotoProcessorOptions,
): Promise<{ shouldProcess: boolean; reason: string }> {
  if (options.isForceMode || options.isForceManifest) {
    return { shouldProcess: true, reason: 'force' }
  }

  if (!existingItem || existingItem.mediaType !== 'video') {
    return { shouldProcess: true, reason: 'new' }
  }

  if (!obj.lastModified) {
    return { shouldProcess: true, reason: 'missing lastModified' }
  }

  if (obj.createdAt && !existingItem.fileCreatedAt) {
    return { shouldProcess: true, reason: 'missing file created time' }
  }

  if (obj.lastModified > new Date(existingItem.lastModified)) {
    return { shouldProcess: true, reason: 'modified' }
  }

  const { thumbnailExists } = await import('../image/thumbnail.js')
  if (!(await thumbnailExists(videoId)) || options.isForceThumbnails) {
    return { shouldProcess: true, reason: 'thumbnail missing' }
  }

  return { shouldProcess: false, reason: 'cache valid' }
}

interface VideoProcessingContext {
  key: string
  obj: StorageObject
  videoId: string
  existingItem: PhotoManifestItem | undefined
  options: PhotoProcessorOptions
  builder: AfilmoryBuilder
}

async function executeVideoProcessingPipeline({
  key,
  obj,
  videoId,
  existingItem,
  options,
  builder,
}: VideoProcessingContext): Promise<PhotoManifestItem | null> {
  const storageManager = builder.getStorageManager()
  const videoBuffer = await storageManager.getFile(key)
  if (!videoBuffer) {
    logger.image.error(`无法获取视频数据：${key}`)
    return null
  }

  const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'afilmory-video-'))
  const ext = path.extname(key).toLowerCase()
  const tempVideoPath = path.join(tempDir, `source${ext || '.mp4'}`)
  const tempPosterPath = path.join(tempDir, 'poster.jpg')

  try {
    await fs.writeFile(tempVideoPath, videoBuffer)

    const metadata = (await exiftool.read(tempVideoPath)) as Record<string, unknown>
    await extractVideoPoster(tempVideoPath, tempPosterPath)
    const posterBuffer = await fs.readFile(tempPosterPath)
    const thumbnailResult = await processThumbnailAndBlurhash(posterBuffer, videoId, existingItem, options)
    const videoInfo = extractPhotoInfo(key, null)
    const videoUrl = await storageManager.generatePublicUrl(key)
    const width = readPositiveNumber(metadata.ImageWidth) ?? readPositiveNumber(metadata.SourceImageWidth) ?? 1920
    const height = readPositiveNumber(metadata.ImageHeight) ?? readPositiveNumber(metadata.SourceImageHeight) ?? 1080
    const fileCreatedAt = obj.createdAt?.toISOString()
    const dateTaken =
      extractDateFromKey(key) ??
      extractVideoDate(metadata) ??
      fileCreatedAt ??
      obj.lastModified?.toISOString() ??
      new Date().toISOString()
    const mimeType = readString(metadata.MIMEType) ?? VIDEO_MIME_TYPES[ext] ?? 'video/mp4'
    const videoSize = typeof obj.size === 'number' && obj.size > 0 ? obj.size : videoBuffer.byteLength

    return {
      id: videoId,
      mediaType: 'video',
      title: videoInfo.title,
      description: videoInfo.description,
      dateTaken,
      tags: videoInfo.tags,
      originalUrl: videoUrl,
      videoUrl,
      mimeType,
      duration: readDuration(metadata.Duration),
      thumbnailUrl: thumbnailResult.thumbnailUrl,
      thumbnailSrcSet: thumbnailResult.thumbnailSrcSet,
      thumbnailWebpSrcSet: thumbnailResult.thumbnailWebpSrcSet,
      thumbHash: thumbnailResult.thumbHash ? compressUint8Array(thumbnailResult.thumbHash) : null,
      width,
      height,
      aspectRatio: width / height,
      s3Key: key,
      fileCreatedAt,
      lastModified: obj.lastModified?.toISOString() || new Date().toISOString(),
      size: videoSize,
      exif: null,
      toneAnalysis: null,
    }
  } finally {
    await fs.rm(tempDir, { recursive: true, force: true })
  }
}

async function extractVideoPoster(videoPath: string, posterPath: string): Promise<void> {
  await execa(ffmpeg.path, [
    '-hide_banner',
    '-loglevel',
    'error',
    '-y',
    '-i',
    videoPath,
    '-frames:v',
    '1',
    '-q:v',
    '2',
    posterPath,
  ])
}

function extractDateFromKey(key: string): string | null {
  const fileName = path.basename(key, path.extname(key))
  const compactDateMatch = fileName.match(/(?:^|\D)(\d{4})(\d{2})(\d{2})(?:(\d{2})(\d{2})(\d{2}))?(?:\D|$)/)
  if (compactDateMatch) {
    const [, year, month, day, hour = '00', minute = '00', second = '00'] = compactDateMatch
    return coerceDate(`${year}-${month}-${day}T${hour}:${minute}:${second}`)?.toISOString() ?? null
  }

  const dashedDateMatch = fileName.match(/(?:^|\D)(\d{4})-(\d{2})-(\d{2})(?:\D|$)/)
  if (dashedDateMatch) {
    const [, year, month, day] = dashedDateMatch
    return coerceDate(`${year}-${month}-${day}T00:00:00`)?.toISOString() ?? null
  }

  return null
}

function readNumber(value: unknown): number | null {
  if (typeof value === 'number' && Number.isFinite(value)) return value
  if (typeof value === 'string') {
    const parsed = Number.parseFloat(value)
    return Number.isFinite(parsed) ? parsed : null
  }
  return null
}

function readPositiveNumber(value: unknown): number | null {
  const number = readNumber(value)
  return number && number > 0 ? number : null
}

function readString(value: unknown): string | null {
  return typeof value === 'string' && value.trim() ? value : null
}

function readDuration(value: unknown): number | undefined {
  if (typeof value === 'number' && Number.isFinite(value)) return value
  if (typeof value !== 'string') return undefined

  const direct = Number.parseFloat(value)
  if (Number.isFinite(direct) && /^\d+(?:\.\d+)?$/.test(value.trim())) {
    return direct
  }

  const parts = value.split(':').map((part) => Number.parseFloat(part))
  if (parts.some((part) => !Number.isFinite(part))) return undefined

  if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2]
  if (parts.length === 2) return parts[0] * 60 + parts[1]
  return undefined
}

function extractVideoDate(metadata: Record<string, unknown>): string | null {
  const candidates = [metadata.MediaCreateDate, metadata.CreateDate, metadata.TrackCreateDate, metadata.ModifyDate]

  for (const value of candidates) {
    const date = coerceDate(value)
    if (date) {
      return date.toISOString()
    }
  }

  return null
}

function coerceDate(value: unknown): Date | null {
  if (value instanceof Date && !Number.isNaN(value.getTime())) return value

  if (value && typeof value === 'object' && 'toDate' in value && typeof value.toDate === 'function') {
    const date = value.toDate()
    return date instanceof Date && !Number.isNaN(date.getTime()) ? date : null
  }

  if (typeof value === 'string') {
    const normalized = value.replace(/^(\d{4}):(\d{2}):(\d{2})/, '$1-$2-$3')
    const date = new Date(normalized)
    return Number.isNaN(date.getTime()) ? null : date
  }

  return null
}
