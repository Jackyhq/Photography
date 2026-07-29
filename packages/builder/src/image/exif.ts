import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'

import { isNil } from 'es-toolkit'
import type { ExifDateTime, Tags } from 'exiftool-vendored'
import { exiftool } from 'exiftool-vendored'
import type { Metadata } from 'sharp'
import sharp from 'sharp'

import { getGlobalLoggers } from '../photo/logger-adapter.js'
import type { PickedExif } from '../types/photo.js'

// 提取 EXIF 数据
export async function extractExifData(imageBuffer: Buffer, originalBuffer?: Buffer): Promise<PickedExif | null> {
  const log = getGlobalLoggers().exif

  try {
    log.info('开始提取 EXIF 数据')

    // Sharp 只读取已转换图像的尺寸。原始 HEIC 的 EXIF 由 ExifTool
    // 直接读取，避免被 Sharp/libheif 的解码安全限制阻断。
    const metadata = await sharp(imageBuffer).metadata()
    const tempDirectory = await fs.mkdtemp(path.join(os.tmpdir(), 'afilmory-exif-'))
    const tempImagePath = path.join(tempDirectory, `${crypto.randomUUID()}.jpg`)

    try {
      await fs.writeFile(tempImagePath, originalBuffer ?? imageBuffer)
      const exifData = await exiftool.read(tempImagePath)

      if (!metadata.exif && !hasPickedExifData(exifData)) {
        log.warn('未找到 EXIF 数据')
        return null
      }

      const result = handleExifData(exifData, metadata)
      log.success('EXIF 数据提取完成')
      return result
    } finally {
      await fs.rm(tempDirectory, { recursive: true, force: true })
    }
  } catch (error) {
    log.error('提取 EXIF 数据失败:', error)
    return null
  }
}

const pickKeys: Array<keyof Tags | (string & {})> = [
  'tz',
  'tzSource',
  'Orientation',
  'Make',
  'Model',
  'Software',
  'Artist',
  'Copyright',
  'ExposureTime',

  'FNumber',
  'ExposureProgram',
  'ISO',
  'OffsetTime',
  'OffsetTimeOriginal',
  'OffsetTimeDigitized',
  'ShutterSpeedValue',
  'ApertureValue',
  'BrightnessValue',
  'ExposureCompensationSet',
  'ExposureCompensationMode',
  'ExposureCompensationSetting',

  'ExposureCompensation',
  'MaxApertureValue',
  'LightSource',
  'Flash',
  'FocalLength',

  'ColorSpace',
  'ExposureMode',
  'FocalLengthIn35mmFormat',
  'SceneCaptureType',
  'LensMake',
  'LensModel',
  'MeteringMode',
  'WhiteBalance',
  'WBShiftAB',
  'WBShiftGM',
  'WhiteBalanceBias',

  'FlashMeteringMode',
  'SensingMethod',
  'FocalPlaneXResolution',
  'FocalPlaneYResolution',

  'Aperture',
  'ScaleFactor35efl',
  'ShutterSpeed',
  'LightValue',
  'Rating',
  // GPS
  'GPSAltitude',
  'GPSCoordinates',
  'GPSAltitudeRef',
  'GPSLatitude',
  'GPSLatitudeRef',
  'GPSLongitude',
  'GPSLongitudeRef',
  // HDR相关字段
  'MPImageType',
]

function hasPickedExifData(exifData: Tags): boolean {
  const values = exifData as unknown as Record<string, unknown>
  const keys = ['DateTimeOriginal', 'DateTimeDigitized', ...pickKeys]

  return keys.some((key) => {
    const value = values[key]
    return !isNil(value) && value !== ''
  })
}

function handleExifData(exifData: Tags, metadata: Metadata): PickedExif {
  const date = {
    DateTimeOriginal: formatExifDate(exifData.DateTimeOriginal),
    DateTimeDigitized: formatExifDate(exifData.DateTimeDigitized),
    OffsetTime: exifData.OffsetTime,
    OffsetTimeOriginal: exifData.OffsetTimeOriginal,
    OffsetTimeDigitized: exifData.OffsetTimeDigitized,
  }

  let FujiRecipe: any = null
  if (exifData.FilmMode) {
    FujiRecipe = {
      FilmMode: exifData.FilmMode,
      GrainEffectRoughness: exifData.GrainEffectRoughness,
      GrainEffectSize: exifData.GrainEffectSize,
      ColorChromeEffect: exifData.ColorChromeEffect,
      ColorChromeFxBlue: exifData.ColorChromeFXBlue,
      WhiteBalance: exifData.WhiteBalance,

      DynamicRange: exifData.DynamicRange,
      HighlightTone: exifData.HighlightTone,
      ShadowTone: exifData.ShadowTone,
      Saturation: exifData.Saturation,
      // Sharpness: exifData.Sharpness,
      NoiseReduction: exifData.NoiseReduction,
      Clarity: exifData.Clarity,
      ColorTemperature: exifData.ColorTemperature,
      DevelopmentDynamicRange: (exifData as any).DevelopmentDynamicRange,
      DynamicRangeSetting: exifData.DynamicRangeSetting,
    }
  }

  let SonyRecipe: any = null
  if (!isNil(exifData.CreativeStyle)) {
    SonyRecipe = {
      CreativeStyle: exifData.CreativeStyle,
      PictureEffect: exifData.PictureEffect,
      Hdr: exifData.Hdr,
      SoftSkinEffect: exifData.SoftSkinEffect,
    }
  }
  const size = {
    ImageWidth: exifData.ExifImageWidth || metadata.width,
    ImageHeight: exifData.ExifImageHeight || metadata.height,
  }
  const result: any = structuredClone(exifData)
  for (const key in result) {
    Reflect.deleteProperty(result, key)
  }
  for (const key of pickKeys) {
    result[key] = exifData[key]
  }

  return {
    ...date,
    ...size,
    ...result,

    ...(FujiRecipe ? { FujiRecipe } : {}),
    ...(SonyRecipe ? { SonyRecipe } : {}),
  }
}

const formatExifDate = (date: string | ExifDateTime | undefined) => {
  if (!date) {
    return
  }

  if (typeof date === 'string') {
    return new Date(date).toISOString()
  }

  return date.toISOString()
}
