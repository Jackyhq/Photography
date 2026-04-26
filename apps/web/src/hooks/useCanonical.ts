import { useEffect } from 'react'

import { siteConfig } from '~/config'

const getCanonicalUrl = (path: string) => {
  const baseUrl = siteConfig.url.endsWith('/') ? siteConfig.url.slice(0, -1) : siteConfig.url
  const pathname = path.startsWith('/') ? path : `/${path}`
  const cleanPathname = pathname.split(/[?#]/)[0]?.replace(/\/+$/, '') ?? ''

  return cleanPathname ? `${baseUrl}${cleanPathname}` : baseUrl
}

export const useCanonical = (path?: string) => {
  useEffect(() => {
    if (!path) return

    const canonicalUrl = getCanonicalUrl(path)

    let link: HTMLLinkElement | null = document.querySelector('link[rel="canonical"]')
    if (!link) {
      link = document.createElement('link')
      link.rel = 'canonical'
      document.head.append(link)
    }
    link.href = canonicalUrl
  }, [path])
}
