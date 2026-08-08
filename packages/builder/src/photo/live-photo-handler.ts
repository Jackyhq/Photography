import type { _Object } from '@aws-sdk/client-s3'

import type { StorageManager } from '../storage/index.js'
import type { StorageObject } from '../storage/interfaces.js'
import { findLivePhotoPairs } from '../storage/media-files.js'
import { getGlobalLoggers } from './logger-adapter.js'

const LEGACY_LIVE_PHOTO_VIDEO_EXTENSIONS = new Set(['.mov', '.mp4'])

export interface LivePhotoResult {
  isLivePhoto: boolean
  livePhotoVideoUrl?: string
  livePhotoVideoS3Key?: string
}

/**
 * 检测并处理 Live Photo
 * @param photoKey 照片的 S3 key
 * @param livePhotoMap Live Photo 映射表
 * @param storageManager 存储管理器，用于生成公共访问链接
 * @returns Live Photo 处理结果
 */
export async function processLivePhoto(
  photoKey: string,
  livePhotoMap: Map<string, _Object | StorageObject>,
  storageManager: StorageManager,
): Promise<LivePhotoResult> {
  const loggers = getGlobalLoggers()
  const livePhotoVideo = livePhotoMap.get(photoKey)
  const isLivePhoto = !!livePhotoVideo

  if (!isLivePhoto) {
    return { isLivePhoto: false }
  }

  // 处理不同类型的视频对象
  let videoKey: string
  if ('Key' in livePhotoVideo && livePhotoVideo.Key) {
    // _Object 类型
    videoKey = livePhotoVideo.Key
  } else if ('key' in livePhotoVideo && livePhotoVideo.key) {
    // StorageObject 类型
    videoKey = livePhotoVideo.key
  } else {
    return { isLivePhoto: false }
  }

  const livePhotoVideoUrl = await storageManager.generatePublicUrl(videoKey)

  loggers.image.info(`📱 检测到 Live Photo：${photoKey} -> ${videoKey}`)

  return {
    isLivePhoto: true,
    livePhotoVideoUrl,
    livePhotoVideoS3Key: videoKey,
  }
}

/**
 * 创建 Live Photo 映射表 (兼容 _Object 类型)
 * 根据文件名匹配 Live Photo 的照片和视频文件
 * @param objects S3 对象列表
 * @returns Live Photo 映射表
 */
export function createLivePhotoMap(objects: _Object[]): Map<string, _Object>

/**
 * 创建 Live Photo 映射表 (兼容 StorageObject 类型)
 * 根据文件名匹配 Live Photo 的照片和视频文件
 * @param objects 存储对象列表
 * @returns Live Photo 映射表
 */
export function createLivePhotoMap(objects: StorageObject[]): Map<string, StorageObject>

export function createLivePhotoMap(objects: Array<_Object | StorageObject>): Map<string, _Object | StorageObject> {
  return findLivePhotoPairs(
    objects,
    (object) => ('key' in object ? object.key : object.Key),
    LEGACY_LIVE_PHOTO_VIDEO_EXTENSIONS,
  )
}
