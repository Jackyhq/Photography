import { describe, expect, it } from 'vitest'

import { categorizeRawExifData, parseRawExifData } from './raw-exif-data'

describe('raw EXIF data', () => {
  it('parses non-empty key/value lines while preserving colons in values', () => {
    expect(parseRawExifData('ISO : 200\nComment: value:with:colons\ninvalid line\n')).toEqual({
      ISO: '200',
      Comment: 'value:with:colons',
    })
  })

  it('groups known fields and leaves unmatched fields uncategorized', () => {
    const result = categorizeRawExifData({
      Make: 'Fujifilm',
      'GPS Date/Time': '2026:08:08 12:00:00Z',
      'Custom Field': 'value',
    })

    expect(result.sections.find(({ definition }) => definition.key === 'camera')?.entries).toContainEqual([
      'Make',
      'Fujifilm',
    ])
    expect(result.sections.find(({ definition }) => definition.key === 'datetime')?.entries).toHaveLength(1)
    expect(result.sections.find(({ definition }) => definition.key === 'gps')?.entries).toHaveLength(1)
    expect(result.uncategorized).toEqual([['Custom Field', 'value']])
  })
})
