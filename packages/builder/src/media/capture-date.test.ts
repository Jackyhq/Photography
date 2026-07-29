// @vitest-environment node

import { describe, expect, it } from 'vitest'

import { extractDateFromKey, resolveCaptureDate, UNKNOWN_CAPTURE_DATE } from './capture-date.js'

describe('capture date resolution', () => {
  it('prefers a valid metadata capture date', () => {
    expect(resolveCaptureDate('动图/20250925(2).heic', '2025-09-25T13:15:13.713+08:00')).toEqual({
      dateTaken: '2025-09-25T05:15:13.713Z',
      source: 'metadata',
    })
  })

  it('extracts compact dates and timestamps from standardized filenames', () => {
    expect(extractDateFromKey('动图/20250925(2).heic')).toBe('2025-09-25T00:00:00.000Z')
    expect(extractDateFromKey('随手/20250925131513_1.jpg')).toBe('2025-09-25T13:15:13.000Z')
  })

  it('falls back from invalid metadata to a valid filename date', () => {
    expect(resolveCaptureDate('风光/2024-01-15_photo.jpg', 'invalid')).toEqual({
      dateTaken: '2024-01-15T00:00:00.000Z',
      source: 'filename',
    })
  })

  it('uses a stable minimum date when no capture date is available', () => {
    expect(resolveCaptureDate('随手/untitled.jpg', null)).toEqual({
      dateTaken: UNKNOWN_CAPTURE_DATE,
      source: 'unknown',
    })
    expect(UNKNOWN_CAPTURE_DATE).toBe('1970-01-01T00:00:00.000Z')
  })

  it('rejects invalid calendar dates in filenames', () => {
    expect(extractDateFromKey('随手/20250230120000.jpg')).toBeNull()
  })
})
