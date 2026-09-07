import { act, cleanup, renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { resolveThumbnailPrefetchUrl, useUpcomingThumbnailPrefetch } from './useUpcomingThumbnailPrefetch'

const photo = {
  id: 'upcoming',
  thumbnailUrl: '/upcoming-640.webp',
  thumbnailWebpSrcSet: '/upcoming-360.webp 360w, /upcoming-640.webp 640w, /upcoming-1080.webp 1080w',
}

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
  vi.useRealTimers()
})

describe('upcoming thumbnail prefetch', () => {
  it('uses the measured column width and uncapped DPR, with a largest-candidate fallback', () => {
    expect(resolveThumbnailPrefetchUrl(photo, 190, 2)).toBe('/upcoming-640.webp')
    expect(resolveThumbnailPrefetchUrl(photo, 250, 3)).toBe('/upcoming-1080.webp')
    expect(resolveThumbnailPrefetchUrl(photo, 500, 3)).toBe('/upcoming-1080.webp')
    expect(resolveThumbnailPrefetchUrl({ thumbnailUrl: '/fallback.webp' }, 250, 3)).toBe('/fallback.webp')
  })

  it('prefetches the next photo using the runtime DPR and the actual width supplied by the layout', async () => {
    vi.useFakeTimers()
    vi.stubGlobal('devicePixelRatio', 3)
    vi.stubGlobal('requestIdleCallback', null)
    vi.spyOn(document, 'visibilityState', 'get').mockReturnValue('visible')
    const fetch = vi.fn().mockResolvedValue({ ok: true })
    vi.stubGlobal('fetch', fetch)

    const { result } = renderHook(() => useUpcomingThumbnailPrefetch())
    act(() => result.current(0, [{ ...photo, id: 'visible' }, photo], 250))
    await act(async () => vi.advanceTimersByTimeAsync(250))

    expect(fetch).toHaveBeenCalledExactlyOnceWith('/upcoming-1080.webp', {
      cache: 'force-cache',
      credentials: 'same-origin',
    })
  })
})
