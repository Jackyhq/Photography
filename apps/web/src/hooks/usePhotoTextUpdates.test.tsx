import { act, cleanup, render } from '@testing-library/react'
import * as React from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { PhotoTextUpdatesProvider } from '../providers/photo-text-updates-provider'
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

  it('re-renders a memoized consumer when a localized photo text pack is applied', () => {
    const revisions: number[] = []
    const Probe = React.memo(() => {
      revisions.push(usePhotoTextUpdates())
      return null
    })

    render(
      <PhotoTextUpdatesProvider>
        <Probe />
      </PhotoTextUpdatesProvider>,
    )
    expect(revisions).toEqual([0])

    act(() => photoTextStore.notify())
    expect(revisions).toEqual([0, 1])
  })
})
