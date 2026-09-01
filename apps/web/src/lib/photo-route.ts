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

  return `${trimmedPathname}/`
}
