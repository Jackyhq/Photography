import { ScrollElementContext } from '@afilmory/ui/scroll-areas/context'
import { act, cleanup, fireEvent, render } from '@testing-library/react'
import type { RenderComponentProps } from 'masonic'
import * as React from 'react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import type { MasonryRef } from './Masonic'
import { Masonry } from './Masonic'

const viewport = vi.hoisted(() => ({ width: 404, height: 200 }))
vi.mock('@react-hook/window-size', () => ({ useWindowSize: vi.fn(() => [viewport.width, viewport.height]) }))

interface Photo {
  id: string
  aspectRatio: number
}

const photos: Photo[] = Array.from({ length: 1000 }, (_, index) => ({ id: `photo-${index}`, aspectRatio: 1 }))
const itemHeight = (photo: Photo, width: number) => width / photo.aspectRatio
const firstCommits: Array<{ id: string; visibility: string }> = []
const measuredPhotos: string[] = []
const correctedHeights = new Map<string, number>()
const observers: TestResizeObserver[] = []

const createMasonryRef = (): React.RefObject<MasonryRef | null> => ({ current: null })

class TestResizeObserver {
  targets = new Set<Element>()
  constructor(readonly callback: ResizeObserverCallback) {
    observers.push(this)
  }
  observe = (element: Element) => this.targets.add(element)
  unobserve = (element: Element) => this.targets.delete(element)
  disconnect = () => this.targets.clear()
}

const PhotoCell = ({ data, width }: RenderComponentProps<Photo>) => {
  const ref = React.useRef<HTMLDivElement>(null)
  React.useLayoutEffect(() => {
    firstCommits.push({ id: data.id, visibility: ref.current!.parentElement!.style.visibility })
  }, [data.id])
  return <div ref={ref} data-photo={data.id} style={{ height: itemHeight(data, width) }} />
}

beforeEach(() => {
  vi.useFakeTimers()
  vi.stubGlobal('React', React)
  vi.stubGlobal('ResizeObserver', TestResizeObserver)
  viewport.width = 404
  viewport.height = 200
  document.body.scrollTop = 0
  firstCommits.length = 0
  measuredPhotos.length = 0
  observers.length = 0
  correctedHeights.clear()
  vi.spyOn(HTMLElement.prototype, 'offsetWidth', 'get').mockImplementation(() => viewport.width)
  vi.spyOn(HTMLElement.prototype, 'offsetHeight', 'get').mockImplementation(function (this: HTMLElement) {
    const photo = this.getAttribute('role') === 'listitem' ? this.querySelector<HTMLElement>('[data-photo]') : null
    if (!photo) return viewport.height
    const id = photo.dataset.photo!
    measuredPhotos.push(id)
    return correctedHeights.get(id) ?? Math.round(Number.parseFloat(photo.style.height))
  })
})

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
  vi.useRealTimers()
})

function gallery(
  ref: React.Ref<MasonryRef>,
  items = photos,
  height: typeof itemHeight | null = itemHeight,
  overscanBy = 2,
) {
  return (
    <ScrollElementContext value={document.body}>
      <Masonry
        ref={ref}
        role="list"
        items={items}
        itemKey={(photo) => photo.id}
        itemHeight={height ?? undefined}
        columnCount={2}
        columnGutter={4}
        rowGutter={4}
        itemHeightEstimate={200}
        overscanBy={overscanBy}
        render={PhotoCell}
      />
    </ScrollElementContext>
  )
}

