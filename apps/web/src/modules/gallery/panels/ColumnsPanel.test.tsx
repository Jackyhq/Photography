import { describe, expect, it } from 'vitest'

import { normalizeColumnCount } from './column-range'

describe('normalizeColumnCount', () => {
  it('preserves auto and clamps numeric settings to the active device range', () => {
    expect(normalizeColumnCount('auto', 3, 5)).toBe('auto')
    expect(normalizeColumnCount(8, 3, 5)).toBe(5)
    expect(normalizeColumnCount(2, 3, 8)).toBe(3)
    expect(normalizeColumnCount(6, 3, 8)).toBe(6)
  })
})
