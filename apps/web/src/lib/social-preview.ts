const SOCIAL_PREVIEW_IMAGE_EXTENSION = /\.(?:jpe?g|png)$/iu

interface SocialPreviewPhoto {
  mediaType?: 'photo' | 'video'
  originalUrl: string
  thumbnailUrl: string
  width: number
  height: number
}

export interface PhotoSocialPreview {
  source: string
  width?: number
  height?: number
}

export function getPhotoSocialPreview(photo: SocialPreviewPhoto): PhotoSocialPreview {
  if (photo.mediaType !== 'video' && hasSocialPreviewImageExtension(photo.originalUrl)) {
    const hasDimensions = photo.width > 0 && photo.height > 0
    return {
      source: photo.originalUrl,
      width: hasDimensions ? photo.width : undefined,
      height: hasDimensions ? photo.height : undefined,
    }
  }

  return { source: photo.thumbnailUrl }
}

function hasSocialPreviewImageExtension(value: string): boolean {
  try {
    return SOCIAL_PREVIEW_IMAGE_EXTENSION.test(new URL(value, 'https://afilmory.local/').pathname)
  } catch {
    return SOCIAL_PREVIEW_IMAGE_EXTENSION.test(value.split(/[?#]/u, 1)[0] ?? '')
  }
}
