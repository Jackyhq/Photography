interface PhotoWithDescriptions {
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
  return [...Object.values(photo.descriptions ?? {}), photo.description].filter(
    (description): description is string => typeof description === 'string' && description.trim().length > 0,
  )
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
