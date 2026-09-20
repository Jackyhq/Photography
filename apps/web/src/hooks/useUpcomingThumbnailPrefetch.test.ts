import { act, cleanup, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

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
  beforeEach(() => {
    vi.useFakeTimers()
    vi.stubGlobal('requestIdleCallback', null)
    vi.spyOn(document, 'visibilityState', 'get').mockReturnValue('visible')
  })

  it('uses the measured column width and uncapped DPR, with a largest-candidate fallback', () => {
    expect(resolveThumbnailPrefetchUrl(photo, 190, 2)).toBe('/upcoming-640.webp')
    expect(resolveThumbnailPrefetchUrl(photo, 250, 3)).toBe('/upcoming-1080.webp')
    expect(resolveThumbnailPrefetchUrl(photo, 500, 3)).toBe('/upcoming-1080.webp')
    expect(resolveThumbnailPrefetchUrl({ thumbnailUrl: '/fallback.webp' }, 250, 3)).toBe('/fallback.webp')
  })

  it('keeps first-view bandwidth free, then uses runtime DPR and measured width after scrolling', async () => {
    vi.stubGlobal('devicePixelRatio', 3)
    const fetch = vi.fn().mockResolvedValue({ arrayBuffer: async () => new ArrayBuffer(0) })
    vi.stubGlobal('fetch', fetch)
    const scrollElement = document.createElement('div')

    const { result } = renderHook(() => useUpcomingThumbnailPrefetch(scrollElement))
    act(() => result.current(0, [{ ...photo, id: 'visible' }, photo], 250))
    await act(async () => vi.advanceTimersByTimeAsync(5000))
    expect(fetch).not.toHaveBeenCalled()

    act(() => scrollElement.dispatchEvent(new Event('scroll')))
    await act(async () => vi.advanceTimersByTimeAsync(250))

    expect(fetch).toHaveBeenCalledExactlyOnceWith('/upcoming-1080.webp', {
      cache: 'force-cache',
      credentials: 'same-origin',
      signal: expect.any(AbortSignal),
    })
  })

  it('aborts obsolete candidates when the rendered column width changes', async () => {
    vi.stubGlobal('devicePixelRatio', 3)
    let finishObsoleteRequest!: (response: { arrayBuffer: () => Promise<ArrayBuffer> }) => void
    const fetch = vi.fn().mockReturnValue(new Promise(() => {}))
    fetch.mockReturnValueOnce(
      new Promise((resolve) => {
        finishObsoleteRequest = resolve
      }),
    )
    vi.stubGlobal('fetch', fetch)
    const scrollElement = document.createElement('div')
    const { result, unmount } = renderHook(() => useUpcomingThumbnailPrefetch(scrollElement))

    act(() => result.current(-1, [photo], 250))
    act(() => scrollElement.dispatchEvent(new Event('scroll')))
    await act(async () => vi.advanceTimersByTimeAsync(250))
    const firstSignal = fetch.mock.calls[0][1].signal as AbortSignal

    act(() => result.current(-1, [photo], 100))
    expect(firstSignal.aborted).toBe(true)
    await act(async () => vi.advanceTimersByTimeAsync(250))
    expect(fetch.mock.calls[1][0]).toBe('/upcoming-360.webp')

    await act(async () => {
      finishObsoleteRequest({ arrayBuffer: async () => new ArrayBuffer(0) })
      await vi.runAllTimersAsync()
    })
    expect(fetch).toHaveBeenCalledTimes(2)

    const currentSignal = fetch.mock.calls[1][1].signal as AbortSignal
    unmount()
    expect(currentSignal.aborted).toBe(true)
  })

  it('counts unfinished response bodies toward the two-download concurrency limit', async () => {
    let finishFirstBody!: (value: ArrayBuffer) => void
    const body = new Promise<ArrayBuffer>((resolve) => {
      finishFirstBody = resolve
    })
    const fetch = vi.fn().mockResolvedValue({ arrayBuffer: () => body })
    vi.stubGlobal('fetch', fetch)
    const scrollElement = document.createElement('div')
    const items = Array.from({ length: 30 }, (_, index) => ({ id: `${index}`, thumbnailUrl: `/${index}.webp` }))
    const { result } = renderHook(() => useUpcomingThumbnailPrefetch(scrollElement))

    act(() => result.current(-1, items, 250))
    act(() => scrollElement.dispatchEvent(new Event('scroll')))
    await act(async () => vi.advanceTimersByTimeAsync(1000))
    expect(fetch).toHaveBeenCalledTimes(2)

    await act(async () => {
      finishFirstBody(new ArrayBuffer(0))
      await vi.runAllTimersAsync()
    })
    expect(fetch).toHaveBeenCalledTimes(18)
  })

  it('cancels scheduled work and ignores scrolling after unmount', async () => {
    const fetch = vi.fn()
    vi.stubGlobal('fetch', fetch)
    const scrollElement = document.createElement('div')
    const { result, unmount } = renderHook(() => useUpcomingThumbnailPrefetch(scrollElement))
    act(() => result.current(-1, [photo], 250))
    act(() => scrollElement.dispatchEvent(new Event('scroll')))
    unmount()
    scrollElement.dispatchEvent(new Event('scroll'))
    await act(async () => vi.runAllTimersAsync())
    expect(fetch).not.toHaveBeenCalled()
  })

  it('cancels an idle callback when the gallery unmounts', () => {
    const requestIdleCallback = vi.fn().mockReturnValue(17)
    const cancelIdleCallback = vi.fn()
    vi.stubGlobal('requestIdleCallback', requestIdleCallback)
    vi.stubGlobal('cancelIdleCallback', cancelIdleCallback)
    const scrollElement = document.createElement('div')
    const { result, unmount } = renderHook(() => useUpcomingThumbnailPrefetch(scrollElement))

    act(() => result.current(-1, [photo], 250))
    expect(requestIdleCallback).not.toHaveBeenCalled()
    act(() => scrollElement.dispatchEvent(new Event('scroll')))
    expect(requestIdleCallback).toHaveBeenCalledOnce()
    unmount()
    expect(cancelIdleCallback).toHaveBeenCalledWith(17)
  })

  it.each([{ saveData: true }, { effectiveType: '2g' }])(
    'does not prefetch on a restricted connection (%j)',
    async (connection) => {
      const fetch = vi.fn()
      vi.stubGlobal('fetch', fetch)
      vi.stubGlobal('navigator', { connection })
      const scrollElement = document.createElement('div')
      const { result } = renderHook(() => useUpcomingThumbnailPrefetch(scrollElement))

      act(() => result.current(-1, [photo], 250))
      act(() => scrollElement.dispatchEvent(new Event('scroll')))
      await act(async () => vi.runAllTimersAsync())
      expect(fetch).not.toHaveBeenCalled()
    },
  )
})
