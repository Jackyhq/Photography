import path from 'node:path/posix'

import { SUPPORTED_FORMATS } from '../constants/index.js'
import type { StorageObject } from './interfaces.js'

const DEFAULT_LIVE_PHOTO_VIDEO_EXTENSIONS = new Set(['.mov'])

function normalizeStorageKey(key: string): string {
  return key.replaceAll('\\', '/')
}

function getExtension(key: string): string {
  return path.extname(normalizeStorageKey(key)).toLowerCase()
}

function getStem(key: string): string {
  const normalizedKey = normalizeStorageKey(key)
  const extension = getExtension(normalizedKey)
  return normalizedKey.slice(0, extension ? -extension.length : undefined).toLowerCase()
}

export function isSupportedImageKey(key: string): boolean {
  return SUPPORTED_FORMATS.has(getExtension(key))
}

export function filterSupportedImages<T extends Pick<StorageObject, 'key'>>(objects: T[]): T[] {
  return objects.filter((object) => isSupportedImageKey(object.key))
}

export function findLivePhotoPairs<T>(
  objects: T[],
  getKey: (object: T) => string | undefined,
  videoExtensions: ReadonlySet<string> = DEFAULT_LIVE_PHOTO_VIDEO_EXTENSIONS,
): Map<string, T> {
  const normalizedVideoExtensions = new Set(Array.from(videoExtensions, (extension) => extension.toLowerCase()))
  const videosByStem = new Map<string, T>()

  for (const object of objects) {
    const key = getKey(object)
    if (!key || !normalizedVideoExtensions.has(getExtension(key))) continue

    const stem = getStem(key)
    if (!videosByStem.has(stem)) {
      videosByStem.set(stem, object)
    }
  }

  const pairs = new Map<string, T>()
  for (const object of objects) {
    const key = getKey(object)
    if (!key || !isSupportedImageKey(key)) continue

    const video = videosByStem.get(getStem(key))
    if (video) {
      pairs.set(key, video)
    }
  }

  return pairs
}
