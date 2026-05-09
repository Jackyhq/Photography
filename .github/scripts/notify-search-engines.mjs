import { readFile } from 'node:fs/promises'

const DEFAULT_SITE_URL = 'https://photo.jackyw.cn'
const DEFAULT_SITEMAP_PATH = './web/googlesitemap.xml'
const DEFAULT_INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow'
const DEFAULT_INDEXNOW_MAX_ATTEMPTS = 4
const DEFAULT_INDEXNOW_RETRY_DELAY_MS = 30000
const DEFAULT_DEPLOYMENT_MAX_ATTEMPTS = 24
const DEFAULT_DEPLOYMENT_RETRY_DELAY_MS = 30000

const siteUrl = trimTrailingSlash(process.env.SITE_URL || DEFAULT_SITE_URL)
const sitemapPath = process.env.SITEMAP_PATH || DEFAULT_SITEMAP_PATH
const publicSitemapUrl = process.env.PUBLIC_SITEMAP_URL || `${siteUrl}/googlesitemap.xml`
const indexNowKey = process.env.INDEXNOW_KEY || ''
const indexNowEndpoint = process.env.INDEXNOW_ENDPOINT || DEFAULT_INDEXNOW_ENDPOINT
const indexNowMaxAttempts = parsePositiveInteger(process.env.INDEXNOW_MAX_ATTEMPTS, DEFAULT_INDEXNOW_MAX_ATTEMPTS)
const indexNowRetryDelayMs = parsePositiveInteger(
  process.env.INDEXNOW_RETRY_DELAY_MS,
  DEFAULT_INDEXNOW_RETRY_DELAY_MS,
)
const deploymentMaxAttempts = parsePositiveInteger(
  process.env.INDEXNOW_DEPLOYMENT_MAX_ATTEMPTS,
  DEFAULT_DEPLOYMENT_MAX_ATTEMPTS,
)
const deploymentRetryDelayMs = parsePositiveInteger(
  process.env.INDEXNOW_DEPLOYMENT_RETRY_DELAY_MS,
  DEFAULT_DEPLOYMENT_RETRY_DELAY_MS,
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

  const deploymentReady = await waitForPublicDeployment()

  if (!deploymentReady) {
    console.warn('Skipping IndexNow submission: public deployment was not ready before the wait timeout.')
    return
  }

  const chunks = chunk(urls, 10000)

  for (const [index, urlList] of chunks.entries()) {
    await submitIndexNowChunk(host, urlList, index + 1, chunks.length)
  }
}

async function waitForPublicDeployment() {
  for (let attempt = 1; attempt <= deploymentMaxAttempts; attempt += 1) {
    const [keyFileReady, sitemapReady] = await Promise.all([isPublicKeyFileReady(), isPublicSitemapReady()])

    if (keyFileReady && sitemapReady) {
      console.info('Public deployment is ready for IndexNow submission.')
      return true
    }

    if (attempt < deploymentMaxAttempts) {
      console.info(
        `Waiting for public deployment before IndexNow submission (${attempt}/${deploymentMaxAttempts}); retrying in ${
          deploymentRetryDelayMs / 1000
        }s.`,
      )
      await sleep(deploymentRetryDelayMs)
    }
  }

  return false
}

async function isPublicKeyFileReady() {
  try {
    const response = await fetch(`${siteUrl}/${indexNowKey}.txt`, noCacheRequestOptions())

    return response.ok && (await response.text()).trim() === indexNowKey
  } catch (error) {
    console.warn(`IndexNow key file check failed: ${getErrorMessage(error)}`)
    return false
  }
}

async function isPublicSitemapReady() {
  try {
    const response = await fetch(publicSitemapUrl, noCacheRequestOptions())

    return response.ok && normalizeXml(await response.text()) === normalizeXml(sitemapXml)
  } catch (error) {
    console.warn(`Public sitemap check failed: ${getErrorMessage(error)}`)
    return false
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

function normalizeXml(value) {
  return value.trim()
}

function noCacheRequestOptions() {
  return {
    cache: 'no-store',
    headers: {
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache',
    },
  }
}

function getErrorMessage(error) {
  return error instanceof Error ? error.message : String(error)
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
