export const docsSite = {
  name: "Jacky's Photography Docs",
  description:
    "Documentation for Jacky's Photography at docs.photo.jackyw.cn, covering the gallery, photo pipeline, storage, performance, and deployment.",
  url: 'https://docs.photo.jackyw.cn',
  galleryUrl: 'https://photo.jackyw.cn',
  homepageUrl: 'https://jackyw.cn/',
  repositoryUrl: 'https://github.com/Jackyhq/Photography',
  authorName: 'Jackywhq',
  avatarUrl: 'https://photos3.jackyw.cn/logo/avatar/final-1.png',
} as const

export function getDocsUrl(path = '/') {
  return new URL(getDocsPath(path), `${docsSite.url}/`).toString()
}

// Route keys omit trailing slashes; public directory URLs include them.
export function normalizeDocsPath(path: string): string {
  const pathname = path.startsWith('/') ? path : `/${path}`
  return pathname.replace(/\/+$/, '') || '/'
}

export function getDocsPath(path: string): string {
  const normalizedPath = normalizeDocsPath(path)
  return normalizedPath === '/' ? '/' : `${normalizedPath}/`
}
