import fs from 'node:fs/promises'
import path from 'node:path'

import { workdir } from '@afilmory/builder/path.js'
import sharp from 'sharp'

import { getGlobalLoggers } from '../photo/logger-adapter.js'
import type { ThumbnailResult } from '../types/photo.js'
import { generateBlurhash } from './blurhash.js'

// 常量定义
const THUMBNAIL_DIR = path.join(workdir, 'public/thumbnails')
const THUMBNAIL_JPEG_QUALITY = 78
const THUMBNAIL_WEBP_QUALITY = 76
const THUMBNAIL_FALLBACK_WIDTH = 640
const THUMBNAIL_WEBP_WIDTHS = [360, 640] as const

// 获取缩略图路径信息
export function getThumbnailSources(photoId: string) {
  const filename = `${photoId}.jpg`
  const thumbnailUrl = `/thumbnails/${filename}`
  const thumbnailSrcSet = `${thumbnailUrl} ${THUMBNAIL_FALLBACK_WIDTH}w`
  const thumbnailWebpSrcSet = THUMBNAIL_WEBP_WIDTHS.map(
    (width) => `/thumbnails/${photoId}-${width}.webp ${width}w`,
  ).join(', ')

  return { thumbnailUrl, thumbnailSrcSet, thumbnailWebpSrcSet }
}

function getThumbnailPaths(photoId: string) {
  const sources = getThumbnailSources(photoId)
  const fallbackPath = path.join(THUMBNAIL_DIR, `${photoId}.jpg`)
  const webpPaths = THUMBNAIL_WEBP_WIDTHS.map((width) => path.join(THUMBNAIL_DIR, `${photoId}-${width}.webp`))

  return { ...sources, fallbackPath, webpPaths }
}

// 创建失败结果
function createFailureResult(): ThumbnailResult {
  return {
    thumbnailUrl: null,
    thumbnailSrcSet: null,
    thumbnailWebpSrcSet: null,
    thumbnailBuffer: null,
    thumbHash: null,
  }
}

// 创建成功结果
function createSuccessResult(
  thumbnailUrl: string,
  thumbnailSrcSet: string,
  thumbnailWebpSrcSet: string,
  thumbnailBuffer: Buffer,
  thumbHash: Uint8Array | null,
): ThumbnailResult {
  return {
    thumbnailUrl,
    thumbnailSrcSet,
    thumbnailWebpSrcSet,
    thumbnailBuffer,
    thumbHash,
  }
}

// 确保缩略图目录存在
async function ensureThumbnailDir(): Promise<void> {
  await fs.mkdir(THUMBNAIL_DIR, { recursive: true })
}

// 检查缩略图是否存在
export async function thumbnailExists(photoId: string): Promise<boolean> {
  try {
    const { fallbackPath, webpPaths } = getThumbnailPaths(photoId)
    await Promise.all([fallbackPath, ...webpPaths].map((thumbnailPath) => fs.access(thumbnailPath)))
    return true
  } catch {
    return false
  }
}

// 读取现有缩略图并生成 blurhash
async function processExistingThumbnail(photoId: string): Promise<ThumbnailResult | null> {
  const { fallbackPath, thumbnailUrl, thumbnailSrcSet, thumbnailWebpSrcSet } = getThumbnailPaths(photoId)

  const thumbnailLog = getGlobalLoggers().thumbnail
  thumbnailLog.info(`复用现有缩略图：${photoId}`)

  try {
    const existingBuffer = await fs.readFile(fallbackPath)
    const thumbHash = await generateBlurhash(existingBuffer)

    return createSuccessResult(thumbnailUrl, thumbnailSrcSet, thumbnailWebpSrcSet, existingBuffer, thumbHash)
  } catch (error) {
    thumbnailLog?.warn(`读取现有缩略图失败，重新生成：${photoId}`, error)
    return null
  }
}

// 生成新的缩略图
async function generateNewThumbnail(imageBuffer: Buffer, photoId: string): Promise<ThumbnailResult> {
  const { fallbackPath, webpPaths, thumbnailUrl, thumbnailSrcSet, thumbnailWebpSrcSet } = getThumbnailPaths(photoId)

  const log = getGlobalLoggers().thumbnail
  log.info(`生成缩略图：${photoId}`)
  const startTime = Date.now()

  try {
    // 创建 Sharp 实例，复用于缩略图和 blurhash 生成
    const sharpInstance = sharp(imageBuffer).rotate() // 自动根据 EXIF 旋转

    const thumbnailBuffer = await sharpInstance
      .clone()
      .resize(THUMBNAIL_FALLBACK_WIDTH, null, {
        withoutEnlargement: true,
      })
      .jpeg({ mozjpeg: true, quality: THUMBNAIL_JPEG_QUALITY })
      .toBuffer()

    const webpBuffers = await Promise.all(
      THUMBNAIL_WEBP_WIDTHS.map((width) =>
        sharpInstance
          .clone()
          .resize(width, null, {
            withoutEnlargement: true,
          })
          .webp({ quality: THUMBNAIL_WEBP_QUALITY })
          .toBuffer(),
      ),
    )

    await Promise.all([
      fs.writeFile(fallbackPath, thumbnailBuffer),
      ...webpBuffers.map((buffer, index) => fs.writeFile(webpPaths[index], buffer)),
    ])

    // 记录生成信息
    const duration = Date.now() - startTime
    const sizeKB = Math.round(thumbnailBuffer.length / 1024)
    log.success(`生成完成：${photoId} (${sizeKB}KB fallback, ${duration}ms)`)

    // 基于生成的缩略图生成 blurhash
    const thumbHash = await generateBlurhash(thumbnailBuffer)

    return createSuccessResult(thumbnailUrl, thumbnailSrcSet, thumbnailWebpSrcSet, thumbnailBuffer, thumbHash)
  } catch (error) {
    log.error(`生成失败：${photoId}`, error)
    return createFailureResult()
  }
}

// 生成缩略图和 blurhash（复用 Sharp 实例）
export async function generateThumbnailAndBlurhash(
  imageBuffer: Buffer,
  photoId: string,
  forceRegenerate = false,
): Promise<ThumbnailResult> {
  const thumbnailLog = getGlobalLoggers().thumbnail

  try {
    await ensureThumbnailDir()

    // 如果不是强制模式且缩略图已存在，尝试复用现有文件
    if (!forceRegenerate && (await thumbnailExists(photoId))) {
      const existingResult = await processExistingThumbnail(photoId)

      if (existingResult) {
        return existingResult
      }
      // 如果处理现有缩略图失败，继续生成新的
    }

    // 生成新的缩略图
    return await generateNewThumbnail(imageBuffer, photoId)
  } catch (error) {
    thumbnailLog.error(`处理失败：${photoId}`, error)
    return createFailureResult()
  }
}
