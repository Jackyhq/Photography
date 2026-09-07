import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'

import type { DocsPageRoute } from '../src/page-meta'
import { escapeHtml, getDocsPageMeta, renderDocsHead } from '../src/page-meta'
import { getDocsUrl, normalizeDocsPath } from '../src/site'

interface StaticOutputOptions {
  outputDir: string
  templateHtml: string
  routes: DocsPageRoute[]
  render: (path: string) => { html: string }
}

export function renderDocsSitemap(routes: DocsPageRoute[]): string {
  const entries = routes.map((route) => {
    const modified = route.meta?.lastModified
    const lastModified = typeof modified === 'string' ? new Date(modified) : undefined
    const lastmod =
      lastModified && Number.isFinite(lastModified.getTime()) ? `<lastmod>${lastModified.toISOString()}</lastmod>` : ''
    return `  <url><loc>${escapeHtml(getDocsUrl(route.path))}</loc>${lastmod}</url>`
  })
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.join('\n')}\n</urlset>\n`
}

export function renderDocsPage(templateHtml: string, html: string, route?: DocsPageRoute): string {
  const meta = getDocsPageMeta(route)
  // Use replacement callbacks: document content can contain literal $& and $'.
  return templateHtml
    .replace('<!--app-html-->', () => html)
    .replace('<!--app-title-->', () => escapeHtml(meta.title))
    .replace('<!--app-head-->', () => renderDocsHead(meta))
}

export async function writeDocsStaticOutput({ outputDir, templateHtml, routes, render }: StaticOutputOptions) {
  for (const route of routes) {
    const path = normalizeDocsPath(route.path)
    const outputPath = path === '/' ? join(outputDir, 'index.html') : join(outputDir, path.slice(1), 'index.html')
    await mkdir(dirname(outputPath), { recursive: true })
    await writeFile(outputPath, renderDocsPage(templateHtml, render(path).html, route), 'utf-8')
  }

  await mkdir(outputDir, { recursive: true })
  await writeFile(join(outputDir, '404.html'), renderDocsPage(templateHtml, render('/404').html), 'utf-8')
  await writeFile(join(outputDir, 'sitemap.xml'), renderDocsSitemap(routes), 'utf-8')
  await writeFile(
    join(outputDir, 'robots.txt'),
    `User-agent: *\nAllow: /\n\nSitemap: ${new URL('sitemap.xml', getDocsUrl()).href}\n`,
    'utf-8',
  )
}
