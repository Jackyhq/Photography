import '@testing-library/jest-dom/vitest'

import { act, cleanup, render } from '@testing-library/react'
import * as React from 'react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { HistogramChart } from './HistogramChart'

vi.mock('react-i18next', () => ({ useTranslation: vi.fn(() => ({ t: (key: string) => key })) }))

describe('histogram image request lifecycle', () => {
  const images: HTMLImageElement[] = []

  beforeEach(() => {
    images.length = 0
    vi.stubGlobal('React', React)
    vi.stubGlobal(
      'Image',
      class {
        constructor() {
          const image = document.createElement('img')
          images.push(image)
          return image
        }
      },
    )
  })
  afterEach(() => {
    cleanup()
    vi.unstubAllGlobals()
    vi.restoreAllMocks()
  })

  it('ignores captured callbacks from the previous photo but still reports the current request failure', () => {
    const context = vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(null)
    const view = render(<HistogramChart thumbnailUrl="/old.webp" />)
    const old = images[0]!
    const oldLoad = old.onload
    const oldError = old.onerror
    view.rerender(<HistogramChart thumbnailUrl="/current.webp" />)

    expect(old.onload).toBeNull()
    expect(old.onerror).toBeNull()
    expect(old.hasAttribute('src')).toBe(false)
    act(() => {
      oldLoad?.call(old, new Event('load'))
      oldError?.call(old, new Event('error'))
    })
    expect(context).not.toHaveBeenCalled()
    expect(view.queryByText('photo.error.loading')).toBeNull()

    act(() => images[1]!.onerror?.call(images[1]!, new Event('error')))
    expect(view.getByText('photo.error.loading')).toBeInTheDocument()
  })

  it('stops an unmounted request from creating a canvas when its captured load callback arrives', () => {
    const context = vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(null)
    const view = render(<HistogramChart thumbnailUrl="/closing.webp" />)
    const image = images[0]!
    const onLoad = image.onload
    view.unmount()
    act(() => onLoad?.call(image, new Event('load')))
    expect(image.onload).toBeNull()
    expect(image.onerror).toBeNull()
    expect(context).not.toHaveBeenCalled()
  })
})
