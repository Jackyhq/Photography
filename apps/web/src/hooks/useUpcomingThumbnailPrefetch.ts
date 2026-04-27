import { useCallback } from 'react'

import type { PhotoManifest } from '~/types/photo'

const PREFETCH_LOOKAHEAD_COUNT = 18
const PREFETCH_CONCURRENCY = 2
const MAX_REMEMBERED_PREFETCH_ATTEMPTS = 160

interface NetworkInformationLike {
  effectiveType?: string
  saveData?: boolean
}

interface SrcSetCandidate {
  url: string
  width: number
}

let pendingThumbnailUrls: string[] = []
let activePrefetches = 0
let idleHandle: number | null = null
let timeoutHandle: ReturnType<typeof setTimeout> | null = null

const attemptedThumbnailUrls = new Set<string>()
const inFlightThumbnailUrls = new Set<string>()

const isPhotoManifest = (item: unknown): item is PhotoManifest => {
  return !!item && typeof item === 'object' && 'id' in item && 'thumbnailUrl' in item
}

const canPrefetchThumbnails = () => {
  if (typeof window === 'undefined' || typeof document === 'undefined') return false
  if (document.visibilityState === 'hidden') return false

  const { connection } = navigator as Navigator & { connection?: NetworkInformationLike }
  if (connection?.saveData) return false
  if (connection?.effectiveType && /(?:^|-)2g$/.test(connection.effectiveType)) return false

  return true
}

const parseSrcSet = (srcSet?: string | null): SrcSetCandidate[] => {
  if (!srcSet) return []

  return srcSet
    .split(',')
    .map((entry) => {
      const trimmed = entry.trim()
      if (!trimmed) return null

      const parts = trimmed.split(/\s+/)
      if (parts.length < 2) return null

      const widthPart = parts.pop()!
      if (!widthPart.endsWith('w')) return null

      const width = Number.parseInt(widthPart.slice(0, -1), 10)
      if (!Number.isFinite(width)) return null

      const url = parts.join(' ')
      return {
        url,
        width,
      }
    })
    .filter((candidate): candidate is SrcSetCandidate => !!candidate && Number.isFinite(candidate.width))
    .sort((a, b) => a.width - b.width)
}

const resolveThumbnailPrefetchUrl = (photo: PhotoManifest, displayWidth: number) => {
  const candidates = parseSrcSet(photo.thumbnailWebpSrcSet)
  if (candidates.length === 0) {
    return photo.thumbnailUrl
  }

  const pixelRatio = Math.min(window.devicePixelRatio || 1, 2)
  const targetWidth = Math.ceil(displayWidth * pixelRatio)

  return (
    candidates.find((candidate) => candidate.width >= targetWidth)?.url ?? candidates.at(-1)?.url ?? photo.thumbnailUrl
  )
}

const rememberPrefetchAttempt = (url: string) => {
  attemptedThumbnailUrls.add(url)

  while (attemptedThumbnailUrls.size > MAX_REMEMBERED_PREFETCH_ATTEMPTS) {
    const oldest = attemptedThumbnailUrls.values().next().value
    if (!oldest) break
    attemptedThumbnailUrls.delete(oldest)
  }
}

const drainThumbnailPrefetchQueue = () => {
  idleHandle = null
  timeoutHandle = null

  if (!canPrefetchThumbnails()) {
    pendingThumbnailUrls = []
    return
  }

  while (activePrefetches < PREFETCH_CONCURRENCY && pendingThumbnailUrls.length > 0) {
    const url = pendingThumbnailUrls.shift()
    if (!url || attemptedThumbnailUrls.has(url) || inFlightThumbnailUrls.has(url)) {
      continue
    }

    activePrefetches += 1
    inFlightThumbnailUrls.add(url)

    void fetch(url, {
      cache: 'force-cache',
      credentials: 'same-origin',
    })
      .catch(() => {
        // Prefetch is opportunistic; visible image loading still handles errors.
      })
      .finally(() => {
        activePrefetches -= 1
        inFlightThumbnailUrls.delete(url)
        rememberPrefetchAttempt(url)

        if (pendingThumbnailUrls.length > 0) {
          scheduleThumbnailPrefetch()
        }
      })
  }
}

const scheduleThumbnailPrefetch = () => {
  if (idleHandle !== null || timeoutHandle !== null) return
  if (typeof window === 'undefined') return

  if (typeof window.requestIdleCallback === 'function') {
    idleHandle = window.requestIdleCallback(drainThumbnailPrefetchQueue, { timeout: 1500 })
    return
  }

  timeoutHandle = setTimeout(drainThumbnailPrefetchQueue, 250)
}

const queueThumbnailPrefetch = (urls: string[]) => {
  if (!canPrefetchThumbnails()) return

  const nextUrls = urls.filter((url) => !attemptedThumbnailUrls.has(url) && !inFlightThumbnailUrls.has(url))
  pendingThumbnailUrls = Array.from(new Set(nextUrls)).slice(0, PREFETCH_LOOKAHEAD_COUNT)

  if (pendingThumbnailUrls.length > 0) {
    scheduleThumbnailPrefetch()
  }
}

export const useUpcomingThumbnailPrefetch = (displayWidth: number) => {
  return useCallback(
    (visibleStopIndex: number, items: unknown[]) => {
      if (displayWidth <= 0) return

      const urls = items
        .slice(visibleStopIndex + 1, visibleStopIndex + 1 + PREFETCH_LOOKAHEAD_COUNT)
        .filter(isPhotoManifest)
        .map((photo) => resolveThumbnailPrefetchUrl(photo, displayWidth))
        .filter((url): url is string => !!url)

      queueThumbnailPrefetch(urls)
    },
    [displayWidth],
  )
}
