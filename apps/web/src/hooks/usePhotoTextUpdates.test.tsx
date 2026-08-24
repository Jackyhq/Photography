import { act, cleanup, render } from '@testing-library/react'
import * as React from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { usePhotoTextUpdates } from './usePhotoTextUpdates'

const photoTextStore = vi.hoisted(() => {
  let revision = 0
  const listeners = new Set<() => void>()

  return {
    photoLoader: {
      getPhotoTextRevision: () => revision,
      subscribePhotoTextChanges: (listener: () => void) => {
        listeners.add(listener)
        return () => listeners.delete(listener)
      },
    },
    notify: () => {
      revision += 1
      for (const listener of listeners) listener()
    },
    reset: () => {
      revision = 0
      listeners.clear()
    },
  }
})

vi.mock('@afilmory/data', () => ({ photoLoader: photoTextStore.photoLoader }))

describe('usePhotoTextUpdates', () => {
  afterEach(() => {
    cleanup()
    photoTextStore.reset()
  })

  it('re-renders its consumer when a localized photo text pack is applied', () => {
    let renderCount = 0
    const Probe = () => {
      usePhotoTextUpdates()
      renderCount += 1
      return null
    }

    render(<Probe />)
    expect(renderCount).toBe(1)

    act(() => photoTextStore.notify())
    expect(renderCount).toBe(2)
  })
})
