const PHOTO_DETAIL_PATH_PATTERN = /^\/photos\/[^/?#]+\/?$/

export function getPhotoDetailPath(photoId: string): string {
  return `/photos/${encodeURIComponent(photoId)}/`
}

export function normalizeCanonicalPathname(path: string): string {
  const pathname = path.startsWith('/') ? path : `/${path}`
  const cleanPathname = pathname.split(/[?#]/)[0] ?? ''
  const trimmedPathname = cleanPathname.replace(/\/+$/, '')

  if (!trimmedPathname || trimmedPathname === '/') {
    return ''
  }

  if (PHOTO_DETAIL_PATH_PATTERN.test(cleanPathname)) {
    return `${trimmedPathname}/`
  }

  return trimmedPathname
}
