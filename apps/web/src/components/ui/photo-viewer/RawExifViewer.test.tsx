import { act, cleanup, fireEvent, render, screen } from '@testing-library/react'
import * as React from 'react'
import { toast } from 'sonner'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { ExifToolManager } from '~/lib/exiftool'
import type { FullPhotoManifest } from '~/types/photo'

import { RawExifViewer } from './RawExifViewer'

vi.mock('react-i18next', () => ({
  ['useTranslation']: () => ({
    t: (key: string, options?: { defaultValue?: string }) => options?.defaultValue ?? key,
  }),
}))

// Keep real Radix open/close events without the shared wrapper's exit animation.
vi.mock('@afilmory/ui/dialog', async () => {
  const dialog = await import('@afilmory/ui/dialog/radix')
  return {
    Dialog: dialog.Root,
    DialogContent: dialog.Content,
    DialogDescription: dialog.Description,
    DialogHeader: ({ children }: React.PropsWithChildren) => <div>{children}</div>,
    DialogTitle: dialog.Title,
    DialogTrigger: dialog.Trigger,
  }
})

vi.mock('@afilmory/ui/scroll-areas', () => ({
  ScrollArea: ({ children }: React.PropsWithChildren) => <div>{children}</div>,
}))

vi.mock('sonner', () => ({ toast: { error: vi.fn() } }))
vi.mock('~/lib/exiftool', () => ({ ExifToolManager: { parse: vi.fn() } }))

function deferred<T>() {
  let resolve!: (value: T) => void
  let reject!: (error: Error) => void
  const promise = new Promise<T>((resolvePromise, rejectPromise) => {
    resolve = resolvePromise
    reject = rejectPromise
  })
  return { promise, resolve, reject }
}

function photo(id: string): FullPhotoManifest {
  return {
    id,
    title: id,
    description: '',
    tags: [],
    dateTaken: '2026-10-08',
    originalUrl: `/photos/${id}.jpg`,
    thumbnailUrl: `/thumbnails/${id}.jpg`,
    s3Key: `${id}.jpg`,
    thumbHash: null,
    width: 2,
    height: 2,
    aspectRatio: 1,
    lastModified: '2026-10-08',
    size: 4,
    exif: null,
    toneAnalysis: null,
  }
}

const response = () => new Response('photo')
const openViewer = () => fireEvent.click(screen.getByRole('button', { name: 'Raw EXIF Data' }))
const dismissViewer = () => fireEvent.keyDown(document, { key: 'Escape' })
const loadingText = () => screen.queryByText('Loading EXIF data...')

