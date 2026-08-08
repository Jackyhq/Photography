import { describe, expect, it } from 'vitest'

import { formatDuration } from './format-duration'

describe('formatDuration', () => {
  it.each([
    [-1, '0:00'],
    [65, '1:05'],
    [3599.6, '1:00:00'],
    [3661, '1:01:01'],
  ])('formats %s seconds as %s', (duration, expected) => {
    expect(formatDuration(duration)).toBe(expected)
  })
})
