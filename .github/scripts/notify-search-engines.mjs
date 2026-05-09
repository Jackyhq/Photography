import { readFile } from 'node:fs/promises'

const DEFAULT_SITE_URL = 'https://photo.jackyw.cn'
const DEFAULT_SITEMAP_PATH = './web/googlesitemap.xml'
const DEFAULT_INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow'

const siteUrl = trimTrailingSlash(process.env.SITE_URL || DEFAULT_SITE_URL)
const sitemapUrl = process.env.SITEMAP_URL || `${siteUrl}/googlesitemap.xml`
const sitemapPath = process.env.SITEMAP_PATH || DEFAULT_SITEMAP_PATH
const googleSiteUrl = process.env.GOOGLE_SEARCH_CONSOLE_SITE_URL || `${siteUrl}/`
const googleAccessToken = process.env.GOOGLE_ACCESS_TOKEN || ''
const indexNowKey = process.env.INDEXNOW_KEY || ''
const indexNowEndpoint = process.env.INDEXNOW_ENDPOINT || DEFAULT_INDEXNOW_ENDPOINT

const sitemapXml = await readFile(sitemapPath, 'utf8')
const sitemapUrls = extractSitemapUrls(sitemapXml)

await submitGoogleSitemap()
await submitIndexNowUrls()

async function submitGoogleSitemap() {
  if (!googleAccessToken) {
    console.info('Skipping Google Search Console sitemap submission: GOOGLE_ACCESS_TOKEN is not set.')
    return
  }

  const endpoint = new URL(
    `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(googleSiteUrl)}/sitemaps/${encodeURIComponent(
      sitemapUrl,
    )}`,
  )

  const response = await fetch(endpoint, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${googleAccessToken}`,
    },
  })

  if (!response.ok) {
    throw new Error(`Google sitemap submission failed with ${response.status}: ${await response.text()}`)
  }

  console.info(`Submitted sitemap to Google Search Console: ${sitemapUrl}`)
}

async function submitIndexNowUrls() {
  if (!indexNowKey) {
    console.info('Skipping IndexNow submission: INDEXNOW_KEY is not set.')
    return
  }

  const { host } = new URL(siteUrl)
  const urls = sitemapUrls.filter((url) => {
    try {
      return new URL(url).host === host
    } catch {
      return false
    }
  })

  if (urls.length === 0) {
    console.info('Skipping IndexNow submission: no matching sitemap URLs found.')
    return
  }

  const chunks = chunk(urls, 10000)

  for (const [index, urlList] of chunks.entries()) {
    const response = await fetch(indexNowEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify({
        host,
        key: indexNowKey,
        keyLocation: `${siteUrl}/${indexNowKey}.txt`,
        urlList,
      }),
    })

    if (!response.ok) {
      throw new Error(`IndexNow submission failed with ${response.status}: ${await response.text()}`)
    }

    console.info(`Submitted ${urlList.length} URL(s) to IndexNow (${index + 1}/${chunks.length}).`)
  }
}

function extractSitemapUrls(xml) {
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => decodeXml(match[1].trim()))
}

function decodeXml(value) {
  return value
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .replaceAll('&quot;', '"')
    .replaceAll('&apos;', "'")
    .replaceAll('&amp;', '&')
}

function trimTrailingSlash(value) {
  return value.replace(/\/+$/, '')
}

function chunk(values, size) {
  const chunks = []

  for (let index = 0; index < values.length; index += size) {
    chunks.push(values.slice(index, index + size))
  }

  return chunks
}
