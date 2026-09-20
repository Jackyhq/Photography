import '@testing-library/jest-dom/vitest'

import { compressUint8Array } from '@afilmory/utils'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import * as React from 'react'
import { rgbaToThumbHash } from 'thumbhash'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { resolveThumbnailPrefetchUrl } from '~/hooks/useUpcomingThumbnailPrefetch'
import type { PhotoManifest } from '~/types/photo'

import { MasonryPhotoItem } from './MasonryPhotoItem'

const { openViewerByPhotoId } = vi.hoisted(() => ({ openViewerByPhotoId: vi.fn() }))
vi.mock('~/hooks/usePhotoViewer', () => ({ useOpenPhotoViewer: vi.fn(() => ({ openViewerByPhotoId })) }))
vi.mock('~/hooks/usePhotoTextUpdates', () => ({ usePhotoTextUpdates: vi.fn(() => 0) }))
vi.mock('react-i18next', () => ({
  useTranslation: vi.fn(() => ({ i18n: { language: 'en' }, t: (key: string) => key })),
}))
vi.mock('motion/react', () => ({ m: { a: 'a' } }))
vi.mock('@afilmory/ui/icons', () => ({
  CarbonIsoOutline: () => null,
  MaterialSymbolsShutterSpeed: () => null,
  StreamlineImageAccessoriesLensesPhotosCameraShutterPicturePhotographyPicturesPhotoLens: () => null,
  TablerAperture: () => null,
}))

const photo: PhotoManifest = {
  id: 'urban/one & two',
  title: 'Evening light',
  description: 'Evening light across the street',
  dateTaken: '2026-09-01T12:00:00Z',
  lastModified: '2026-09-01T12:00:00Z',
  sortTime: 0,
  tags: [],
  originalUrl: '/photo.jpg',
  thumbnailUrl: '/photo-640.webp',
  thumbnailWebpSrcSet: '/photo-360.webp 360w, /photo-640.webp 640w, /photo-1080.webp 1080w',
  thumbHash: null,
  width: 1200,
  height: 800,
  aspectRatio: 1.5,
  size: 100,
}

const props = { data: photo, width: 190, index: 0, onKeyDown: vi.fn() }

beforeEach(() => {
  // The repository's Vitest JSX transform uses the classic runtime for component modules.
  vi.stubGlobal('React', React)
})

afterEach(() => {
  cleanup()
  vi.clearAllMocks()
  vi.unstubAllGlobals()
})

describe('masonry photo links', () => {
  it('exposes an encoded photo URL and takes over ordinary clicks to open the viewer', () => {
    render(<MasonryPhotoItem {...props} />)
    const link = screen.getByRole('link', { name: photo.description })
    expect(link.tabIndex).toBe(0)
    expect(link).toHaveAttribute('href', '/photos/urban%2Fone%20%26%20two/')
    expect(fireEvent.click(link)).toBe(false)
    expect(openViewerByPhotoId).toHaveBeenCalledExactlyOnceWith(photo.id, { element: link })
  })

  it.each([
    ['Control', { ctrlKey: true }],
    ['Meta', { metaKey: true }],
    ['Shift', { shiftKey: true }],
    ['Alt', { altKey: true }],
    ['middle button', { button: 1 }],
  ])('preserves native navigation for %s clicks', (_name, options) => {
    render(<MasonryPhotoItem {...props} />)
    const link = screen.getByRole('link', { name: photo.description })
    let preventedByGallery: boolean | undefined
    window.addEventListener(
      'click',
      (event) => {
        preventedByGallery = event.defaultPrevented
        // Observe the React handler first, then suppress jsdom's unsupported document navigation.
        event.preventDefault()
      },
      { once: true },
    )
    fireEvent(link, new MouseEvent('click', { bubbles: true, cancelable: true, ...options }))
    expect(preventedByGallery).toBe(false)
    expect(openViewerByPhotoId).not.toHaveBeenCalled()
  })

  it('updates responsive sizes to the measured width that thumbnail prefetch receives', () => {
    const { container, rerender } = render(<MasonryPhotoItem {...props} />)
    const source = container.querySelector('source[type="image/webp"]')
    expect(source).toHaveAttribute('srcset', photo.thumbnailWebpSrcSet)
    expect(source).toHaveAttribute('sizes', '190px')
    expect(screen.getByRole('img')).toHaveAttribute('sizes', '190px')
    expect(resolveThumbnailPrefetchUrl(photo, 190, 2)).toBe('/photo-640.webp')

    rerender(<MasonryPhotoItem {...props} width={250} />)
    expect(source).toHaveAttribute('sizes', '250px')
    expect(screen.getByRole('img')).toHaveAttribute('sizes', '250px')
    expect(resolveThumbnailPrefetchUrl(photo, 250, 3)).toBe('/photo-1080.webp')
  })
})

describe('masonry image placeholders', () => {
  const photoWithPreview = {
    ...photo,
    thumbHash: compressUint8Array(rgbaToThumbHash(1, 1, Uint8Array.of(180, 150, 100, 255))),
  }

  it('uses a decorative background while loading and removes it when the photo loads', () => {
    const { container } = render(<MasonryPhotoItem {...props} data={photoWithPreview} />)
    const preview = container.querySelector('[aria-hidden="true"]')
    expect((preview as HTMLElement).style.backgroundImage).toContain('data:image/png;base64,')
    expect(container.querySelectorAll('img')).toHaveLength(1)

    fireEvent.load(screen.getByRole('img'))

    expect(preview).not.toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 2, name: photo.title })).toBeInTheDocument()
  })

  it('restarts loading when a thumbnail source changes and ignores events from the old image', () => {
    const { container, rerender } = render(<MasonryPhotoItem {...props} data={photoWithPreview} />)
    const oldImage = screen.getByRole('img')
    fireEvent.load(oldImage)

    const updatedPhoto = { ...photoWithPreview, thumbnailWebpSrcSet: '/updated-640.webp 640w' }
    rerender(<MasonryPhotoItem {...props} data={updatedPhoto} />)
    const newImage = screen.getByRole('img')
    expect(newImage).not.toBe(oldImage)
    expect(container.querySelector('[aria-hidden="true"]')).toBeInTheDocument()
    expect(screen.queryByRole('heading')).not.toBeInTheDocument()

    fireEvent.error(oldImage)
    expect(newImage).toBeInTheDocument()
    fireEvent.load(newImage)
    expect(container.querySelector('[aria-hidden="true"]')).not.toBeInTheDocument()

    rerender(<MasonryPhotoItem {...props} data={{ ...updatedPhoto, title: 'Updated title' }} />)
    expect(screen.getByRole('img')).toBe(newImage)
    expect(screen.getByRole('heading', { level: 2, name: 'Updated title' })).toBeInTheDocument()
  })

  it('clears an image failure when a new photo replaces the item', () => {
    const { container, rerender } = render(<MasonryPhotoItem {...props} data={photoWithPreview} />)
    fireEvent.error(screen.getByRole('img'))
    expect(screen.getByText('photo.error.loading')).toBeInTheDocument()
    expect(container.querySelector('[aria-hidden="true"]')).not.toBeInTheDocument()

    rerender(<MasonryPhotoItem {...props} data={{ ...photoWithPreview, id: 'replacement-photo' }} />)
    expect(screen.queryByText('photo.error.loading')).not.toBeInTheDocument()
    expect(screen.getByRole('img')).toBeInTheDocument()
    expect(container.querySelector('[aria-hidden="true"]')).toBeInTheDocument()
  })
})