describe('RawExifViewer request lifecycle', () => {
  const fetchMock = vi.fn<typeof fetch>()
  const parseMock = vi.mocked(ExifToolManager.parse)

  beforeEach(() => {
    vi.stubGlobal('React', React)
    vi.stubGlobal('fetch', fetchMock)
    fetchMock.mockImplementation(async () => response())
    vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    cleanup()
    vi.resetAllMocks()
    vi.restoreAllMocks()
    vi.unstubAllGlobals()
  })

  it('loads metadata and reopens its cached result without fetching or parsing again', async () => {
    parseMock.mockResolvedValue('Model: Camera A')
    render(<RawExifViewer currentPhoto={photo('A')} />)

    await act(async () => openViewer())
    expect(screen.getByText('Camera A')).toBeInTheDocument()
    expect(loadingText()).toBeNull()
    expect(fetchMock).toHaveBeenCalledWith('/photos/A.jpg', { signal: expect.any(AbortSignal) })
    expect(parseMock).toHaveBeenCalledWith(expect.any(Blob), 'A.jpg')

    dismissViewer()
    expect(screen.queryByRole('dialog')).toBeNull()
    openViewer()
    expect(screen.getByText('Camera A')).toBeInTheDocument()
    expect(fetchMock).toHaveBeenCalledTimes(1)
    expect(parseMock).toHaveBeenCalledTimes(1)
  })

  it('aborts a dismissed fetch and ignores its late response without starting EXIF parsing', async () => {
    const pendingFetch = deferred<Response>()
    fetchMock.mockReturnValueOnce(pendingFetch.promise)
    render(<RawExifViewer currentPhoto={photo('A')} />)
    openViewer()
    const signal = fetchMock.mock.calls[0][1]?.signal

    dismissViewer()
    expect(signal?.aborted).toBe(true)
    await act(async () => pendingFetch.resolve(response()))

    expect(parseMock).not.toHaveBeenCalled()
    expect(screen.queryByRole('dialog')).toBeNull()
    expect(toast.error).not.toHaveBeenCalled()
  })

  it('does not reopen a dismissed dialog when an uncancellable parse completes', async () => {
    const pendingParse = deferred<string>()
    parseMock.mockReturnValueOnce(pendingParse.promise)
    render(<RawExifViewer currentPhoto={photo('A')} />)
    await act(async () => openViewer())

    dismissViewer()
    await act(async () => pendingParse.resolve('Model: Old camera'))

    expect(screen.queryByRole('dialog')).toBeNull()
    expect(screen.queryByText('Old camera')).toBeNull()
    expect(toast.error).not.toHaveBeenCalled()
  })

  it.each(['resolve', 'reject'] as const)(
    'keeps a reopened request loading when the dismissed parse later %ss',
    async (completion) => {
      const oldParse = deferred<string>()
      const currentParse = deferred<string>()
      parseMock.mockReturnValueOnce(oldParse.promise).mockReturnValueOnce(currentParse.promise)
      render(<RawExifViewer currentPhoto={photo('A')} />)
      await act(async () => openViewer())
      dismissViewer()
      await act(async () => openViewer())

      await act(async () => {
        if (completion === 'resolve') oldParse.resolve('Model: Old camera')
        else oldParse.reject(new Error('Old parse failed'))
      })
      expect(loadingText()).toBeInTheDocument()
      expect(screen.queryByText('Old camera')).toBeNull()
      expect(toast.error).not.toHaveBeenCalled()

      await act(async () => currentParse.resolve('Model: Current camera'))
      expect(screen.getByText('Current camera')).toBeInTheDocument()
      expect(loadingText()).toBeNull()
    },
  )

  it('aborts a fetch when the photo changes and ignores its late response', async () => {
    const pendingFetch = deferred<Response>()
    fetchMock.mockReturnValueOnce(pendingFetch.promise)
    const { rerender } = render(<RawExifViewer currentPhoto={photo('A')} />)
    openViewer()
    const signal = fetchMock.mock.calls[0][1]?.signal

    rerender(<RawExifViewer currentPhoto={photo('B')} />)
    expect(signal?.aborted).toBe(true)
    await act(async () => pendingFetch.resolve(response()))

    expect(parseMock).not.toHaveBeenCalled()
    expect(screen.queryByRole('dialog')).toBeNull()
  })

  it.each(['resolve', 'reject'] as const)(
    'ignores A when its parse later %ss after returning to an already mounted B',
    async (completion) => {
      const parseA = deferred<string>()
      const parseB = deferred<string>()
      parseMock.mockReturnValueOnce(parseA.promise).mockReturnValueOnce(parseB.promise)
      // A cached detail in PhotoViewer keeps this child mounted while B/A/B changes.
      const { rerender } = render(<RawExifViewer currentPhoto={photo('B')} />)
      rerender(<RawExifViewer currentPhoto={photo('A')} />)
      await act(async () => openViewer())
      const signalA = fetchMock.mock.calls[0][1]?.signal
      rerender(<RawExifViewer currentPhoto={photo('B')} />)
      expect(signalA?.aborted).toBe(true)
      expect(screen.queryByRole('dialog')).toBeNull()
      await act(async () => openViewer())

      await act(async () => {
        if (completion === 'resolve') parseA.resolve('Model: Camera A')
        else parseA.reject(new Error('A parse failed'))
      })
      expect(loadingText()).toBeInTheDocument()
      expect(screen.queryByText('Camera A')).toBeNull()
      expect(toast.error).not.toHaveBeenCalled()

      await act(async () => parseB.resolve('Model: Camera B'))
      expect(screen.getByText('Camera B')).toBeInTheDocument()
      expect(loadingText()).toBeNull()
    },
  )

  it('reports an active failure and ends its loading state', async () => {
    parseMock.mockRejectedValue(new Error('Parse failed'))
    render(<RawExifViewer currentPhoto={photo('A')} />)
    await act(async () => openViewer())

    expect(toast.error).toHaveBeenCalledWith('Failed to parse EXIF data')
    expect(loadingText()).toBeNull()
  })

  it('aborts a fetch on unmount and ignores its subsequent rejection', async () => {
    const pendingFetch = deferred<Response>()
    fetchMock.mockReturnValueOnce(pendingFetch.promise)
    const { unmount } = render(<RawExifViewer currentPhoto={photo('A')} />)
    openViewer()
    const signal = fetchMock.mock.calls[0][1]?.signal

    unmount()
    expect(signal?.aborted).toBe(true)
    await act(async () => pendingFetch.reject(new Error('Fetch failed after unmount')))

    expect(parseMock).not.toHaveBeenCalled()
    expect(toast.error).not.toHaveBeenCalled()
    expect(console.error).not.toHaveBeenCalled()
  })

  it.each(['resolve', 'reject'] as const)('ignores a parse that %ss after unmount', async (completion) => {
    const pendingParse = deferred<string>()
    parseMock.mockReturnValueOnce(pendingParse.promise)
    const { unmount } = render(<RawExifViewer currentPhoto={photo('A')} />)
    await act(async () => openViewer())
    const signal = fetchMock.mock.calls[0][1]?.signal

    unmount()
    expect(signal?.aborted).toBe(true)
    await act(async () => {
      if (completion === 'resolve') pendingParse.resolve('Model: Old camera')
      else pendingParse.reject(new Error('Parse failed after unmount'))
    })

    expect(screen.queryByRole('dialog')).toBeNull()
    expect(toast.error).not.toHaveBeenCalled()
    expect(console.error).not.toHaveBeenCalled()
  })
})
