// @vitest-environment node
import { mkdtemp, readFile, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

import { afterEach, describe, expect, it } from 'vitest'

import { writeDocsStaticOutput } from './static-output'

const directories: string[] = []

afterEach(async () => {
  await Promise.all(directories.splice(0).map((directory) => rm(directory, { recursive: true, force: true })))
})

describe('documentation static publication', () => {
  it('writes canonical directory pages, crawler files and a noindex 404 without a homepage canonical', async () => {
    const outputDir = await mkdtemp(join(tmpdir(), 'photography-doc-output-'))
    directories.push(outputDir)
    await writeDocsStaticOutput({
      outputDir,
      templateHtml:
        '<html><head><title><!--app-title--></title><!--app-head--></head><body><!--app-html--></body></html>',
      routes: [
        { path: '/', title: 'Overview' },
        { path: '/guide', title: 'A & B <Guide>', meta: { lastModified: '2026-09-07T12:00:00+08:00' } },
      ],
      render: (path) => ({ html: path === '/404' ? '<h1>404</h1>' : '<h1>Literal $& content</h1>' }),
    })

    const page = await readFile(join(outputDir, 'guide/index.html'), 'utf-8')
    expect(page).toContain("<title>A &amp; B &lt;Guide&gt; | Jacky's Photography Docs</title>")
    expect(page).toContain('rel="canonical" href="https://docs.photo.jackyw.cn/guide/"')
    expect(page).toContain('<h1>Literal $& content</h1>')
    expect(page).not.toContain('<!--app-')

    const notFound = await readFile(join(outputDir, '404.html'), 'utf-8')
    expect(notFound).toContain('<h1>404</h1>')
    expect(notFound).toContain('content="noindex, follow"')
    expect(notFound).not.toContain('rel="canonical"')
    expect(notFound).not.toContain('application/ld+json')

    const sitemap = await readFile(join(outputDir, 'sitemap.xml'), 'utf-8')
    expect(sitemap).toContain('<loc>https://docs.photo.jackyw.cn/</loc>')
    expect(sitemap).toContain('<loc>https://docs.photo.jackyw.cn/guide/</loc>')
    expect(sitemap).toContain('<lastmod>2026-09-07T04:00:00.000Z</lastmod>')
    expect(sitemap).not.toContain('/404')
    expect(await readFile(join(outputDir, 'robots.txt'), 'utf-8')).toBe(
      'User-agent: *\nAllow: /\n\nSitemap: https://docs.photo.jackyw.cn/sitemap.xml\n',
    )
  })
})
