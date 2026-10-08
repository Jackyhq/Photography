import type { PhotoManifestItem, PickedExif } from '@afilmory/builder'
import { describe, expect, it } from 'vitest'

import { convertExifGPSToDecimal, convertPhotosToMarkersFromEXIF } from './map-utils'

const gpsExif = (coordinates: Partial<PickedExif>): PickedExif => coordinates as PickedExif

describe('EXIF GPS coordinates', () => {
  it.each([
    { latitude: 0, longitude: 120 },
    { latitude: 30, longitude: 0 },
    { latitude: 0, longitude: 0 },
    { latitude: -0, longitude: -0 },
  ])('preserves zero coordinates at ($latitude, $longitude)', ({ latitude, longitude }) => {
    expect(convertExifGPSToDecimal(gpsExif({ GPSLatitude: latitude, GPSLongitude: longitude }))).toMatchObject({
      latitude,
      longitude,
    })
  })

  it.each([
    null,
    gpsExif({}),
    gpsExif({ GPSLatitude: 0 }),
    gpsExif({ GPSLongitude: 0 }),
    gpsExif({ GPSLatitude: Number.NaN, GPSLongitude: 120 }),
    gpsExif({ GPSLatitude: 30, GPSLongitude: Number.POSITIVE_INFINITY }),
    gpsExif({ GPSLatitude: 91, GPSLongitude: 0 }),
    gpsExif({ GPSLatitude: 0, GPSLongitude: -181 }),
  ])('rejects missing or invalid coordinates: %j', (exif) => {
    expect(convertExifGPSToDecimal(exif)).toBeNull()
  })

  it.each([
    { GPSLatitude: null, GPSLongitude: 120 },
    { GPSLatitude: 30, GPSLongitude: null },
    { GPSLatitude: '', GPSLongitude: 120 },
    { GPSLatitude: 30, GPSLongitude: '' },
    { GPSLatitude: ' \t ', GPSLongitude: 120 },
    { GPSLatitude: 30, GPSLongitude: ' \n ' },
    { GPSLatitude: 'invalid', GPSLongitude: 120 },
  ])('rejects malformed coordinate values from manifest JSON: %j', (exif) => {
    expect(convertExifGPSToDecimal(exif as unknown as PickedExif)).toBeNull()
  })

  it('keeps valid numeric strings from legacy manifest JSON', () => {
    const exif = { GPSLatitude: '0', GPSLongitude: '-120.5' }

    expect(convertExifGPSToDecimal(exif as unknown as PickedExif)).toMatchObject({ latitude: 0, longitude: -120.5 })
  })

  it('keeps southern and western direction handling for nonzero coordinates', () => {
    expect(
      convertExifGPSToDecimal(
        gpsExif({ GPSLatitude: 30, GPSLongitude: 120, GPSLatitudeRef: 'S', GPSLongitudeRef: 'W' }),
      ),
    ).toMatchObject({ latitude: -30, longitude: -120 })
  })

  it('keeps zero-coordinate photos in the map marker list while omitting missing coordinates', () => {
    const createPhoto = (id: string, exif: PickedExif): PhotoManifestItem => ({
      id,
      title: id,
      dateTaken: '2026-01-01',
      tags: [],
      description: '',
      originalUrl: `/${id}.jpg`,
      thumbnailUrl: `/${id}.webp`,
      thumbHash: null,
      width: 100,
      height: 100,
      aspectRatio: 1,
      s3Key: `${id}.jpg`,
      lastModified: '2026-01-01',
      size: 100,
      exif,
      toneAnalysis: null,
    })
    const photos = [
      createPhoto('equator', gpsExif({ GPSLatitude: 0, GPSLongitude: 120 })),
      createPhoto('prime-meridian', gpsExif({ GPSLatitude: 30, GPSLongitude: 0 })),
      createPhoto('missing-longitude', gpsExif({ GPSLatitude: 0 })),
    ]

    expect(
      convertPhotosToMarkersFromEXIF(photos).map(({ id, latitude, longitude }) => ({ id, latitude, longitude })),
    ).toEqual([
      { id: 'equator', latitude: 0, longitude: 120 },
      { id: 'prime-meridian', latitude: 30, longitude: 0 },
    ])
  })
})
