import type { Positioner } from 'masonic'

interface PositionedRangeItem {
  index: number
  left: number
  top: number
}

export function createIndexOrderedRange(range: Positioner['range']): Positioner['range'] {
  return (lo, hi, renderCallback) => {
    const visibleItems: PositionedRangeItem[] = []

    range(lo, hi, (index, left, top) => {
      visibleItems.push({ index, left, top })
    })

    visibleItems.sort((a, b) => a.index - b.index)

    for (const item of visibleItems) {
      renderCallback(item.index, item.left, item.top)
    }
  }
}
