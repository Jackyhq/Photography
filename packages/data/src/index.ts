import type { AfilmoryManifest, CameraInfo, LensInfo, PhotoManifestItem, PickedExif } from '@afilmory/builder'

export type GalleryExif = Pick<
  PickedExif,
  'ISO' | 'FNumber' | 'ExposureTime' | 'FocalLength' | 'FocalLengthIn35mmFormat'
>

export interface PhotoManifestIndexItem
  extends Omit<PhotoManifestItem, 'exif' | 'fileCreatedAt' | 's3Key' | 'toneAnalysis'> {
  sortTime: number
  cameraDisplayName?: string
  lensDisplayName?: string
  rating?: number
  galleryExif?: GalleryExif | null
  exif?: PickedExif | null
  fileCreatedAt?: string
  s3Key?: string
  toneAnalysis?: PhotoManifestItem['toneAnalysis'] | null
}

export interface AfilmoryIndexManifest extends Omit<AfilmoryManifest, 'data'> {
  data: PhotoManifestIndexItem[]
}

declare const __MANIFEST__: AfilmoryIndexManifest
declare const __FULL_MANIFEST_URL__: string | undefined

class PhotoLoader {
  private photos: PhotoManifestIndexItem[] = []
  private photoMap: Record<string, PhotoManifestIndexItem> = {}
  private cameras: CameraInfo[] = []
  private lenses: LensInfo[] = []
  private fullManifestPromise: Promise<AfilmoryManifest> | null = null
  private fullManifest: AfilmoryManifest | null = null
  private fullPhotoMap: Record<string, PhotoManifestItem> | null = null

  constructor() {
    this.getAllTags = this.getAllTags.bind(this)
    this.getAllCameras = this.getAllCameras.bind(this)
    this.getAllLenses = this.getAllLenses.bind(this)
    this.getPhotos = this.getPhotos.bind(this)
    this.getPhoto = this.getPhoto.bind(this)
    this.getFullPhotos = this.getFullPhotos.bind(this)
    this.getPhotoDetail = this.getPhotoDetail.bind(this)
    this.loadFullManifest = this.loadFullManifest.bind(this)

    this.photos = __MANIFEST__.data
    this.cameras = __MANIFEST__.cameras as unknown as CameraInfo[]
    this.lenses = __MANIFEST__.lenses as unknown as LensInfo[]

    this.photos.forEach((photo) => {
      this.photoMap[photo.id] = photo
    })
  }

  getPhotos() {
    return this.photos
  }

  getPhoto(id: string) {
    return this.photoMap[id]
  }

  async loadFullManifest(): Promise<AfilmoryManifest> {
    if (this.fullManifest) {
      return this.fullManifest
    }

    if (!this.fullManifestPromise) {
      this.fullManifestPromise = this.fetchFullManifest()
    }

    return this.fullManifestPromise
  }

  async getFullPhotos(): Promise<PhotoManifestItem[]> {
    const manifest = await this.loadFullManifest()
    return manifest.data
  }

  async getPhotoDetail(id: string): Promise<PhotoManifestItem | undefined> {
    const manifest = await this.loadFullManifest()
    if (!this.fullPhotoMap) {
      this.fullPhotoMap = Object.fromEntries(manifest.data.map((photo) => [photo.id, photo]))
    }

    return this.fullPhotoMap[id]
  }

  getAllTags() {
    const tagSet = new Set<string>()
    this.photos.forEach((photo) => {
      photo.tags.forEach((tag) => tagSet.add(tag))
    })
    return Array.from(tagSet).sort()
  }

  getAllCameras() {
    return this.cameras
  }

  getAllLenses() {
    return this.lenses
  }

  private async fetchFullManifest(): Promise<AfilmoryManifest> {
    const fullManifestUrl = __FULL_MANIFEST_URL__ === undefined ? undefined : __FULL_MANIFEST_URL__
    if (!fullManifestUrl) {
      return __MANIFEST__ as unknown as AfilmoryManifest
    }

    const response = await fetch(fullManifestUrl, {
      credentials: 'same-origin',
    })

    if (!response.ok) {
      throw new Error(`Failed to load full manifest: ${response.status}`)
    }

    const manifest = (await response.json()) as AfilmoryManifest
    this.fullManifest = manifest
    this.fullPhotoMap = Object.fromEntries(manifest.data.map((photo) => [photo.id, photo]))

    return manifest
  }
}
export const photoLoader = new PhotoLoader()
