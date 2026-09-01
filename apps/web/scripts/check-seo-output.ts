import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

import type { PhotoManifestItem } from '@afilmory/builder/photo-types'

import { siteConfig } from '../../../site.config'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const WEB_ROOT = path.resolve(__dirname, '..')
const DIST_ROOT = path.join(WEB_ROOT, 'dist')
const MANIFEST_PATH = path.join(WEB_ROOT, 'src/data/photos-manifest.json')

interface ManifestFile {
  data?: PhotoManifestItem[]
}

export function checkSeoOutput(): void {
  assert.ok(existsSync(DIST_ROOT), `Missing production output: ${DIST_ROOT}`)

  const manifest = JSON.parse(readFileSync(MANIFEST_PATH, 'utf-8')) as ManifestFile
  const photos = Array.isArray(manifest.data) ? manifest.data : []
  const baseUrl = siteConfig.url.replace(/\/+$/u, '')

  checkRobots(baseUrl)
  checkSitemap(photos, baseUrl)
  checkHomepage(baseUrl)
  checkPhotoPages(photos, baseUrl)
  checkUtilityPages(baseUrl)

  console.info(`SEO output check passed for ${photos.length} photo pages.`)
}

function checkRobots(baseUrl: string): void {
  const robots = readOutputFile('robots.txt')
  assert.match(robots, /^User-agent: \*$/mu)
  assert.match(robots, /^Allow: \/$/mu)
  assert.match(robots, new RegExp(`^Sitemap: ${escapeRegExp(baseUrl)}/sitemap\\.xml$`, 'mu'))
}

function checkSitemap(photos: PhotoManifestItem[], baseUrl: string): void {
  const sitemap = readOutputFile('sitemap.xml')
  assert.ok(!sitemap.includes('<priority>'), 'Sitemap must not contain ignored priority values')
  assert.ok(!sitemap.includes('<changefreq>'), 'Sitemap must not contain ignored changefreq values')

  const actualUrls = Array.from(sitemap.matchAll(/<url>\s*<loc>([^<]+)<\/loc>/gu), (match) => decodeXml(match[1]))
  const expectedUrls = [baseUrl, ...photos.map((photo) => `${baseUrl}/photos/${encodeURIComponent(photo.id)}/`)]

  assert.equal(new Set(actualUrls).size, actualUrls.length, 'Sitemap contains duplicate page URLs')
  assert.deepEqual(new Set(actualUrls), new Set(expectedUrls), 'Sitemap URLs do not match the generated photo pages')
}

