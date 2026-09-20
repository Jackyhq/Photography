import { createPositioner } from 'masonic'
import { describe, expect, it } from 'vitest'

import { primeKnownMasonryHeights } from './masonry-known-heights'

describe('primeKnownMasonryHeights', () => {
  it('rounds like offsetHeight and fills only enough of each column for the requested range', () => {
    const positioner = createPositioner(2, 200, 4)
    const items = Array.from({ length: 10000 }, () => 1.5)
    primeKnownMasonryHeights(positioner, items, (ratio, width) => width / ratio, 400)
    expect(positioner.size()).toBe(6)
    expect(positioner.get(0)?.height).toBe(133)
    expect(positioner.get(4)?.top).toBe(274)
  })

  it.each([undefined, Number.NaN, Infinity, 0, -1, 0.1])(
    'leaves an unknown or invalid height (%s) for DOM measurement',
    (height) => {
      const positioner = createPositioner(2, 200, 4)
      const items = [100, height, 100, 100]
      primeKnownMasonryHeights(positioner, items, (item) => item, 400)
      expect(positioner.size()).toBe(1)
      expect(positioner.get(1)).toBeUndefined()
      // Resume safely after Masonic measures the unknown item. Existing positions are never set twice.
      positioner.set(1, 150)
      primeKnownMasonryHeights(positioner, items, (item) => item, 400)
      expect(positioner.size()).toBe(4)
      expect(positioner.get(1)?.height).toBe(150)
      expect(positioner.get(2)?.top).toBe(104)
    },
  )
})
