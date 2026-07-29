import path from 'node:path'

import { resolveCaptureDate } from '../media/capture-date.js'
import type { PhotoInfo, PickedExif } from '../types/photo.js'
import { getPhotoExecutionContext } from './execution-context.js'
import { getGlobalLoggers } from './logger-adapter.js'

// 从文件名提取照片信息
export function extractPhotoInfo(key: string, exifData?: PickedExif | null): PhotoInfo {
  const log = getGlobalLoggers().image
  const { normalizeStorageKey } = getPhotoExecutionContext()

  log.info(`提取照片信息：${key}`)

  const sanitizedKey = key.replaceAll('\\', '/')
  const relativeKey = normalizeStorageKey(sanitizedKey)
  const keyForParsing = relativeKey || sanitizedKey
  const extname = path.posix.extname(keyForParsing)
  const fileName = path.posix.basename(keyForParsing, extname)

  // 尝试从文件名解析信息，格式示例："2024-01-15_城市夜景_1250views"
  let title = fileName
  let views = 0
  let tags: string[] = []

  // 从目录路径中提取 tags
  const dirPathRaw = relativeKey ? path.posix.dirname(relativeKey) : path.posix.dirname(keyForParsing)
  const dirPath = dirPathRaw === '.' || dirPathRaw === '/' ? '' : dirPathRaw
  if (dirPath) {
    const relativePath = dirPath.replaceAll(/^\/+|\/+$/g, '')

    // 分割路径并过滤空字符串
    const pathParts = relativePath.split('/').filter((part) => part.trim() !== '')
    tags = pathParts.map((part) => part.trim())

    if (tags.length > 0) {
      log.info(`从路径提取标签：[${tags.join(', ')}]`)
    }
  }

  const captureDate = resolveCaptureDate(keyForParsing, exifData?.DateTimeOriginal)
  if (captureDate.source === 'metadata') {
    log.info('使用 EXIF DateTimeOriginal 作为拍摄时间')
  } else if (captureDate.source === 'filename') {
    log.info(`从文件名提取拍摄时间：${captureDate.dateTaken}`)
  } else {
    log.warn(`缺少有效拍摄时间，使用稳定的最小排序时间：${captureDate.dateTaken}`)
  }

  // 如果文件名包含浏览次数
  const viewsMatch = fileName.match(/(\d+)views?/i)
  if (viewsMatch) {
    views = Number.parseInt(viewsMatch[1])
    log.info(`从文件名提取浏览次数：${views}`)
  }

  // 从文件名中提取标题（移除日期和浏览次数）
  title = fileName
    .replaceAll(/\d{4}-\d{2}-\d{2}[_-]?/g, '')
    .replaceAll(/[_-]?\d+views?/gi, '')
    .replaceAll(/[_-]+/g, ' ')
    .trim()

  // 如果标题为空，使用文件名
  if (!title) {
    title = path.posix.basename(keyForParsing, extname)
  }

  log.info(`照片信息提取完成："${title}"`)

  return {
    title,
    dateTaken: captureDate.dateTaken,
    tags,
    description: '', // 可以从 EXIF 或其他元数据中获取
  }
}
