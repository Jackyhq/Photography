import type { Positioner } from 'masonic'
import { describe, expect, it } from 'vitest'

import { createIndexOrderedRange } from './masonry-range'

describe('createIndexOrderedRange', () => {
  it('keeps virtualized masonry cells in logical item order', () => {
    const unorderedRange: Positioner['range'] = (_lo, _hi, renderCallback) => {
      renderCallback(5, 500, 0)
      renderCallback(1, 100, 0)
      renderCallback(3, 300, 0)
    }
    const renderedItems: Array<{ index: number; left: number; top: number }> = []

    createIndexOrderedRange(unorderedRange)(0, 1000, (index, left, top) => {
      renderedItems.push({ index, left, top })
    })

    expect(renderedItems).toEqual([
      { index: 1, left: 100, top: 0 },
      { index: 3, left: 300, top: 0 },
      { index: 5, left: 500, top: 0 },
    ])
  })
})
