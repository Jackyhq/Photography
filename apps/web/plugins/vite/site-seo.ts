import type { Plugin } from 'vite'

import type { PrimarySite, SiteConfig } from '../../../../site.config'
import { serializeForInlineScript } from './inline-script'

const GALLERY_LANGUAGES = ['zh-CN', 'en', 'zh-HK', 'zh-TW', 'ja', 'ko'] as const
const PRIMARY_SITES_MARKER = '<!-- afilmory-primary-sites -->'

interface StructuredDataEntityIds {
  author: string
  gallery: string
  website: string
}

export function createSiteSeoPlugin(siteConfig: SiteConfig): Plugin {
  return {
    name: 'site-seo',
    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        return applySiteSeoMeta(html, siteConfig)
      },
    },
  }
}

export function applySiteSeoMeta(html: string, siteConfig: SiteConfig): string {
  const canonicalUrl = normalizeUrl(siteConfig.url)
  const authorUrl = normalizeUrl(siteConfig.author.url)
  const structuredData = serializeForInlineScript(createSiteStructuredData(siteConfig))
  const headMarkup = [
    `<link rel="canonical" href="${escapeAttribute(canonicalUrl)}">`,
    `<link rel="author" href="${escapeAttribute(authorUrl)}">`,
    `<script type="application/ld+json" data-afilmory-site-jsonld>${structuredData}</script>`,
  ].join('')

  let next = html
    .replaceAll(/<link[^>]*\srel=["']canonical["'][^>]*>/gi, '')
    .replaceAll(/<link[^>]*\srel=["']author["'][^>]*>/gi, '')
    .replaceAll(/<script[^>]*\sdata-afilmory-site-jsonld\b[^>]*>[\s\S]*?<\/script>/gi, '')

  if (/<\/title>/i.test(next)) {
    next = next.replace(/<\/title>/i, `</title>${headMarkup}`)
  } else {
    next = next.replace('</head>', `${headMarkup}</head>`)
  }

  return next.replace(PRIMARY_SITES_MARKER, createPrimarySiteLinks(siteConfig))
}

export function createSiteStructuredData(siteConfig: SiteConfig): Record<string, unknown> {
  const ids = getStructuredDataEntityIds(siteConfig)
  const siteUrl = normalizeUrl(siteConfig.url)
  const author = createAuthorStructuredData(siteConfig)
  const primarySites = getPrimarySites(siteConfig)
  const parentSite = primarySites[0]
  const parentSiteReference = parentSite
    ? {
        '@type': 'WebSite',
        '@id': getWebsiteId(parentSite.url),
        url: normalizeUrl(parentSite.url),
        name: parentSite.name,
        inLanguage: parentSite.inLanguage,
      }
    : undefined
  const primarySiteUrls = primarySites.map((site) => normalizeUrl(site.url))

  const website: Record<string, unknown> = {
    '@type': 'WebSite',
    '@id': ids.website,
    url: siteUrl,
    name: siteConfig.name,
    description: siteConfig.description,
    inLanguage: GALLERY_LANGUAGES,
    creator: { '@id': ids.author },
    publisher: { '@id': ids.author },
    copyrightHolder: { '@id': ids.author },
    isPartOf: parentSiteReference,
    relatedLink: primarySiteUrls,
  }

  if (siteConfig.title !== siteConfig.name) {
    website.alternateName = siteConfig.title
  }

  const gallery: Record<string, unknown> = {
    '@type': ['CollectionPage', 'ImageGallery'],
    '@id': ids.gallery,
    url: siteUrl,
    name: siteConfig.title,
    description: siteConfig.description,
    inLanguage: GALLERY_LANGUAGES,
    isPartOf: { '@id': ids.website },
    about: { '@id': ids.author },
    creator: { '@id': ids.author },
    relatedLink: primarySiteUrls,
  }

  return {
    '@context': 'https://schema.org',
    '@graph': [website, gallery, author],
  }
}

export function createAuthorStructuredData(siteConfig: SiteConfig): Record<string, unknown> {
  const ids = getStructuredDataEntityIds(siteConfig)
  const authorUrl = normalizeUrl(siteConfig.author.url)
  const sameAs = getAuthorSameAs(siteConfig)
  const image = toAbsoluteUrl(siteConfig.author.avatar, siteConfig.url)

  return Object.fromEntries(
    Object.entries({
      '@type': 'Person',
      '@id': ids.author,
      name: siteConfig.author.name,
      url: authorUrl,
      image,
      sameAs: sameAs.length > 0 ? sameAs : undefined,
    }).filter(([, value]) => value !== undefined),
  )
}

export function getStructuredDataEntityIds(siteConfig: SiteConfig): StructuredDataEntityIds {
  return {
    author: `${stripTrailingSlash(siteConfig.author.url)}/#person`,
    gallery: `${stripTrailingSlash(siteConfig.url)}/#gallery`,
    website: `${stripTrailingSlash(siteConfig.url)}/#website`,
  }
}

export function getAuthorSameAs(siteConfig: SiteConfig): string[] {
  const authorUrl = normalizeUrl(siteConfig.author.url)
  const { social } = siteConfig
  const candidates = [
    ...getPrimarySites(siteConfig).map((site) => site.url),
    social?.github ? toSocialUrl(social.github, 'https://github.com/') : undefined,
    social?.instagram,
    social?.twitter ? toSocialUrl(social.twitter.replace(/^@/u, ''), 'https://twitter.com/') : undefined,
  ]

  return uniqueUrls(candidates).filter((url) => url !== authorUrl)
}

function getPrimarySites(siteConfig: SiteConfig): PrimarySite[] {
  const configuredSites = siteConfig.primarySites?.filter((site) => site.url.trim() && site.name.trim()) ?? []
  if (configuredSites.length > 0) return configuredSites

  return [
    {
      name: siteConfig.author.name,
      url: siteConfig.author.url,
    },
  ]
}

function createPrimarySiteLinks(siteConfig: SiteConfig): string {
  const links = getPrimarySites(siteConfig).map((site) => {
    const hreflang = site.inLanguage ? ` hreflang="${escapeAttribute(site.inLanguage)}"` : ''
    return `<a href="${escapeAttribute(normalizeUrl(site.url))}" rel="author noreferrer"${hreflang} style="color:rgba(255,255,255,.62);text-decoration:none">${escapeHtmlText(site.name)}</a>`
  })

  return `<nav data-afilmory-primary-sites aria-label="Jackywhq 主网站" style="display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:.5rem;font-size:.75rem">${links.join('<span aria-hidden="true" style="color:rgba(255,255,255,.25)">·</span>')}</nav>`
}

function getWebsiteId(value: string): string {
  return `${stripTrailingSlash(value)}/#website`
}

function toSocialUrl(value: string, baseUrl: string): string {
  return /^https?:\/\//iu.test(value) ? value : new URL(value, baseUrl).toString()
}

function uniqueUrls(values: Array<string | undefined>): string[] {
  const normalized: string[] = []
  for (const value of values) {
    if (value) normalized.push(normalizeUrl(value))
  }

  return Array.from(new Set(normalized))
}

function normalizeUrl(value: string): string {
  const normalized = value.trim()
  try {
    const parsed = new URL(normalized)
    const isBareOrigin = parsed.pathname === '/' && !parsed.search && !parsed.hash
    return isBareOrigin && !normalized.endsWith('/') ? parsed.origin : parsed.toString()
  } catch {
    return normalized
  }
}

function stripTrailingSlash(value: string): string {
  return normalizeUrl(value).replace(/\/+$/u, '')
}

function toAbsoluteUrl(value: string | undefined, baseUrl: string): string | undefined {
  if (!value) return undefined

  try {
    return new URL(value, `${stripTrailingSlash(baseUrl)}/`).toString()
  } catch {
    return value
  }
}

function escapeAttribute(value: string): string {
  return value.replaceAll(/[&"<>]/g, (character) => {
    switch (character) {
      case '&': {
        return '&amp;'
      }
      case '"': {
        return '&quot;'
      }
      case '<': {
        return '&lt;'
      }
      case '>': {
        return '&gt;'
      }
      default: {
        return character
      }
    }
  })
}

function escapeHtmlText(value: string): string {
  return value.replaceAll(/[<>&]/g, (character) => {
    switch (character) {
      case '<': {
        return '&lt;'
      }
      case '>': {
        return '&gt;'
      }
      case '&': {
        return '&amp;'
      }
      default: {
        return character
      }
    }
  })
}
