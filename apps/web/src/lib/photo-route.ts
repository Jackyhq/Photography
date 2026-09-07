const PHOTO_DETAIL_PATH_PATTERN = /^\/photos\/([^/?#]+)\/?$/

export function getPhotoDetailPath(photoId: string): string {
  return `/photos/${encodeURIComponent(photoId)}/`
}

export function getPhotoIdFromPathname(pathname: string): string | undefined {
  const match = pathname.match(PHOTO_DETAIL_PATH_PATTERN)
  if (!match?.[1]) return undefined
  try {
    return decodeURIComponent(match[1])
  } catch {
    return undefined
  }
}

export function normalizeCanonicalPathname(path: string): string {
  const pathname = path.startsWith('/') ? path : `/${path}`
  const cleanPathname = pathname.split(/[?#]/)[0] ?? ''
  const trimmedPathname = cleanPathname.replace(/\/+$/, '')

  if (!trimmedPathname || trimmedPathname === '/') {
    return '/'
  }

  return `${trimmedPathname}/`
}
