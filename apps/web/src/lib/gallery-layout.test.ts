import { describe, expect, it } from 'vitest'

import { getDefaultGalleryImageSizes } from './gallery-layout'

describe('default gallery preload sizes', () => {
  it.each([
    [311, 1, 303],
    [312, 2, 150],
    [430, 2, 209],
    [1023, 6, 165],
    [1024, 4, 253],
    [1265, 4, 313],
    [1266, 5, 250],
    [2028, 8, 250],
    [2282, 8, 281],
    [3440, 8, 426],
  ])('matches masonry at viewport %ipx (%i columns, %ipx cards)', (viewport, columns, cardWidth) => {
    // Evaluate the generated sizes rules in CSS order, including its mobile fallback.
    const rule = getDefaultGalleryImageSizes()
      .split(', ')
      .map((entry) => entry.match(/^(?:\(min-width: (\d+)px\) )?calc\(\(100vw - (\d+)px\) \/ (\d+)\)$/))
      .find((match) => match && viewport >= Number(match[1] ?? 0))!

    expect(Number(rule[3])).toBe(columns)
    // Masonic floors the calculated width; CSS sizes can differ by less than a pixel.
    expect(Math.floor((viewport - Number(rule[2])) / Number(rule[3]))).toBe(cardWidth)
  })
})
