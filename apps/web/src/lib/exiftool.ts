class ExifToolManagerStatic {
  private isLoaded = false
  private loadPromise: Promise<void> | null = null

  private exifTool: typeof import('@uswriting/exiftool') | null = null

  async load() {
    if (this.isLoaded) return

    if (!this.loadPromise) {
      this.loadPromise = import('@uswriting/exiftool')
        .then((exiftool) => {
          console.info('ExifTool loaded...')
          this.exifTool = exiftool
          this.isLoaded = true
        })
        .finally(() => {
          this.loadPromise = null
        })
    }

    await this.loadPromise
  }

  async parse(buffer: Blob, filename?: string) {
    if (!this.exifTool) {
      await this.load()
    }

    if (!this.exifTool) {
      throw new Error('ExifTool not loaded')
    }
    const metadata = await this.exifTool.parseMetadata(new File([buffer], `/afilmory/${filename}`))

    if (metadata.error) {
      throw new Error(metadata.error)
    }

    return metadata.data
  }
}
export const ExifToolManager = new ExifToolManagerStatic()
