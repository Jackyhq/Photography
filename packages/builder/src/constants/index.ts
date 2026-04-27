// 支持的图片格式
export const SUPPORTED_FORMATS = new Set([
  '.jpg',
  '.jpeg',
  '.png',
  '.webp',
  '.bmp',
  '.tiff',
  '.heic',
  '.heif',
  '.hif',
  '.tif',
])

// HEIC/HEIF 格式
export const HEIC_FORMATS = new Set(['.heic', '.heif', '.hif'])

// 支持的独立视频格式
export const SUPPORTED_VIDEO_FORMATS = new Set(['.mp4', '.mov', '.webm', '.m4v'])

export const VIDEO_MIME_TYPES: Record<string, string> = {
  '.m4v': 'video/mp4',
  '.mov': 'video/quicktime',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
}
