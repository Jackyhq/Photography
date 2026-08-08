export type RawExifValue = string | number | boolean | null
export type ParsedRawExifData = Record<string, RawExifValue>
export type RawExifEntry = [key: string, value: RawExifValue]

export interface RawExifCategoryDefinition {
  key: string
  translationKey: string
  defaultLabel: string
  matchers: readonly string[]
}

export const RAW_EXIF_CATEGORIES = [
  {
    key: 'basic',
    translationKey: 'exif.raw.category.basic',
    defaultLabel: 'File Information',
    matchers: [
      'ExifTool Version Number',
      'File Name',
      'Directory',
      'File Size',
      'File Type',
      'File Type Extension',
      'MIME Type',
      'Major Brand',
      'Minor Version',
      'Compatible Brands',
    ],
  },
  {
    key: 'camera',
    translationKey: 'exif.raw.category.camera',
    defaultLabel: 'Camera Information',
    matchers: [
      'Make',
      'Camera Model Name',
      'Model',
      'Software',
      'Serial Number',
      'Internal Serial Number',
      'Fuji Model',
      'Camera Elevation Angle',
      'Roll Angle',
    ],
  },
  {
    key: 'exposure',
    translationKey: 'exif.raw.category.exposure',
    defaultLabel: 'Exposure Settings',
    matchers: [
      'Exposure Time',
      'F Number',
      'ISO',
      'Exposure Program',
      'Exposure Compensation',
      'Exposure Mode',
      'Metering Mode',
      'Shutter Speed Value',
      'Aperture Value',
      'Brightness Value',
      'Max Aperture Value',
      'Exposure Warning',
      'Auto Bracketing',
    ],
  },
  {
    key: 'lens',
    translationKey: 'exif.raw.category.lens',
    defaultLabel: 'Lens Information',
    matchers: [
      'Lens Info',
      'Lens Make',
      'Lens Model',
      'Lens Serial Number',
      'Focal Length',
      'Focal Length In 35mm Format',
      'Min Focal Length',
      'Max Focal Length',
      'Max Aperture At Min Focal',
      'Max Aperture At Max Focal',
      'Lens Modulation Optimizer',
      'Lens ID',
    ],
  },
  {
    key: 'datetime',
    translationKey: 'exif.raw.category.datetime',
    defaultLabel: 'Date & Time',
    matchers: [
      'Date/Time Original',
      'Create Date',
      'Modify Date',
      'File Modification Date/Time',
      'File Access Date/Time',
      'File Inode Change Date/Time',
      'Offset Time',
      'Offset Time Original',
      'Offset Time Digitized',
      'GPS Date/Time',
      'GPS Time Stamp',
      'GPS Date Stamp',
    ],
  },
  {
    key: 'gps',
    translationKey: 'exif.raw.category.gps',
    defaultLabel: 'GPS Information',
    matchers: [
      'GPS Version ID',
      'GPS Latitude',
      'GPS Latitude Ref',
      'GPS Longitude',
      'GPS Longitude Ref',
      'GPS Altitude',
      'GPS Altitude Ref',
      'GPS Position',
      'GPS Speed',
      'GPS Speed Ref',
      'GPS Time Stamp',
      'GPS Date Stamp',
      'GPS Date/Time',
    ],
  },
  {
    key: 'focus',
    translationKey: 'exif.raw.category.focus',
    defaultLabel: 'Focus System',
    matchers: [
      'Focus Mode',
      'AF Mode',
      'Focus Pixel',
      'AF-S Priority',
      'AF-C Priority',
      'Focus Mode 2',
      'Pre AF',
      'AF Area Mode',
      'AF Area Point Size',
      'AF Area Zone Size',
      'AF-C Setting',
      'AF-C Tracking Sensitivity',
      'AF-C Speed Tracking Sensitivity',
      'AF-C Zone Area Switching',
      'Focus Warning',
      'Subject Distance Range',
    ],
  },
  {
    key: 'flash',
    translationKey: 'exif.raw.category.flash',
    defaultLabel: 'Flash & Lighting',
    matchers: [
      'Flash',
      'Light Source',
      'Fuji Flash Mode',
      'Flash Exposure Comp',
      'Flash Metering Mode',
      'Slow Sync',
      'Flicker Reduction',
    ],
  },
  {
    key: 'imageProperties',
    translationKey: 'exif.raw.category.imageProperties',
    defaultLabel: 'Image Properties',
    matchers: [
      'Image Width',
      'Image Height',
      'Image Size',
      'Meta Image Size',
      'Exif Image Width',
      'Exif Image Height',
      'Image Spatial Extent',
      'Orientation',
      'X Resolution',
      'Y Resolution',
      'Resolution Unit',
      'Bits Per Sample',
      'Megapixels',
      'Aspect Ratio',
      'Color Space',
      'Color Profiles',
      'Color Primaries',
      'Matrix Coefficients',
    ],
  },
  {
    key: 'whiteBalance',
    translationKey: 'exif.raw.category.whiteBalance',
    defaultLabel: 'White Balance',
    matchers: [
      'White Balance',
      'White Balance Fine Tune',
      'White Balance Bias',
      'WB Shift AB',
      'WB Shift GM',
      'Color Temperature',
      'Auto White Balance',
      'Standard White Balance GRB',
    ],
  },
  {
    key: 'fuji',
    translationKey: 'exif.raw.category.fuji',
    defaultLabel: 'Fuji Film Simulation',
    matchers: [
      'Film Mode',
      'Dynamic Range',
      'Dynamic Range Setting',
      'Auto Dynamic Range',
      'Highlight Tone',
      'Shadow Tone',
      'Saturation',
      'Sharpness',
      'Noise Reduction',
      'Clarity',
      'Grain Effect Roughness',
      'Grain Effect Size',
      'Color Chrome Effect',
      'Color Chrome FX Blue',
      'Picture Mode',
      'Quality',
      'Contrast',
      'Image Generation',
      'Image Count',
      'Exposure Count',
    ],
  },
  {
    key: 'technical',
    translationKey: 'exif.raw.category.technical',
    defaultLabel: 'Technical Parameters',
    matchers: [
      'Sensing Method',
      'File Source',
      'Scene Type',
      'Scene Capture Type',
      'Custom Rendered',
      'Focal Plane X Resolution',
      'Focal Plane Y Resolution',
      'Focal Plane Resolution Unit',
      'Image Stabilization',
      'Blur Warning',
      'Shutter Type',
      'Drive Mode',
      'Drive Speed',
      'Sequence Number',
      'Scale Factor To 35 mm Equivalent',
      'Circle Of Confusion',
      'Field Of View',
      'Hyperfocal Distance',
      'Light Value',
    ],
  },
  {
    key: 'video',
    translationKey: 'exif.raw.category.video',
    defaultLabel: 'Video/HEIF Properties',
    matchers: [
      'HEVC Configuration Version',
      'General Profile Space',
      'General Tier Flag',
      'General Profile IDC',
      'Gen Profile Compatibility Flags',
      'Constraint Indicator Flags',
      'General Level IDC',
      'Min Spatial Segmentation IDC',
      'Parallelism Type',
      'Chroma Format',
      'Bit Depth Luma',
      'Bit Depth Chroma',
      'Average Frame Rate',
      'Constant Frame Rate',
      'Num Temporal Layers',
      'Temporal ID Nested',
      'Transfer Characteristics',
      'Video Full Range Flag',
      'Image Pixel Depth',
      'Rotation',
      'Media Data Size',
      'Media Data Offset',
    ],
  },
  {
    key: 'faceDetection',
    translationKey: 'exif.raw.category.faceDetection',
    defaultLabel: 'Face Detection',
    matchers: ['Faces Detected', 'Num Face Elements', 'Face Detection'],
  },
  {
    key: 'other',
    translationKey: 'exif.raw.category.other',
    defaultLabel: 'Other Metadata',
    matchers: [
      'File Permissions',
      'Handler Type',
      'Primary Item Reference',
      'Other Image',
      'Preview Image',
      'Thumbnail Image',
      'Exif Byte Order',
      'Y Cb Cr Positioning',
      'Copyright',
      'Components Configuration',
      'Compressed Bits Per Pixel',
      'Version',
      'Flashpix Version',
      'Interoperability Index',
      'Interoperability Version',
      'Composite Image',
      'PrintIM Version',
      'Artist',
      'Rating',
      'User Comment',
    ],
  },
] as const satisfies readonly RawExifCategoryDefinition[]

export function parseRawExifData(rawData: string): ParsedRawExifData {
  const data: ParsedRawExifData = {}

  for (const line of rawData.split('\n')) {
    if (!line.trim()) continue

    const colonIndex = line.indexOf(':')
    if (colonIndex === -1) continue

    const key = line.slice(0, colonIndex).trim()
    const value = line.slice(colonIndex + 1).trim()
    if (key && value) data[key] = value
  }

  return data
}

export function categorizeRawExifData(data: ParsedRawExifData) {
  const entries = Object.entries(data) as RawExifEntry[]
  const sections = RAW_EXIF_CATEGORIES.map((definition) => ({
    definition,
    entries: entries.filter(([key]) => definition.matchers.some((matcher) => key.includes(matcher))),
  }))
  const allMatchers = RAW_EXIF_CATEGORIES.flatMap(({ matchers }) => matchers)
  const uncategorized = entries.filter(([key]) => !allMatchers.some((matcher) => key.includes(matcher)))

  return { entries, sections, uncategorized }
}
