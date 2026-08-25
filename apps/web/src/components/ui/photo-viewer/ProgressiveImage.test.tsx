import { cleanup, fireEvent, render } from '@testing-library/react'
import * as React from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { ProgressiveImage } from './ProgressiveImage'

const controls = vi.hoisted(() => ({
  handleLongPressStart: vi.fn(),
  handleLongPressEnd: vi.fn(),
}))

vi.mock('react-i18next', () => ({ ['useTranslation']: () => ({ t: (key: string) => key }) }))
vi.mock('usehooks-ts', () => ({ ['useMediaQuery']: () => false }))
vi.mock('~/atoms/context-menu', () => ({ ['useShowContextMenu']: () => vi.fn() }))
vi.mock('~/lib/feature', () => ({ canUseWebGL: false }))
vi.mock('motion/react', () => ({
  AnimatePresence: ({ children }: React.PropsWithChildren) => children,
  m: new Proxy(
    {},
    {
      get: (_target, tag: string) => tag,
    },
  ),
}))
vi.mock('./hooks', () => ({
  createContextMenuItems: vi.fn(() => []),
  ['useImageLoader']: () => ({ current: null }),
  ['useLivePhotoControls']: () => controls,
  ['useProgressiveImageState']: () => [
    {
      blobSrc: null,
      highResLoaded: false,
      error: false,
      isHighResImageRendered: false,
      currentScale: 1,
      showScaleIndicator: false,
      isThumbnailLoaded: false,
      isLivePhotoPlaying: false,
    },
    {
      setBlobSrc: vi.fn(),
      setHighResLoaded: vi.fn(),
      setError: vi.fn(),
      setIsHighResImageRendered: vi.fn(),
      setCurrentScale: vi.fn(),
      setShowScaleIndicator: vi.fn(),
      setIsThumbnailLoaded: vi.fn(),
      setIsLivePhotoPlaying: vi.fn(),
    },
  ],
  ['useScaleIndicator']: () => ({ onTransformed: vi.fn(), onDOMTransformed: vi.fn() }),
  ['useWebGLLoadingState']: () => vi.fn(),
}))

describe('ProgressiveImage', () => {
  afterEach(() => {
    cleanup()
    vi.clearAllMocks()
  })

  it('ends a pending long press when the browser cancels the touch', () => {
    const { container } = render(
      <ProgressiveImage
        src="photo.jpg"
        alt="Photo"
        videoSource={{ type: 'live-photo', videoUrl: 'photo.mov' }}
        loadingIndicatorRef={{ current: null }}
      />,
    )
    const root = container.firstElementChild as HTMLElement

    fireEvent.touchStart(root)
    fireEvent.touchCancel(root)

    expect(controls.handleLongPressStart).toHaveBeenCalledOnce()
    expect(controls.handleLongPressEnd).toHaveBeenCalledOnce()
  })
})
