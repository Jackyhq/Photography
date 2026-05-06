export type GPSAltitudeRef = 'Above Sea Level' | 'Below Sea Level'

export const normalizeGPSAltitudeRef = (value: unknown): GPSAltitudeRef => {
  if (typeof value === 'number') {
    return value === 1 ? 'Below Sea Level' : 'Above Sea Level'
  }

  if (typeof value === 'string') {
    const normalizedValue = value.trim().toLowerCase()
    return normalizedValue === '1' || normalizedValue === 'below sea level' ? 'Below Sea Level' : 'Above Sea Level'
  }

  return 'Above Sea Level'
}

export const isGPSAltitudeBelowSeaLevel = (value: unknown): boolean => {
  return normalizeGPSAltitudeRef(value) === 'Below Sea Level'
}
