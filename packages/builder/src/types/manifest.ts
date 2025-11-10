import type { ManifestVersion } from '../manifest/version'
import type { PhotoManifestItem } from './photo'

export interface CameraInfo {
  make: string // e.g., "Canon", "Sony", "Fujifilm"
  model: string // e.g., "EOS R5", "α7R V", "X-T5"
  displayName: string // e.g., "Canon EOS R5"
}

export interface LensInfo {
  make?: string // e.g., "Canon", "Sony", "Sigma" (can be empty)
  model: string // e.g., "RF 24-70mm F2.8 L IS USM"
  displayName: string // e.g., "Canon RF 24-70mm F2.8 L IS USM"
}

export type AfilmoryManifest = {
  version: ManifestVersion
  data: PhotoManifestItem[]
  cameras: CameraInfo[] // Unique cameras found in all photos
  lenses: LensInfo[] // Unique lenses found in all photos
}