describe('known-height masonry layout', () => {
  it('commits visible photos without reading their layout and keeps the initial range bounded', () => {
    const ref = createMasonryRef()
    const { container } = render(gallery(ref))
    expect(firstCommits.length).toBeGreaterThan(0)
    expect(firstCommits.every((commit) => commit.visibility !== 'hidden')).toBe(true)
    expect(measuredPhotos).toEqual([])
    expect(ref.current!.getPositioner().size()).toBe(4)
    expect(container.querySelectorAll('[data-photo]')).toHaveLength(4)
  })

  it('adds only the required positions after scrolling and continues virtualizing earlier photos', () => {
    const ref = createMasonryRef()
    const { container } = render(gallery(ref))
    const firstPositioner = ref.current!.getPositioner()
    document.body.scrollTop = 600
    fireEvent.scroll(document.body)
    expect(ref.current!.getPositioner()).toBe(firstPositioner)
    expect(firstPositioner.size()).toBe(10)
    expect(container.querySelector('[data-photo="photo-0"]')).toBeNull()
    expect(container.querySelectorAll('[data-photo]').length).toBeLessThan(10)
    expect(measuredPhotos).toEqual([])
  })

  it('does not extend the committed cache for a suspended render that is later abandoned', async () => {
    const ref = createMasonryRef()
    const pending = new Promise<void>(() => {})
    const suspend = vi.fn((blocked: boolean) => {
      if (blocked) throw pending
      return null
    })
    const Suspend = ({ blocked }: { blocked: boolean }) => suspend(blocked)
    const tree = (overscanBy: number, blocked: boolean) => (
      <React.StrictMode>
        <React.Suspense fallback={<div data-testid="fallback" />}>
          {gallery(ref, photos, itemHeight, overscanBy)}
          <Suspend blocked={blocked} />
        </React.Suspense>
      </React.StrictMode>
    )
    const { container, rerender } = render(tree(2, false))
    const committedPositioner = ref.current!.getPositioner()
    expect(committedPositioner.size()).toBe(4)
    const committedItems = Array.from({ length: 4 }, (_, index) => ({ ...committedPositioner.get(index) }))

    await act(async () => {
      React.startTransition(() => rerender(tree(20, true)))
    })
    expect(suspend).toHaveBeenCalledWith(true)
    expect(container.querySelector('[data-testid="fallback"]')).toBeNull()
    expect(ref.current!.getPositioner()).toBe(committedPositioner)
    expect(committedPositioner.size()).toBe(4)
    expect(Array.from({ length: 4 }, (_, index) => committedPositioner.get(index))).toEqual(committedItems)

    // Supersede the suspended work, then commit a smaller extension on the same cache.
    rerender(tree(2, false))
    expect(committedPositioner.size()).toBe(4)
    rerender(tree(4, false))
    expect(ref.current!.getPositioner()).toBe(committedPositioner)
    expect(committedPositioner.size()).toBe(8)
    expect(measuredPhotos).toEqual([])
    expect(firstCommits.every((commit) => commit.visibility !== 'hidden')).toBe(true)
  })

  it('recalculates known heights at the new column width instead of copying old measurements', () => {
    const ref = createMasonryRef()
    const { rerender } = render(gallery(ref))
    const firstPositioner = ref.current!.getPositioner()
    expect(firstPositioner.get(0)?.height).toBe(200)
    viewport.width = 204
    rerender(gallery(ref))
    const resizedPositioner = ref.current!.getPositioner()
    expect(resizedPositioner).not.toBe(firstPositioner)
    expect(resizedPositioner.columnWidth).toBe(100)
    expect(resizedPositioner.get(0)?.height).toBe(100)
    expect(resizedPositioner.get(2)?.top).toBe(104)
    expect(measuredPhotos).toEqual([])
  })

  it('resets index-based positions when equal-length items are reordered', () => {
    const ref = createMasonryRef()
    const items = [{ id: 'portrait', aspectRatio: 0.5 }, { id: 'landscape', aspectRatio: 2 }, ...photos]
    const { rerender } = render(gallery(ref, items))
    const firstPositioner = ref.current!.getPositioner()
    expect(firstPositioner.get(0)?.height).toBe(400)
    rerender(gallery(ref, [items[1], items[0], ...photos]))
    const reorderedPositioner = ref.current!.getPositioner()
    expect(reorderedPositioner).not.toBe(firstPositioner)
    expect(reorderedPositioner.get(0)?.height).toBe(100)
    expect(reorderedPositioner.get(1)?.height).toBe(400)
    expect(reorderedPositioner.get(2)?.column).toBe(0)
  })

  it('rebuilds positions when the height resolver changes or reposition is requested', () => {
    const ref = createMasonryRef()
    const { rerender } = render(gallery(ref))
    const firstPositioner = ref.current!.getPositioner()
    const doubledHeight = (photo: Photo, width: number) => itemHeight(photo, width) * 2
    rerender(gallery(ref, photos, doubledHeight))
    const changedPositioner = ref.current!.getPositioner()
    expect(changedPositioner).not.toBe(firstPositioner)
    expect(changedPositioner.get(0)?.height).toBe(400)
    act(() => ref.current!.reposition())
    expect(ref.current!.getPositioner()).not.toBe(changedPositioner)
    expect(ref.current!.getPositioner().get(0)?.height).toBe(400)
  })

  it('retains the regular DOM measurement path without a height resolver', () => {
    const ref = createMasonryRef()
    render(gallery(ref, photos, null))
    expect(measuredPhotos.length).toBeGreaterThan(0)
    expect(ref.current!.getPositioner().get(0)?.height).toBe(200)
  })

  it('falls back to measuring an invalid height without remeasuring earlier known photos', () => {
    const ref = createMasonryRef()
    const partlyKnownHeight = (photo: Photo, width: number) =>
      photo.id === 'photo-1' ? Number.NaN : itemHeight(photo, width)
    render(gallery(ref, photos, partlyKnownHeight))
    expect(measuredPhotos).toContain('photo-1')
    expect(measuredPhotos).not.toContain('photo-0')
    expect(ref.current!.getPositioner().get(1)?.height).toBe(200)
    expect(ref.current!.getPositioner().get(2)?.top).toBe(204)
  })

  it('resumes known-height preparation after a short unknown item is measured', () => {
    const ref = createMasonryRef()
    const items = [{ id: 'unknown-short', aspectRatio: 200 }, ...photos]
    const partlyKnownHeight = (photo: Photo, width: number) =>
      photo.id === 'unknown-short' ? Number.NaN : itemHeight(photo, width)
    const { container } = render(gallery(ref, items, partlyKnownHeight))
    expect(measuredPhotos).toContain('unknown-short')
    expect(ref.current!.getPositioner().get(0)?.height).toBe(1)
    expect(ref.current!.getPositioner().shortestColumn()).toBeGreaterThanOrEqual(400)
    expect(container.querySelector('[data-photo="photo-3"]')).not.toBeNull()
    expect(measuredPhotos).not.toContain('photo-3')
    expect(firstCommits.find((commit) => commit.id === 'photo-3')?.visibility).not.toBe('hidden')
  })

  it('renders every ResizeObserver correction, including consecutive changes on the same positioner', () => {
    const ref = createMasonryRef()
    const { container } = render(gallery(ref))
    const target = container.querySelector('[data-photo="photo-0"]')!.parentElement!
    const observer = observers.find((candidate) => candidate.targets.has(target))!
    expect(observer).toBeDefined()
    correctedHeights.set('photo-0', 250)
    act(() => {
      observer.callback(
        [{ target, contentRect: new DOMRect(), borderBoxSize: [], contentBoxSize: [], devicePixelContentBoxSize: [] }],
        observer as unknown as ResizeObserver,
      )
      vi.advanceTimersByTime(200)
    })
    expect(ref.current!.getPositioner().get(0)?.height).toBe(250)
    expect(ref.current!.getPositioner().get(2)?.top).toBe(254)
    expect(container.querySelector('[data-photo="photo-2"]')!.parentElement!.style.top).toBe('254px')

    correctedHeights.set('photo-0', 300)
    act(() => {
      observer.callback(
        [{ target, contentRect: new DOMRect(), borderBoxSize: [], contentBoxSize: [], devicePixelContentBoxSize: [] }],
        observer as unknown as ResizeObserver,
      )
      vi.advanceTimersByTime(200)
    })
    expect(ref.current!.getPositioner().get(0)?.height).toBe(300)
    expect(ref.current!.getPositioner().get(2)?.top).toBe(304)
    expect(container.querySelector('[data-photo="photo-2"]')!.parentElement!.style.top).toBe('304px')

    const correctedPositioner = ref.current!.getPositioner()
    const correctedItems = Array.from({ length: correctedPositioner.size() }, (_, index) => ({
      ...correctedPositioner.get(index),
    }))
    measuredPhotos.length = 0
    document.body.scrollTop = 600
    fireEvent.scroll(document.body)
    expect(ref.current!.getPositioner()).toBe(correctedPositioner)
    expect(correctedPositioner.size()).toBeGreaterThan(correctedItems.length)
    expect(correctedItems.map((_, index) => correctedPositioner.get(index))).toEqual(correctedItems)
    expect(measuredPhotos).toEqual([])
  })
})
