import { useEffect } from 'react'

import { siteConfig } from '~/config'

interface PageMetaOptions {
  title?: string
  description?: string
  image?: string
  url?: string
  type?: string
}

const META_DEFINITIONS = [
  { selector: 'meta[name="description"]', attribute: 'name', key: 'description' },
  { selector: 'meta[property="og:type"]', attribute: 'property', key: 'og:type' },
  { selector: 'meta[property="og:url"]', attribute: 'property', key: 'og:url' },
  { selector: 'meta[property="og:title"]', attribute: 'property', key: 'og:title' },
  { selector: 'meta[property="og:description"]', attribute: 'property', key: 'og:description' },
  { selector: 'meta[property="og:image"]', attribute: 'property', key: 'og:image' },
  { selector: 'meta[property="twitter:url"]', attribute: 'property', key: 'twitter:url' },
  { selector: 'meta[property="twitter:title"]', attribute: 'property', key: 'twitter:title' },
  { selector: 'meta[property="twitter:description"]', attribute: 'property', key: 'twitter:description' },
  { selector: 'meta[property="twitter:image"]', attribute: 'property', key: 'twitter:image' },
] as const

export function usePageMeta({ title, description, image, url, type = 'website' }: PageMetaOptions) {
  useEffect(() => {
    const pageTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.title
    const pageDescription = description?.trim() || siteConfig.description
    const pageUrl = toAbsoluteUrl(url) || siteConfig.url
    const pageImage = toAbsoluteUrl(image)

    const values = new Map<string, string | undefined>([
      ['description', pageDescription],
      ['og:type', type],
      ['og:url', pageUrl],
      ['og:title', pageTitle],
      ['og:description', pageDescription],
      ['og:image', pageImage],
      ['twitter:url', pageUrl],
      ['twitter:title', pageTitle],
      ['twitter:description', pageDescription],
      ['twitter:image', pageImage],
    ])

    const restoreCallbacks = META_DEFINITIONS.flatMap((definition) => {
      const value = values.get(definition.key)
      if (!value) return []

      return setMetaContent(definition, value)
    })

    return () => {
      restoreCallbacks.forEach((restore) => restore())
    }
  }, [description, image, title, type, url])
}

function setMetaContent(definition: (typeof META_DEFINITIONS)[number], content: string): Array<() => void> {
  const existingElements = Array.from(document.querySelectorAll<HTMLMetaElement>(definition.selector))
  const elements =
    existingElements.length > 0 ? existingElements : [createMetaElement(definition.attribute, definition.key)]

  return elements.map((element) => {
    const previousContent = element.getAttribute('content')
    const wasConnected = element.isConnected

    if (!wasConnected) {
      document.head.append(element)
    }

    element.setAttribute('content', content)

    return () => {
      if (!wasConnected) {
        element.remove()
        return
      }

      if (previousContent === null) {
        element.removeAttribute('content')
      } else {
        element.setAttribute('content', previousContent)
      }
    }
  })
}

function createMetaElement(attribute: 'name' | 'property', key: string): HTMLMetaElement {
  const element = document.createElement('meta')
  element.setAttribute(attribute, key)
  return element
}

function toAbsoluteUrl(value?: string): string | undefined {
  const normalized = value?.trim()
  if (!normalized) return undefined

  try {
    return new URL(normalized, siteConfig.url).toString()
  } catch {
    return normalized
  }
}
