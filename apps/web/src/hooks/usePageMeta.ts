import { useEffect } from 'react'

import type { PageMeta } from '~/lib/page-meta'

const META_DEFINITIONS = [
  { attribute: 'name', key: 'description' },
  { attribute: 'name', key: 'robots' },
  { attribute: 'property', key: 'og:type' },
  { attribute: 'property', key: 'og:url' },
  { attribute: 'property', key: 'og:title' },
  { attribute: 'property', key: 'og:description' },
  { attribute: 'property', key: 'og:image' },
  { attribute: 'property', key: 'twitter:url' },
  { attribute: 'property', key: 'twitter:title' },
  { attribute: 'property', key: 'twitter:description' },
  { attribute: 'property', key: 'twitter:image' },
] as const

/** The route owns the complete head; never restore a snapshot of the initial photo HTML. */
export function usePageMeta({ title, description, image, url, type, jsonLd, robots }: PageMeta) {
  const structuredData = JSON.stringify(jsonLd)

  useEffect(() => {
    document.title = title
    const values = new Map<string, string | undefined>([
      ['description', description],
      ['robots', robots],
      ['og:type', type],
      ['og:url', url],
      ['og:title', title],
      ['og:description', description],
      ['og:image', image],
      ['twitter:url', url],
      ['twitter:title', title],
      ['twitter:description', description],
      ['twitter:image', image],
    ])

    for (const { attribute, key } of META_DEFINITIONS) {
      const elements = Array.from(document.querySelectorAll<HTMLMetaElement>(`meta[${attribute}="${key}"]`))
      const value = values.get(key)
      if (!value) {
        elements.forEach((element) => element.remove())
        continue
      }
      const element = elements[0] ?? document.createElement('meta')
      element.setAttribute(attribute, key)
      element.content = value
      if (!element.isConnected) document.head.append(element)
      elements.slice(1).forEach((duplicate) => duplicate.remove())
    }

    const links = Array.from(document.querySelectorAll<HTMLLinkElement>('link[rel="canonical"]'))
    if (url) {
      const canonical = links[0] ?? document.createElement('link')
      canonical.rel = 'canonical'
      canonical.href = url
      if (!canonical.isConnected) document.head.append(canonical)
      links.slice(1).forEach((duplicate) => duplicate.remove())
    } else {
      links.forEach((link) => link.remove())
    }

    const scripts = Array.from(
      document.querySelectorAll<HTMLScriptElement>(
        'script[data-afilmory-page-jsonld], script[data-afilmory-photo-jsonld]',
      ),
    )
    if (structuredData) {
      const script = scripts[0] ?? document.createElement('script')
      script.type = 'application/ld+json'
      delete script.dataset.afilmoryPhotoJsonld
      script.dataset.afilmoryPageJsonld = ''
      script.textContent = structuredData
      if (!script.isConnected) document.head.append(script)
      scripts.slice(1).forEach((duplicate) => duplicate.remove())
    } else {
      scripts.forEach((script) => script.remove())
    }
  }, [description, image, robots, structuredData, title, type, url])
}
