import type { Positioner } from 'masonic'

export type MasonryItemHeight<Item> = (item: Item, width: number, index: number) => number | undefined

export function getKnownMasonryHeight<Item>(
  item: Item,
  width: number,
  index: number,
  itemHeight: MasonryItemHeight<Item>,
): number | undefined {
  const height = itemHeight(item, width, index)
  // offsetHeight uses whole CSS pixels. Matching it also avoids needless ResizeObserver corrections.
  return height !== undefined && Number.isFinite(height) && Math.round(height) > 0 ? Math.round(height) : undefined
}

/** Seed only the next viewport range; unknown items keep Masonic's DOM measurement fallback. */
export function primeKnownMasonryHeights<Item>(
  positioner: Positioner,
  items: Item[],
  itemHeight: MasonryItemHeight<Item>,
  rangeEnd: number,
): void {
  for (let index = positioner.size(); index < items.length && positioner.shortestColumn() < rangeEnd; index++) {
    const height = getKnownMasonryHeight(items[index], positioner.columnWidth, index, itemHeight)
    if (height === undefined) break
    positioner.set(index, height)
  }
}
