import { act, cleanup, render, screen } from '@testing-library/react'
import type { PropsWithChildren } from 'react'
import * as React from 'react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

const state = vi.hoisted(() => ({ mobile: true, viewerOpen: false }))
vi.mock('~/hooks/useMobile', () => ({ useMobile: vi.fn(() => state.mobile) }))
vi.mock('~/hooks/usePhotoViewer', () => ({ usePhotoViewerState: vi.fn(() => ({ isOpen: state.viewerOpen })) }))

const desktopImported = vi.fn()
let releaseDesktop: () => void

const setMobile = (mobile: boolean) => {
  state.mobile = mobile
  vi.stubGlobal('innerWidth', mobile ? 390 : 1280)
}

beforeEach(() => {
  vi.resetModules()
  vi.stubGlobal('React', React)
  setMobile(true)
  state.viewerOpen = false
  vi.doMock('./MasonryRoot', async () => {
    const { useScrollViewElement } = await import('@afilmory/ui/scroll-areas/hooks')
    return {
      MasonryRoot: () => (
        <div data-testid="masonry">{useScrollViewElement() === document.body ? 'mobile' : 'desktop'}</div>
      ),
    }
  })
  const desktopReady = new Promise<void>((resolve) => {
    releaseDesktop = resolve
  })
  vi.doMock('./DesktopGalleryScrollArea', async () => {
    desktopImported()
    await desktopReady
    const { ScrollElementContext } = await import('@afilmory/ui/scroll-areas/context')
    const scrollElement = document.createElement('div')
    return {
      DesktopGalleryScrollArea: ({ children }: PropsWithChildren) => (
        <ScrollElementContext value={scrollElement}>
          <div data-testid="desktop-scroll-area">{children}</div>
        </ScrollElementContext>
      ),
    }
  })
})

afterEach(() => {
  cleanup()
  releaseDesktop()
  vi.doUnmock('./DesktopGalleryScrollArea')
  vi.doUnmock('./MasonryRoot')
  vi.clearAllMocks()
  vi.unstubAllGlobals()
})

describe('gallery scroll ownership', () => {
  it('renders mobile using the document body without importing desktop scrolling', async () => {
    const { GalleryRouteContent } = await import('./GalleryRouteContent')
    const { rerender } = render(<GalleryRouteContent />)
    expect(screen.getByTestId('masonry')).toHaveTextContent('mobile')
    expect(desktopImported).not.toHaveBeenCalled()

    state.viewerOpen = true
    rerender(<GalleryRouteContent />)
    expect(screen.getByTestId('gallery-content')).toHaveAttribute('inert')
    expect(screen.getByTestId('gallery-content')).toHaveAttribute('aria-hidden', 'true')
  })

  it('switches scroll owners at the breakpoint and ignores a desktop load after returning to mobile', async () => {
    const { GalleryRouteContent } = await import('./GalleryRouteContent')
    const { rerender } = render(<GalleryRouteContent />)
    setMobile(false)
    rerender(<GalleryRouteContent />)
    expect(screen.queryByTestId('masonry')).not.toBeInTheDocument()

    setMobile(true)
    rerender(<GalleryRouteContent />)
    await act(async () => {
      releaseDesktop()
      await import('./DesktopGalleryScrollArea')
    })
    expect(screen.getByTestId('masonry')).toHaveTextContent('mobile')
    expect(screen.queryByTestId('desktop-scroll-area')).not.toBeInTheDocument()

    setMobile(false)
    rerender(<GalleryRouteContent />)
    expect(await screen.findByTestId('desktop-scroll-area')).toHaveTextContent('desktop')
  })
})
