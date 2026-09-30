import type { Page } from '@playwright/test'
import { expect, test } from '@playwright/test'

import { openFirstPhotoViewer } from './helpers/gallery'

async function readHead(page: Page) {
  return page.evaluate(() => {
    const meta = (property: string) => document.querySelector<HTMLMetaElement>(`meta[property="${property}"]`)?.content
    return {
      title: document.title,
      description: document.querySelector<HTMLMetaElement>('meta[name="description"]')?.content,
      canonical: document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.href,
      url: meta('og:url'),
      image: meta('og:image'),
      twitterImage: meta('twitter:image'),
      jsonLd: JSON.parse(document.querySelector('script[data-afilmory-page-jsonld]')?.textContent ?? '{}'),
    }
  })
}

test('keeps metadata consistent from a fresh direct photo visit through next photo and back home', async ({
  page,
  request,
}) => {
  const response = await request.get('/photos-manifest.json')
  expect(response.ok()).toBe(true)
  const manifest = (await response.json()) as { data: Array<{ id: string; dateTaken: string }> }
  const photos = manifest.data.toSorted((a, b) => b.dateTaken.localeCompare(a.dateTaken))
  expect(photos.length).toBeGreaterThan(1)
  const photoPath = `/photos/${encodeURIComponent(photos[0]!.id)}/`
  await page.goto(photoPath)
  await expect(page.getByRole('dialog')).toBeVisible()
  const siteConfig = await page.evaluate(
    () =>
      (window as typeof window & { __SITE_CONFIG__: { title: string; description: string; url: string } })
        .__SITE_CONFIG__,
  )

  const first = await readHead(page)
  expect(first.canonical).toBe(`${siteConfig.url.replace(/\/+$/, '')}${photoPath}`)
  expect(first.url).toBe(first.canonical)
  expect(first.jsonLd.url).toBe(first.canonical)
  expect(first.jsonLd.name).toBe(first.title)

  await page.keyboard.press('ArrowRight')
  await expect(page).not.toHaveURL(new RegExp(`${photoPath}$`))
  await expect.poll(async () => (await readHead(page)).canonical).not.toBe(first.canonical)
  const next = await readHead(page)
  expect(next.url).toBe(next.canonical)
  expect(next.jsonLd.url).toBe(next.canonical)
  expect(next.jsonLd.name).toBe(next.title)
  expect(next.jsonLd.contentUrl).not.toBe(first.jsonLd.contentUrl)

  await page.keyboard.press('Escape')
  await expect.poll(() => new URL(page.url()).pathname).toBe('/')
  await expect.poll(async () => (await readHead(page)).title).toBe(siteConfig.title)
  const home = await readHead(page)
  expect(home.description).toBe(siteConfig.description)
  expect(home.canonical).toBe(`${siteConfig.url.replace(/\/+$/, '')}/`)
  expect(home.url).toBe(home.canonical)
  expect(home.jsonLd['@type']).toBe('WebSite')
  expect(home.jsonLd).not.toHaveProperty('contentUrl')
  const siteImage = await page.locator('meta[name="afilmory:site-image"]').getAttribute('content')
  expect(home.image).toBe(siteImage)
  expect(home.twitterImage).toBe(siteImage)
  await expect(page.locator('script[data-afilmory-page-jsonld]')).toHaveCount(1)
})

test('keeps invalid pages noindex and restores metadata through navigation and history', async ({ page }) => {
  test.skip(process.env.PLAYWRIGHT_PRODUCTION !== 'true', 'Checks production-only route exclusions')
  const invalidPaths = ['/unknown/path', '/photos/missing-photo/', '/photos/constructor/', '/photos/', '/manifest']

  async function expectNotFound(pathname: string) {
    await expect(page.getByRole('heading', { name: 'Page not found', exact: true })).toBeVisible()
    await expect(page).toHaveTitle(/Page not found/)
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, follow')
    await expect(page.locator('link[rel="canonical"]')).toHaveCount(0)
    await expect(page.locator('script[data-afilmory-page-jsonld]')).toHaveCount(0)
    await expect(page.locator('meta[property="og:url"], meta[property="twitter:url"]')).toHaveCount(0)
    await expect(page.getByRole('dialog')).toHaveCount(0)
    // The viewer's delayed URL synchronization must not redirect a missing photo to home.
    await page.waitForTimeout(700)
    expect(new URL(page.url()).pathname).toBe(pathname)
  }

  for (const pathname of invalidPaths) {
    await page.goto(pathname)
    await expectNotFound(pathname)
  }

  await page.getByRole('button', { name: 'Back to Home', exact: true }).click()
  await expect(page.locator('[data-photo-id]').first()).toBeVisible()
  await expect(page.locator('meta[name="robots"]')).toHaveCount(0)
  expect((await readHead(page)).jsonLd['@type']).toBe('WebSite')
  await page.goBack()
  await expectNotFound('/manifest')
  await page.goForward()
  await expect(page.locator('[data-photo-id]').first()).toBeVisible()
  await expect(page.locator('meta[name="robots"]')).toHaveCount(0)

  await page.locator('[data-photo-id]').first().click()
  await expect(page.getByRole('dialog')).toBeVisible()
  await page.evaluate(() => {
    const { router } = window as typeof window & { router: { navigate: (path: string) => void } }
    router.navigate('/photos/missing-photo/')
  })
  await expectNotFound('/photos/missing-photo/')
  await page.getByRole('button', { name: 'Back to Home', exact: true }).click()
  await expect(page.locator('[data-photo-id]').first()).toBeVisible()
  await expect.poll(() => page.evaluate(() => document.body.style.overflow)).not.toBe('hidden')
  await page.locator('[data-photo-id]').first().click()
  await expect(page.getByRole('dialog')).toBeVisible()
  await expect(page.locator('meta[name="robots"]')).toHaveCount(0)
  expect((await readHead(page)).jsonLd['@type']).toBe('ImageObject')
})

