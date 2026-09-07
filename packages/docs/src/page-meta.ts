import { docsSite, getDocsUrl } from './site'

export interface DocsPageRoute {
  path: string
  title: string
  meta?: Record<string, unknown>
}

export interface DocsPageMeta {
  title: string
  description: string
  canonicalUrl?: string
  robots: string
  structuredData?: Record<string, unknown>
}

export function getDocsPageMeta(route?: DocsPageRoute): DocsPageMeta {
  if (!route) {
    return {
      title: `404 Page Not Found | ${docsSite.name}`,
      description: 'The requested documentation page could not be found.',
      robots: 'noindex, follow',
    }
  }

  const routeTitle = typeof route.meta?.title === 'string' ? route.meta.title : route.title
  const title = routeTitle ? `${routeTitle} | ${docsSite.name}` : docsSite.name
  const description = typeof route.meta?.description === 'string' ? route.meta.description : docsSite.description
  const canonicalUrl = getDocsUrl(route.path)

  return {
    title,
    description,
    canonicalUrl,
    robots: 'index, follow',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: title,
      headline: routeTitle,
      description,
      url: canonicalUrl,
      isPartOf: { '@type': 'WebSite', name: docsSite.name, url: getDocsUrl() },
      about: { '@type': 'WebSite', name: "Jacky's Photography", url: docsSite.galleryUrl },
      author: { '@type': 'Person', name: docsSite.authorName, url: docsSite.homepageUrl },
    },
  }
}

export function escapeHtml(value: string): string {
  return value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
}

export function renderDocsHead(meta: DocsPageMeta): string {
  const tags = [
    `<meta data-docs-meta name="description" content="${escapeHtml(meta.description)}">`,
    `<meta data-docs-meta name="robots" content="${escapeHtml(meta.robots)}">`,
    `<meta data-docs-meta name="author" content="${escapeHtml(docsSite.authorName)}">`,
    '<meta data-docs-meta property="og:type" content="website">',
    `<meta data-docs-meta property="og:site_name" content="${escapeHtml(docsSite.name)}">`,
    `<meta data-docs-meta property="og:title" content="${escapeHtml(meta.title)}">`,
    `<meta data-docs-meta property="og:description" content="${escapeHtml(meta.description)}">`,
    '<meta data-docs-meta property="og:locale" content="en_US">',
    '<meta data-docs-meta name="twitter:card" content="summary">',
    `<meta data-docs-meta name="twitter:title" content="${escapeHtml(meta.title)}">`,
    `<meta data-docs-meta name="twitter:description" content="${escapeHtml(meta.description)}">`,
  ]

  if (meta.canonicalUrl) {
    const url = escapeHtml(meta.canonicalUrl)
    tags.push(
      `<link data-docs-meta rel="canonical" href="${url}">`,
      `<meta data-docs-meta property="og:url" content="${url}">`,
      `<meta data-docs-meta name="twitter:url" content="${url}">`,
    )
  }

  if (meta.structuredData) {
    tags.push(
      `<script data-docs-meta type="application/ld+json">${JSON.stringify(meta.structuredData).replaceAll('<', '\\u003c')}</script>`,
    )
  }

  return tags.join('\n    ')
}

export function updateDocsPageMeta(document: Document, route?: DocsPageRoute): void {
  const meta = getDocsPageMeta(route)
  document.title = meta.title
  document.head.querySelectorAll('[data-docs-meta]').forEach((element) => element.remove())
  const template = document.createElement('template')
  template.innerHTML = renderDocsHead(meta)
  document.head.append(template.content)
}