function checkHomepage(baseUrl: string): void {
  const html = readOutputFile('index.html')
  assertCanonical(html, baseUrl, 'homepage')
  assert.equal(getMetaContent(html, 'property', 'og:url'), baseUrl)
  assert.equal(getMetaContent(html, 'property', 'twitter:url'), baseUrl)
  assert.match(getMetaContent(html, 'name', 'robots'), /max-image-preview:large/u)
  assert.ok(!/<meta[^>]*\sname=["']keywords["']/iu.test(html), 'Homepage must not emit meta keywords')

  const siteStructuredData = getJsonLd(html, 'data-afilmory-site-jsonld')
  const serializedStructuredData = JSON.stringify(siteStructuredData)
  for (const primarySite of siteConfig.primarySites ?? []) {
    assert.ok(serializedStructuredData.includes(primarySite.url), `Missing primary site in JSON-LD: ${primarySite.url}`)
    assert.ok(html.includes(`href="${primarySite.url}"`), `Missing crawlable primary-site link: ${primarySite.url}`)
  }
}

function checkPhotoPages(photos: PhotoManifestItem[], baseUrl: string): void {
  for (const photo of photos) {
    const encodedId = encodeURIComponent(photo.id)
    const expectedUrl = `${baseUrl}/photos/${encodedId}/`
    const html = readOutputFile(path.join('photos', encodedId, 'index.html'))

    assertCanonical(html, expectedUrl, `photo ${photo.id}`)
    assert.equal(getMetaContent(html, 'property', 'og:url'), expectedUrl)
    assert.equal(getMetaContent(html, 'property', 'twitter:url'), expectedUrl)
    assert.doesNotMatch(getMetaContent(html, 'name', 'robots'), /noindex/iu)

    const photoStructuredData = getJsonLd(html, 'data-afilmory-photo-jsonld') as Record<string, unknown>
    assert.ok(
      photoStructuredData['@type'] === 'ImageObject' || photoStructuredData['@type'] === 'VideoObject',
      `Invalid structured-data type for photo ${photo.id}`,
    )
    assert.equal(photoStructuredData.url, expectedUrl)
    assert.equal(photoStructuredData.creditText, siteConfig.author.name)
    assert.equal(photoStructuredData.copyrightNotice, `© ${siteConfig.author.name}`)

    const creator = photoStructuredData.creator as Record<string, unknown> | undefined
    assert.equal(creator?.url, siteConfig.author.url)
  }
}

function checkUtilityPages(baseUrl: string): void {
  const explory = readOutputFile(path.join('explory', 'index.html'))
  assertCanonical(explory, `${baseUrl}/explory/`, 'photo map')
  assert.match(getMetaContent(explory, 'name', 'robots'), /noindex/iu)

  const notFound = readOutputFile('404.html')
  assert.equal(getCanonicalTags(notFound).length, 0, '404.html must not declare a canonical URL')
  assert.match(getMetaContent(notFound, 'name', 'robots'), /noindex/iu)
  assert.ok(!/<meta[^>]*\sproperty=["']og:url["']/iu.test(notFound), '404.html must not declare an Open Graph URL')
  assert.ok(!/<meta[^>]*\sproperty=["']twitter:url["']/iu.test(notFound), '404.html must not declare a Twitter URL')
}

function assertCanonical(html: string, expectedUrl: string, label: string): void {
  const canonicalTags = getCanonicalTags(html)
  assert.equal(canonicalTags.length, 1, `${label} must contain exactly one canonical link`)
  assert.equal(getAttribute(canonicalTags[0], 'href'), expectedUrl, `${label} canonical URL is incorrect`)
}

function getCanonicalTags(html: string): string[] {
  return html.match(/<link(?=[^>]*\srel=["']canonical["'])[^>]+>/giu) ?? []
}

function getMetaContent(html: string, attribute: 'name' | 'property', key: string): string {
  const pattern = new RegExp(`<meta\\b(?=[^>]*\\b${attribute}=["']${escapeRegExp(key)}["'])[^>]*>`, 'iu')
  const tag = html.match(pattern)?.[0]
  assert.ok(tag, `Missing ${attribute}=${key} metadata`)
  return getAttribute(tag, 'content')
}

function getJsonLd(html: string, marker: string): unknown {
  const pattern = new RegExp(`<script\\b(?=[^>]*\\b${escapeRegExp(marker)}\\b)[^>]*>([\\s\\S]*?)<\\/script>`, 'iu')
  const payload = html.match(pattern)?.[1]
  assert.ok(payload, `Missing JSON-LD marker: ${marker}`)
  return JSON.parse(payload)
}

function getAttribute(tag: string, name: string): string {
  const value = tag.match(new RegExp(`\\b${escapeRegExp(name)}=(?:"([^"]*)"|'([^']*)')`, 'iu'))
  assert.ok(value, `Missing ${name} attribute in tag: ${tag}`)
  return decodeHtmlAttribute(value[1] ?? value[2] ?? '')
}

function readOutputFile(relativePath: string): string {
  const filePath = path.join(DIST_ROOT, relativePath)
  assert.ok(existsSync(filePath), `Missing production SEO artifact: ${filePath}`)
  return readFileSync(filePath, 'utf-8')
}

function decodeXml(value: string): string {
  return value
    .replaceAll('&amp;', '&')
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .replaceAll('&quot;', '"')
    .replaceAll('&apos;', "'")
}

function decodeHtmlAttribute(value: string): string {
  return decodeXml(value)
}

function escapeRegExp(value: string): string {
  return value.replaceAll(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

const invokedScript = process.argv[1] ? pathToFileURL(path.resolve(process.argv[1])).href : null
if (invokedScript === import.meta.url) {
  checkSeoOutput()
}