test('publishes photo licensing metadata and opens the policy through an active service worker', async ({
  page,
  request,
}) => {
  test.skip(process.env.PLAYWRIGHT_PRODUCTION !== 'true', 'Checks generated photo HTML and production service worker')
  const viewer = await openFirstPhotoViewer(page)
  const clientMeta = await readHead(page)
  const licensingUrl = new URL('/licensing/', clientMeta.canonical!).href
  const licenseFields = { '@type': 'ImageObject', license: licensingUrl, acquireLicensePage: licensingUrl }
  expect(clientMeta.jsonLd).toMatchObject(licenseFields)

  const photoResponse = await request.get(new URL(page.url()).pathname)
  expect(photoResponse.status()).toBe(200)
  const generatedMeta = await page.evaluate(
    (html) => {
      const document = new DOMParser().parseFromString(html, 'text/html')
      return JSON.parse(document.querySelector('script[data-afilmory-page-jsonld]')?.textContent ?? '{}')
    },
    await photoResponse.text(),
  )
  expect(generatedMeta).toMatchObject(licenseFields)

  await page.keyboard.press('Escape')
  await expect(viewer).toBeHidden()
  await expect.poll(() => new URL(page.url()).pathname).toBe('/')
  await expect
    .poll(() => page.evaluate(async () => Boolean((await navigator.serviceWorker.getRegistration())?.active)))
    .toBe(true)
  await page.reload()
  await expect.poll(() => page.evaluate(() => Boolean(navigator.serviceWorker.controller))).toBe(true)

  const licensingLink = page.locator('a[href="/licensing/"]')
  await expect(licensingLink).toBeVisible()
  await expect(licensingLink).toHaveAccessibleName(/licens|授权/i)
  await licensingLink.click()
  await expect.poll(() => new URL(page.url()).pathname).toBe('/licensing/')
  await expect(page.getByRole('heading', { level: 1 })).toContainText(/licens|授权/i)
  await expect(
    page.getByRole('region', { name: '如何申请授权' }).getByRole('link', { name: 'i@jackyw.cn', exact: true }),
  ).toHaveAttribute('href', 'mailto:i@jackyw.cn')
})

test.describe('static photo licensing policy', () => {
  test.use({ javaScriptEnabled: false })

  test('serves readable bilingual terms and an authorization contact without JavaScript', async ({ page }) => {
    test.skip(process.env.PLAYWRIGHT_PRODUCTION !== 'true', 'Checks the production standalone policy page')
    const response = await page.goto('/licensing/')
    expect(response?.status()).toBe(200)
    expect(response?.headers()['content-type']).toContain('text/html')
    await expect(page).toHaveTitle(/licens|授权/i)
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    await expect(page.locator('main')).toContainText('书面')
    await expect(page.getByRole('region', { name: 'Photo licensing and usage' })).toContainText(/written consent/i)
    const contact = page
      .getByRole('region', { name: '如何申请授权' })
      .getByRole('link', { name: 'i@jackyw.cn', exact: true })
    await expect(contact).toBeVisible()
    await expect(contact).toHaveAttribute('href', 'mailto:i@jackyw.cn')
    const galleryLink = page.getByRole('link', { name: /back to gallery|返回摄影画廊/i })
    await expect(galleryLink).toBeVisible()
    await expect(galleryLink).toHaveAttribute('href', '/')
  })
})
