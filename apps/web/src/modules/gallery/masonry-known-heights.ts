import type { Positioner } from 'masonic'

export type MasonryItemHeight<Item> = (item: Item, width: number, index: number) => number | undefined

/** Seed only the next viewport range; unknown items keep Masonic's DOM measurement fallback. */
export function primeKnownMasonryHeights<Item>(
  positioner: Positioner,
  items: Item[],
  itemHeight: MasonryItemHeight<Item>,
  rangeEnd: number,
): void {
  for (let index = positioner.size(); index < items.length && positioner.shortestColumn() < rangeEnd; index++) {
    const height = itemHeight(items[index], positioner.columnWidth, index)
    // offsetHeight uses whole CSS pixels. Matching it also avoids needless ResizeObserver corrections.
    if (height === undefined || !Number.isFinite(height) || Math.round(height) <= 0) break
    positioner.set(index, Math.round(height))
  }
}
