import { expect, test } from '@playwright/test'

import { openFirstPhotoViewer } from './helpers/gallery'

test('opens a gallery photo and restores the homepage when closing', { tag: '@smoke' }, async ({ page }) => {
  const viewer = await openFirstPhotoViewer(page)
  const siteConfig = await page.evaluate(
    () =>
      (window as typeof window & { __SITE_CONFIG__: { title: string; description: string; url: string } })
        .__SITE_CONFIG__,
  )
  await expect(page.getByLabel(/close photo viewer/i)).toBeVisible()
  await expect(viewer.locator('button[aria-current="true"]')).toHaveCount(1)
  await expect(page.locator('article[aria-labelledby="photo-detail-heading"]')).toHaveAttribute('aria-hidden', 'true')
  await expect(page.locator('article[aria-labelledby="photo-detail-heading"]')).toHaveAttribute('inert', '')
  await expect(page.getByTestId('gallery-content')).toHaveAttribute('aria-hidden', 'true')
  await expect(page.getByTestId('gallery-content')).toHaveAttribute('inert', '')

  await page.keyboard.press('Escape')
  await expect(viewer).toBeHidden()
  await expect.poll(() => new URL(page.url()).pathname).toBe('/')
  await expect(page.getByTestId('gallery-content')).not.toHaveAttribute('inert', '')
  await expect.poll(() => page.evaluate(() => document.body.style.overflow)).not.toBe('hidden')
  await expect(page).toHaveTitle(siteConfig.title)
  await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', siteConfig.description)
  const canonical = `${siteConfig.url.replace(/\/+$/, '')}/`
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', canonical)
  await expect(page.locator('meta[property="og:url"]')).toHaveAttribute('content', canonical)
  await expect(page.locator('meta[name="robots"]')).toHaveCount(0)
  const jsonLd = page.locator('script[data-afilmory-page-jsonld]')
  await expect(jsonLd).toHaveCount(1)
  const homeMeta = JSON.parse((await jsonLd.textContent()) ?? '{}')
  expect(homeMeta).toMatchObject({ '@type': 'WebSite', url: canonical })
  expect(homeMeta).not.toHaveProperty('contentUrl')
})

test.describe('static production output', () => {
  test.use({ javaScriptEnabled: false })

  test('serves its manifest and a linked static media page', { tag: '@smoke' }, async ({ page, request }) => {
    test.skip(process.env.PLAYWRIGHT_PRODUCTION !== 'true', 'Static media pages are generated during production builds')
    const response = await request.get('/photos-manifest.json')
    expect(response.status()).toBe(200)
    expect(response.headers()['content-type']).toContain('application/json')
    const manifest = (await response.json()) as {
      version?: string
      data?: Array<{
        id: string
        mediaType?: 'photo' | 'video'
        originalUrl: string
        videoUrl?: string
        thumbnailSrcSet?: string
        thumbnailUrl?: string
      }>
    }
    expect(manifest.version).toBeTruthy()
    expect(manifest.data?.length).toBeGreaterThan(0)
    expect(manifest.data?.[0]?.thumbnailUrl).toMatch(/\.webp(?:\?|$)/)
    expect(manifest.data?.[0]).not.toHaveProperty('thumbnailSrcSet')

    await page.goto('/')
    await expect(page.locator('#splash-screen')).toBeHidden()
    const siteUrl = await page.locator('link[rel="canonical"]').getAttribute('href')
    expect(siteUrl).toMatch(/^https?:\/\//)
    const galleryLinks = page.locator('[data-afilmory-static-content] nav a')
    expect(await galleryLinks.count()).toBeGreaterThan(0)
    expect(await galleryLinks.count()).toBeLessThanOrEqual(24)
    const photoPath = await galleryLinks.first().getAttribute('href')
    expect(photoPath).toMatch(/^\/photos\/[^/]+\/$/)
    const photoId = decodeURIComponent(photoPath!.split('/')[2]!)
    const photo = manifest.data!.find((item) => item.id === photoId)
    expect(photo).toBeDefined()

    await galleryLinks.first().click()
    await expect.poll(() => new URL(page.url()).pathname).toBe(photoPath)
    await expect(page.locator('#splash-screen')).toBeHidden()
    const canonical = new URL(photoPath!, siteUrl!).href
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', canonical)
    await expect(page.locator('meta[property="og:url"]')).toHaveAttribute('content', canonical)
    const jsonLd = page.locator('script[data-afilmory-page-jsonld]')
    await expect(jsonLd).toHaveCount(1)
    expect(JSON.parse((await jsonLd.textContent()) ?? '{}')).toMatchObject({
      '@type': photo!.mediaType === 'video' ? 'VideoObject' : 'ImageObject',
      name: await page.title(),
      url: canonical,
      contentUrl: new URL(
        photo!.mediaType === 'video' ? photo!.videoUrl || photo!.originalUrl : photo!.originalUrl,
        siteUrl!,
      ).href,
    })

    const content = page.locator('[data-afilmory-static-content]')
    if (photo!.mediaType === 'video') {
      const video = content.locator('video')
      await expect(video).toBeVisible()
      await expect(video).toHaveAttribute('poster', /\S+/)
      const posterUrl = new URL((await video.getAttribute('poster'))!, page.url())
      expect(posterUrl.origin).toBe(new URL(page.url()).origin)
      const poster = await request.get(posterUrl.href)
      expect(poster.ok()).toBe(true)
      expect(poster.headers()['content-type']).toMatch(/^image\//)
    } else {
      const image = content.locator('img').first()
      await expect(image).toBeVisible()
      await expect.poll(() => image.evaluate((element: HTMLImageElement) => element.naturalWidth)).toBeGreaterThan(0)
      const imageUrl = await image.evaluate((element: HTMLImageElement) => element.currentSrc)
      expect(new URL(imageUrl).origin).toBe(new URL(page.url()).origin)
    }

    await page.getByRole('link', { name: 'Back to gallery' }).click()
    await expect.poll(() => new URL(page.url()).pathname).toBe('/')
  })
})

test('keeps unknown routes and the manifest viewer excluded from indexing', { tag: '@smoke' }, async ({ page }) => {
  test.skip(process.env.PLAYWRIGHT_PRODUCTION !== 'true', 'The manifest viewer remains available during development')
  for (const pathname of ['/unknown/path', '/photos/missing-photo/', '/manifest']) {
    await page.goto(pathname)
    await expect(page.getByRole('heading', { name: 'Page not found', exact: true })).toBeVisible()
    await expect(page).toHaveTitle(/Page not found/)
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, follow')
    await expect(page.locator('link[rel="canonical"]')).toHaveCount(0)
    await expect(page.locator('script[data-afilmory-page-jsonld]')).toHaveCount(0)
    await expect(page.locator('meta[property="og:url"], meta[property="twitter:url"]')).toHaveCount(0)
    await expect(page.getByRole('dialog')).toHaveCount(0)
    expect(new URL(page.url()).pathname).toBe(pathname)
  }

  await expect(page.getByText('You have come to a desert of knowledge where there is nothing.')).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Afilmory Manifest' })).toHaveCount(0)
})
