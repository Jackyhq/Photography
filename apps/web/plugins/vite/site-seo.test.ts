// @vitest-environment node

import { describe, expect, it } from 'vitest'

import type { SiteConfig } from '../../../../site.config'
import { applySiteSeoMeta, createSiteStructuredData, getAuthorSameAs } from './site-seo'

const config: SiteConfig = {
  name: 'Jacky Photography',
  title: 'Jacky Photography',
  description: 'Original photographs </script>',
  url: 'https://photos.example.com',
  accentColor: '#000000',
  author: {
    name: 'Jacky',
    url: 'https://example.com/',
    avatar: '/avatar.jpg',
  },
  primarySites: [
    { name: 'Jacky｜主页', url: 'https://example.com/', inLanguage: 'zh-CN' },
    { name: 'Jacky｜A Visual Journal', url: 'https://example.co.uk/', inLanguage: 'en' },
  ],
  social: {
    github: 'Jacky',
    instagram: 'https://instagram.com/jacky/',
  },
}

describe('site SEO metadata', () => {
  it('adds one source canonical, author link, structured data and crawlable primary-site links', () => {
    const baseHtml =
      '<!doctype html><html><head><title>Gallery</title></head><body><!-- afilmory-primary-sites --></body></html>'
    const html = applySiteSeoMeta(applySiteSeoMeta(baseHtml, config), config)

    expect(html.match(/rel="canonical"/g)).toHaveLength(1)
    expect(html).toContain('rel="canonical" href="https://photos.example.com"')
    expect(html).toContain('rel="author" href="https://example.com/"')
    expect(html.match(/data-afilmory-site-jsonld/g)).toHaveLength(1)
    expect(html).toContain('href="https://example.com/" rel="author noreferrer" hreflang="zh-CN"')
    expect(html).toContain('href="https://example.co.uk/" rel="author noreferrer" hreflang="en"')
    expect(html).toContain('Jacky｜A Visual Journal')
    expect(html).not.toContain('Original photographs </script>')
    expect(html).toContain('Original photographs \\u003C/script\\u003E')
  })

  it('connects the gallery to the primary websites and the author entity', () => {
    const structuredData = createSiteStructuredData(config)
    const graph = structuredData['@graph'] as Array<Record<string, unknown>>
    const website = graph.find((entity) => entity['@type'] === 'WebSite')
    const gallery = graph.find((entity) => Array.isArray(entity['@type']))
    const author = graph.find((entity) => entity['@type'] === 'Person')

    expect(website?.['@id']).toBe('https://photos.example.com/#website')
    expect(JSON.stringify(website?.isPartOf)).toContain('https://example.com/#website')
    expect(JSON.stringify(website?.isPartOf)).not.toContain('https://example.co.uk/#website')
    expect(website?.relatedLink).toEqual(['https://example.com/', 'https://example.co.uk/'])
    expect(gallery?.creator).toEqual({ '@id': 'https://example.com/#person' })
    expect(author?.url).toBe('https://example.com/')
    expect(author?.sameAs).toContain('https://example.co.uk/')
  })

  it('deduplicates the canonical author homepage from sameAs', () => {
    expect(getAuthorSameAs(config)).toEqual([
      'https://example.co.uk/',
      'https://github.com/Jacky',
      'https://instagram.com/jacky/',
    ])
  })
})
