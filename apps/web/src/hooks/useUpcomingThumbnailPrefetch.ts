import { useCallback, useEffect, useRef } from 'react'

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

export const resolveThumbnailPrefetchUrl = (
  photo: Pick<PhotoManifest, 'thumbnailUrl' | 'thumbnailWebpSrcSet'>,
  displayWidth: number,
  pixelRatio: number,
) => {
  const candidates = parseSrcSet(photo.thumbnailWebpSrcSet)
  if (candidates.length === 0) {
    return photo.thumbnailUrl
  }

  const targetWidth = Math.ceil(displayWidth * pixelRatio)

  return (
    candidates.find((candidate) => candidate.width >= targetWidth)?.url ?? candidates.at(-1)?.url ?? photo.thumbnailUrl
  )
}

export const useUpcomingThumbnailPrefetch = (scrollElement: HTMLElement | null) => {
  const latestUrlsRef = useRef<string[]>([])
  const updateQueueRef = useRef<((urls: string[]) => void) | null>(null)

  useEffect(() => {
    if (!scrollElement) return

    let hasScrolled = false
    let disposed = false
    let pendingUrls: string[] = []
    let idleHandle: number | null = null
    let timeoutHandle: ReturnType<typeof setTimeout> | null = null
    const attemptedUrls = new Set<string>()
    const inFlight = new Map<string, AbortController>()

    const drainQueue = () => {
      idleHandle = null
      timeoutHandle = null
      if (disposed || !canPrefetchThumbnails()) return

      while (inFlight.size < PREFETCH_CONCURRENCY && pendingUrls.length > 0) {
        const url = pendingUrls.shift()!
        if (attemptedUrls.has(url) || inFlight.has(url)) continue

        const controller = new AbortController()
        inFlight.set(url, controller)

        void fetch(url, {
          cache: 'force-cache',
          credentials: 'same-origin',
          signal: controller.signal,
        })
          .then((response) => response.arrayBuffer())
          .catch(() => {
            // Prefetch is opportunistic; visible image loading still handles errors.
          })
          .finally(() => {
            // A superseded request must not remove a newer request for this URL.
            if (inFlight.get(url) === controller) inFlight.delete(url)
            if (disposed) return

            if (!controller.signal.aborted) {
              attemptedUrls.add(url)
              if (attemptedUrls.size > MAX_REMEMBERED_PREFETCH_ATTEMPTS) {
                attemptedUrls.delete(attemptedUrls.values().next().value!)
              }
            }
            scheduleQueue()
          })
      }
    }

    const scheduleQueue = () => {
      if (disposed || !hasScrolled || pendingUrls.length === 0 || !canPrefetchThumbnails()) return
      if (idleHandle !== null || timeoutHandle !== null) return

      if (typeof window.requestIdleCallback === 'function') {
        idleHandle = window.requestIdleCallback(drainQueue, { timeout: 1500 })
      } else {
        timeoutHandle = setTimeout(drainQueue, 250)
      }
    }

    const updateQueue = (urls: string[]) => {
      const desiredUrls = new Set(urls)
      for (const [url, controller] of inFlight) {
        if (!desiredUrls.has(url)) {
          controller.abort()
          inFlight.delete(url)
        }
      }
      pendingUrls = urls.filter((url) => !attemptedUrls.has(url) && !inFlight.has(url))
      scheduleQueue()
    }

    const handleScroll = () => {
      // Do not compete with first-view photos just because the CPU has become idle.
      hasScrolled = true
      scheduleQueue()
    }

    updateQueueRef.current = updateQueue
    updateQueue(latestUrlsRef.current)
    scrollElement.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      disposed = true
      updateQueueRef.current = null
      scrollElement.removeEventListener('scroll', handleScroll)
      if (idleHandle !== null) window.cancelIdleCallback(idleHandle)
      if (timeoutHandle !== null) clearTimeout(timeoutHandle)
      inFlight.forEach((controller) => controller.abort())
      inFlight.clear()
    }
  }, [scrollElement])

  return useCallback((visibleStopIndex: number, items: unknown[], displayWidth: number) => {
    const urls =
      displayWidth > 0
        ? items
            .slice(visibleStopIndex + 1, visibleStopIndex + 1 + PREFETCH_LOOKAHEAD_COUNT)
            .filter(isPhotoManifest)
            .map((photo) => resolveThumbnailPrefetchUrl(photo, displayWidth, window.devicePixelRatio || 1))
            .filter((url): url is string => !!url)
        : []

    latestUrlsRef.current = Array.from(new Set(urls))
    updateQueueRef.current?.(latestUrlsRef.current)
  }, [])
}
