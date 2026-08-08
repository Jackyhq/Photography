import type { PhotoManifestItem } from '@afilmory/builder'

const PREFERRED_LANGUAGES = ['zh-CN', 'en'] as const

function getPreferredText(
  localizedValues: Readonly<Record<string, string>> | null | undefined,
  legacyValue: string | null | undefined,
  fallback: string,
): string {
  for (const language of PREFERRED_LANGUAGES) {
    const value = localizedValues?.[language]?.trim()
    if (value) return value
  }

  return legacyValue?.trim() || fallback
}

export function getPreferredPhotoTitle(photo: PhotoManifestItem, fallback = ''): string {
  return getPreferredText(photo.titles, photo.title, fallback)
}

export function getPreferredPhotoDescription(photo: PhotoManifestItem, fallback = ''): string {
  return getPreferredText(photo.descriptions, photo.description, fallback)
}
