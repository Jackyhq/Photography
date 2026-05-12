import { readFile } from 'node:fs/promises'

const DEFAULT_SITE_URL = 'https://photo.jackyw.cn'
const DEFAULT_SITEMAP_PATH = './apps/web/dist/googlesitemap.xml'
const DEFAULT_INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow'
const DEFAULT_INDEXNOW_MAX_ATTEMPTS = 4
const DEFAULT_INDEXNOW_RETRY_DELAY_MS = 30000

const siteUrl = trimTrailingSlash(process.env.SITE_URL || DEFAULT_SITE_URL)
const sitemapPath = process.env.SITEMAP_PATH || DEFAULT_SITEMAP_PATH
const indexNowKey = process.env.INDEXNOW_KEY || ''
const indexNowEndpoint = process.env.INDEXNOW_ENDPOINT || DEFAULT_INDEXNOW_ENDPOINT
const indexNowMaxAttempts = parsePositiveInteger(process.env.INDEXNOW_MAX_ATTEMPTS, DEFAULT_INDEXNOW_MAX_ATTEMPTS)
const indexNowRetryDelayMs = parsePositiveInteger(
  process.env.INDEXNOW_RETRY_DELAY_MS,
  DEFAULT_INDEXNOW_RETRY_DELAY_MS,
)

const sitemapXml = await readFile(sitemapPath, 'utf8')
const sitemapUrls = extractSitemapUrls(sitemapXml)

await submitIndexNowUrls()

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
    await submitIndexNowChunk(host, urlList, index + 1, chunks.length)
  }
}

async function submitIndexNowChunk(host, urlList, chunkNumber, chunkCount) {
  for (let attempt = 1; attempt <= indexNowMaxAttempts; attempt += 1) {
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
    const responseText = await response.text()

    if (response.ok) {
      console.info(`Submitted ${urlList.length} URL(s) to IndexNow (${chunkNumber}/${chunkCount}).`)
      return
    }

    if (attempt < indexNowMaxAttempts && isRetryableIndexNowResponse(response.status, responseText)) {
      console.warn(
        `IndexNow submission attempt ${attempt}/${indexNowMaxAttempts} failed with ${response.status}; retrying in ${
          indexNowRetryDelayMs / 1000
        }s.`,
      )
      await sleep(indexNowRetryDelayMs)
      continue
    }

    console.warn(
      `IndexNow submission skipped for chunk ${chunkNumber}/${chunkCount} after ${attempt} attempt(s): ${response.status} ${responseText}`,
    )
    return
  }
}

function isRetryableIndexNowResponse(status, responseText) {
  return (
    status === 429 ||
    status >= 500 ||
    (status === 403 && responseText.includes('SiteVerificationNotCompleted'))
  )
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

function parsePositiveInteger(value, fallback) {
  const parsed = Number.parseInt(value || '', 10)

  return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}
