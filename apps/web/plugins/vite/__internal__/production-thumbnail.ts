export const PRODUCTION_THUMBNAIL_WIDTH = 640

interface ThumbnailSource {
  id?: string
  thumbnailSrcSet?: string | null
  thumbnailWebpSrcSet?: string | null
}

interface SrcSetCandidate {
  url: string
  width: number
}

function parseSrcSetCandidate(candidate: string, label: string): SrcSetCandidate {
  const parts = candidate.trim().split(/\s+/u)
  const descriptor = parts.pop()
  const url = parts.join(' ')
  const widthSource = descriptor?.endsWith('w') ? descriptor.slice(0, -1) : ''

  if (!url || !/^\d+$/u.test(widthSource)) {
    throw new Error(`Invalid WebP srcset candidate for ${label}: ${candidate.trim()}`)
  }

  return {
    url,
    width: Number.parseInt(widthSource, 10),
  }
}

export function getProductionThumbnailUrl(
  source: Pick<ThumbnailSource, 'thumbnailWebpSrcSet'>,
  label = 'photo',
): string {
  const srcSet = source.thumbnailWebpSrcSet?.trim()
  if (!srcSet) {
    throw new Error(`Missing thumbnailWebpSrcSet for ${label}`)
  }

  const candidate = srcSet
    .split(',')
    .map((entry) => parseSrcSetCandidate(entry, label))
    .find((entry) => entry.width === PRODUCTION_THUMBNAIL_WIDTH)

  if (!candidate) {
    throw new Error(`Missing ${PRODUCTION_THUMBNAIL_WIDTH}w WebP thumbnail for ${label}`)
  }

  return candidate.url
}

export function normalizeProductionThumbnail<T extends ThumbnailSource>(
  source: T,
  label = source.id ? `photo ${source.id}` : 'photo',
): Omit<T, 'thumbnailSrcSet'> & { thumbnailUrl: string } {
  const normalized = {
    ...source,
    thumbnailUrl: getProductionThumbnailUrl(source, label),
  }

  delete normalized.thumbnailSrcSet
  return normalized
}
