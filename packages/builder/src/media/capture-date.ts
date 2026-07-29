import path from 'node:path'

export const UNKNOWN_CAPTURE_DATE = new Date(0).toISOString()

export type CaptureDateSource = 'metadata' | 'filename' | 'unknown'

export interface ResolvedCaptureDate {
  dateTaken: string
  source: CaptureDateSource
}

export function coerceCaptureDate(value: unknown): Date | null {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value
  }

  if (value && typeof value === 'object' && 'toDate' in value && typeof value.toDate === 'function') {
    const date = value.toDate()
    return date instanceof Date && !Number.isNaN(date.getTime()) ? date : null
  }

  if (typeof value === 'string') {
    const normalized = value.replace(/^(\d{4}):(\d{2}):(\d{2})/, '$1-$2-$3')
    const date = new Date(normalized)
    return Number.isNaN(date.getTime()) ? null : date
  }

  return null
}

export function extractDateFromKey(key: string): string | null {
  const normalizedKey = key.replaceAll('\\', '/')
  const fileName = path.posix.basename(normalizedKey, path.posix.extname(normalizedKey))
  const compactDateMatch = fileName.match(/(?:^|\D)(\d{4})(\d{2})(\d{2})(?:(\d{2})(\d{2})(\d{2}))?(?=\D|$)/)

  if (compactDateMatch) {
    const [, year, month, day, hour = '00', minute = '00', second = '00'] = compactDateMatch
    return createUtcDate(year, month, day, hour, minute, second)?.toISOString() ?? null
  }

  const dashedDateMatch = fileName.match(/(?:^|\D)(\d{4})-(\d{2})-(\d{2})(?=\D|$)/)
  if (dashedDateMatch) {
    const [, year, month, day] = dashedDateMatch
    return createUtcDate(year, month, day, '00', '00', '00')?.toISOString() ?? null
  }

  return null
}

export function resolveCaptureDate(key: string, metadataDate: unknown): ResolvedCaptureDate {
  const parsedMetadataDate = coerceCaptureDate(metadataDate)
  if (parsedMetadataDate) {
    return {
      dateTaken: parsedMetadataDate.toISOString(),
      source: 'metadata',
    }
  }

  const filenameDate = extractDateFromKey(key)
  if (filenameDate) {
    return {
      dateTaken: filenameDate,
      source: 'filename',
    }
  }

  return {
    dateTaken: UNKNOWN_CAPTURE_DATE,
    source: 'unknown',
  }
}

function createUtcDate(
  yearText: string,
  monthText: string,
  dayText: string,
  hourText: string,
  minuteText: string,
  secondText: string,
): Date | null {
  const year = Number.parseInt(yearText)
  const month = Number.parseInt(monthText)
  const day = Number.parseInt(dayText)
  const hour = Number.parseInt(hourText)
  const minute = Number.parseInt(minuteText)
  const second = Number.parseInt(secondText)
  const date = new Date(Date.UTC(year, month - 1, day, hour, minute, second))

  if (
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() !== month - 1 ||
    date.getUTCDate() !== day ||
    date.getUTCHours() !== hour ||
    date.getUTCMinutes() !== minute ||
    date.getUTCSeconds() !== second
  ) {
    return null
  }

  return date
}
