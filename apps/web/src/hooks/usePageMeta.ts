import { useEffect } from 'react'

import { siteConfig } from '~/config'

interface PageMetaOptions {
  title?: string
  description?: string
  image?: string
  imageAlt?: string
  imageWidth?: number
  imageHeight?: number
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
  { selector: 'meta[property="og:image:alt"]', attribute: 'property', key: 'og:image:alt' },
  { selector: 'meta[property="og:image:width"]', attribute: 'property', key: 'og:image:width' },
  { selector: 'meta[property="og:image:height"]', attribute: 'property', key: 'og:image:height' },
  { selector: 'meta[property="twitter:url"]', attribute: 'property', key: 'twitter:url' },
  { selector: 'meta[property="twitter:title"]', attribute: 'property', key: 'twitter:title' },
  { selector: 'meta[property="twitter:description"]', attribute: 'property', key: 'twitter:description' },
  { selector: 'meta[property="twitter:image"]', attribute: 'property', key: 'twitter:image' },
  { selector: 'meta[property="twitter:image:alt"]', attribute: 'property', key: 'twitter:image:alt' },
] as const

export function usePageMeta({
  title,
  description,
  image,
  imageAlt,
  imageWidth,
  imageHeight,
  url,
  type = 'website',
}: PageMetaOptions) {
  useEffect(() => {
    const pageTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.title
    const pageDescription = description?.trim() || siteConfig.description
    const pageUrl = toAbsoluteUrl(url) || siteConfig.url
    const pageImage = toAbsoluteUrl(image)
    const pageImageAlt = pageImage ? imageAlt?.trim() || pageTitle : undefined

    const values = new Map<string, string | null | undefined>([
      ['description', pageDescription],
      ['og:type', type],
      ['og:url', pageUrl],
      ['og:title', pageTitle],
      ['og:description', pageDescription],
      ['og:image', pageImage],
      ['og:image:alt', pageImageAlt],
      ['og:image:width', pageImage ? toPositiveDimension(imageWidth) : undefined],
      ['og:image:height', pageImage ? toPositiveDimension(imageHeight) : undefined],
      ['twitter:url', pageUrl],
      ['twitter:title', pageTitle],
      ['twitter:description', pageDescription],
      ['twitter:image', pageImage],
      ['twitter:image:alt', pageImageAlt],
    ])

    const restoreCallbacks = META_DEFINITIONS.flatMap((definition) => {
      const value = values.get(definition.key)
      if (value === undefined) return []

      return setMetaContent(definition, value)
    })

    return () => {
      restoreCallbacks.forEach((restore) => restore())
    }
  }, [description, image, imageAlt, imageHeight, imageWidth, title, type, url])
}

function setMetaContent(definition: (typeof META_DEFINITIONS)[number], content: string | null): Array<() => void> {
  const existingElements = Array.from(document.querySelectorAll<HTMLMetaElement>(definition.selector))
  if (content === null) return removeMetaElements(existingElements)

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

function removeMetaElements(elements: HTMLMetaElement[]): Array<() => void> {
  return elements.map((element) => {
    const parent = element.parentNode
    const { nextSibling } = element
    element.remove()

    return () => {
      if (!parent || element.isConnected) return

      if (nextSibling?.parentNode === parent) {
        nextSibling.before(element)
      } else {
        parent.append(element)
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

function toPositiveDimension(value: number | undefined): string | null {
  return typeof value === 'number' && Number.isFinite(value) && value > 0 ? value.toString() : null
}
