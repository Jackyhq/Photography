import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import * as React from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { LivePhotoBadge } from './LivePhotoBadge'
import type { LivePhotoVideoHandle } from './LivePhotoVideo'

vi.mock('react-i18next', () => ({
  ['useTranslation']: () => ({ t: (key: string) => (key === 'photo.live.badge' ? 'Live Photo' : key) }),
}))

vi.mock('~/lib/device-viewport', () => ({ isMobileDevice: false }))

vi.mock('motion/react', () => ({
  AnimatePresence: ({ children }: React.PropsWithChildren) => children,
  m: new Proxy(
    {},
    {
      get: (_target, tag: string) => tag,
    },
  ),
}))

describe('LivePhotoBadge', () => {
  afterEach(cleanup)

  it('uses a keyboard-accessible button to toggle playback', () => {
    const handle: LivePhotoVideoHandle = {
      play: vi.fn(),
      stop: vi.fn(),
      getIsVideoLoaded: () => true,
    }
    const livePhotoRef = { current: handle }
    const imageLoaderManagerRef = { current: null }
    const { rerender } = render(
      <LivePhotoBadge
        livePhotoRef={livePhotoRef}
        isLivePhotoPlaying={false}
        imageLoaderManagerRef={imageLoaderManagerRef}
      />,
    )

    fireEvent.click(screen.getByRole('button', { name: 'Live Photo' }))
    expect(handle.play).toHaveBeenCalledOnce()

    rerender(
      <LivePhotoBadge
        livePhotoRef={livePhotoRef}
        isLivePhotoPlaying={true}
        imageLoaderManagerRef={imageLoaderManagerRef}
      />,
    )
    fireEvent.click(screen.getByRole('button', { name: 'Live Photo' }))
    expect(handle.stop).toHaveBeenCalledOnce()
  })
})
