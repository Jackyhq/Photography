import { renderHook } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { useGalleryRouteVisibility } from './useGalleryRouteVisibility'

describe('useGalleryRouteVisibility', () => {
  it('mounts a deferred gallery as soon as a directly opened viewer closes', () => {
    const { result, rerender } = renderHook(({ photoId, isOpen }) => useGalleryRouteVisibility(photoId, isOpen), {
      initialProps: { photoId: 'photo-1' as string | undefined, isOpen: false },
    })

    expect(result.current).toBe(false)

    rerender({ photoId: 'photo-1', isOpen: true })
    expect(result.current).toBe(false)

    rerender({ photoId: 'photo-1', isOpen: false })
    expect(result.current).toBe(true)
  })

  it('keeps the gallery mounted for photo routes opened from the gallery', () => {
    const { result, rerender } = renderHook(({ photoId, isOpen }) => useGalleryRouteVisibility(photoId, isOpen), {
      initialProps: { photoId: undefined as string | undefined, isOpen: false },
    })

    expect(result.current).toBe(true)

    rerender({ photoId: 'photo-1', isOpen: true })
    expect(result.current).toBe(true)
  })
})
