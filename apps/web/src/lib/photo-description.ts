interface PhotoWithDescriptions {
  id?: string
  title?: string
  description?: string
  descriptions?: Record<string, string>
}

export function getLocalizedPhotoDescription(photo: PhotoWithDescriptions, language: string): string {
  const { descriptions } = photo
  if (!descriptions) return photo.description ?? ''

  for (const candidate of getDescriptionLanguageCandidates(language)) {
    const description = descriptions[candidate]?.trim()
    if (description) return description
  }

  return photo.description ?? ''
}

export function getSearchablePhotoDescriptions(photo: PhotoWithDescriptions): string[] {
  const descriptions = [...Object.values(photo.descriptions ?? {}), photo.description]
    .map((description) => (typeof description === 'string' ? description.trim() : ''))
    .filter((description) => description.length > 0)

  return Array.from(new Set(descriptions))
}

export function getPhotoAltText(photo: PhotoWithDescriptions, language: string, fallback = 'Photo'): string {
  const description = getLocalizedPhotoDescription(photo, language).trim()
  if (description) return description

  const title = photo.title?.trim()
  if (title) return title

  const id = photo.id?.trim()
  return id || fallback
}

function getDescriptionLanguageCandidates(language: string): string[] {
  const normalized = language.trim()
  const baseLanguage = normalized.split('-')[0]

  if (baseLanguage === 'zh') {
    return [normalized, 'zh-CN', 'en']
  }

  if (baseLanguage === 'en') {
    return [normalized, 'en', 'zh-CN']
  }

  return [normalized, baseLanguage, 'en', 'zh-CN']
}
