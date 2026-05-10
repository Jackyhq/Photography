import { useEffect } from 'react'

import { siteConfig } from '~/config'
import { normalizeCanonicalPathname } from '~/lib/photo-route'

const getCanonicalUrl = (path: string) => {
  const baseUrl = siteConfig.url.endsWith('/') ? siteConfig.url.slice(0, -1) : siteConfig.url
  const cleanPathname = normalizeCanonicalPathname(path)

  return cleanPathname ? `${baseUrl}${cleanPathname}` : baseUrl
}

export const useCanonical = (path?: string) => {
  useEffect(() => {
    if (!path) return

    const canonicalUrl = getCanonicalUrl(path)

    const links = Array.from(document.querySelectorAll<HTMLLinkElement>('link[rel="canonical"]'))
    let link: HTMLLinkElement | undefined = links[0]
    if (!link) {
      link = document.createElement('link')
      link.rel = 'canonical'
      document.head.append(link)
    }
    links.slice(1).forEach((duplicate) => duplicate.remove())
    link.href = canonicalUrl
  }, [path])
}
