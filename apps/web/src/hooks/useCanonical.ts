import { useEffect } from 'react'

import { siteConfig } from '~/config'

export const useCanonical = (path?: string) => {
  useEffect(() => {
    const baseUrl = siteConfig.url.endsWith('/') ? siteConfig.url.slice(0, -1) : siteConfig.url
    const canonicalUrl = path ? `${baseUrl}${path.startsWith('/') ? '' : '/'}${path}` : baseUrl

    let link: HTMLLinkElement | null = document.querySelector('link[rel="canonical"]')
    if (!link) {
      link = document.createElement('link')
      link.rel = 'canonical'
      document.head.append(link)
    }
    link.href = canonicalUrl
  }, [path])
}
