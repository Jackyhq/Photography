import { readFileSync } from 'node:fs'
import { join } from 'node:path'

import { workdir } from '../packages/builder/src/path.js'
import type { PhotoManifestItem } from '../packages/builder/src/types/photo.js'

class BuildTimePhotoLoader {
  private photos: PhotoManifestItem[] = []
  private photoMap: Record<string, PhotoManifestItem> = {}

  constructor() {
    try {
      const manifestPath = join(workdir, 'src/data/photos-manifest.json')
      const manifestContent = readFileSync(manifestPath, 'utf-8')
      this.photos = JSON.parse(manifestContent).data as PhotoManifestItem[]

      this.photos.forEach((photo) => {
        this.photoMap[photo.id] = photo
      })

      console.info(`📚 Loaded ${this.photos.length} photos from manifest`)
    } catch (error) {
      console.error('❌ Failed to load photos manifest:', error)
      this.photos = []
    }
  }

  getPhotos() {
    return this.photos
  }

  getPhoto(id: string) {
    return this.photoMap[id]
  }
}

export const buildTimePhotoLoader = new BuildTimePhotoLoader()
