import { describe, expect, it } from 'vitest'

import type { MasonryKeyboardPositioner, MasonryNavigationDirection } from './masonry-keyboard-navigation'
import { findNextMasonryItemIndex } from './masonry-keyboard-navigation'

const items = [
  { left: 0, top: 0, height: 180, column: 0 },
  { left: 104, top: 0, height: 120, column: 1 },
  { left: 208, top: 0, height: 150, column: 2 },
  { left: 104, top: 124, height: 180, column: 1 },
  { left: 208, top: 154, height: 100, column: 2 },
  { left: 0, top: 184, height: 130, column: 0 },
]

const positioner: MasonryKeyboardPositioner = {
  columnWidth: 100,
  get: (index) => items[index],
  all: () => items,
}

const navigate = (currentIndex: number, direction: MasonryNavigationDirection) =>
  findNextMasonryItemIndex({
    currentIndex,
    direction,
    positioner,
    isNavigable: (index) => index !== 0,
  })

describe('findNextMasonryItemIndex', () => {
  it('moves horizontally to the closest item in the adjacent column', () => {
    expect(navigate(1, 'right')).toBe(2)
    expect(navigate(2, 'left')).toBe(1)
  })

  it('moves vertically within the current masonry column', () => {
    expect(navigate(1, 'down')).toBe(3)
    expect(navigate(3, 'up')).toBe(1)
  })

  it('skips non-navigable masonry items', () => {
    expect(navigate(1, 'left')).toBe(5)
  })

  it('returns null when there is no item in the requested direction', () => {
    expect(navigate(1, 'up')).toBeNull()
    expect(navigate(2, 'right')).toBeNull()
  })
})
