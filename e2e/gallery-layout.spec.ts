import type { Page } from '@playwright/test'
import { expect, test } from '@playwright/test'

test.use({ serviceWorkers: 'block' })

const PHOTO_COUNT = 100
const photoId = (index: number) => `layout-fixture-${String(index).padStart(3, '0')}`

interface PublicFixtureManifest {
  version: string
  cameras: unknown[]
  lenses: unknown[]
  data: Array<{
    originalUrl: string
    thumbnailUrl: string
    thumbnailWebpSrcSet?: string
    thumbHash?: string | null
    size: number
  }>
}

test.beforeEach(async ({ page, request }, testInfo) => {
  test.skip(
    process.env.PLAYWRIGHT_PRODUCTION !== 'true' || process.env.AFILMORY_E2E_FIXTURE !== 'true',
    'Requires a production build with public photo fixtures',
  )
  test.skip(testInfo.project.name !== 'mobile', 'Exercises the measured-free mobile photo layout')
  const response = await request.get('/photos-manifest.json')
  expect(response.ok()).toBe(true)
  const source = (await response.json()) as PublicFixtureManifest
  const seed = source.data[0]
  // Reuse only the public synthetic fixture's media; never expand a real photo manifest.
  expect(seed?.originalUrl).toMatch(/^\/__fixtures\/photos\//)
  expect(seed?.thumbnailUrl).toMatch(/^\/__fixtures\/thumbnails\//)
  const manifest = {
    ...source,
    data: Array.from({ length: PHOTO_COUNT }, (_, index) => {
      const aspectRatio = [1.5, 0.6, 2.4, 0.8][index % 4]!
      const sortTime = Date.UTC(2026, 0, index + 1)
      return {
        id: photoId(index),
        title: `Layout fixture ${index}`,
        description: `Synthetic layout photo ${index}`,
        originalUrl: seed!.originalUrl,
        thumbnailUrl: seed!.thumbnailUrl,
        thumbnailWebpSrcSet: seed!.thumbnailWebpSrcSet,
        thumbHash: seed!.thumbHash,
        size: seed!.size,
        width: 1200,
        height: 1200 / aspectRatio,
        aspectRatio,
        dateTaken: new Date(sortTime).toISOString(),
        lastModified: new Date(sortTime).toISOString(),
        sortTime,
        tags: [],
      }
    }),
  }
  const serialized = JSON.stringify(manifest).replaceAll('<', '\\u003c')
  await page.route(/\/assets\/photos-index\.[^/]+\.js(?:\?.*)?$/, (route) =>
    route.fulfill({
      contentType: 'application/javascript',
      body: `window.__MANIFEST__=${serialized};window.__FULL_MANIFEST_URL__=undefined;window.__PHOTO_TEXT_URLS__={};`,
    }),
  )
  await page.addInitScript(() => {
    localStorage.setItem('i18nextLng', 'en')
    const runtime = window as typeof window & { __hiddenPhotoHeightReads?: number }
    runtime.__hiddenPhotoHeightReads = 0
    const descriptor = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'offsetHeight')!
    Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
      ...descriptor,
      get(this: HTMLElement) {
        if (
          this.getAttribute('role') === 'listitem' &&
          this.style.visibility === 'hidden' &&
          this.querySelector('[data-photo-id]')
        ) {
          runtime.__hiddenPhotoHeightReads!++
        }
        return descriptor.get!.call(this) as number
      },
    })
  })
})

async function expectConsistentLayout(page: Page) {
  await expect
    .poll(() =>
      page.locator('[data-photo-id]').evaluateAll((photos) => {
        const columns = new Map<number, Array<{ top: number; height: number }>>()
        for (const photo of photos) {
          const wrapper = photo.closest<HTMLElement>('[role="listitem"]')!
          if (getComputedStyle(wrapper).visibility === 'hidden') return 'A photo is hidden for measurement'
          const left = Number.parseFloat(wrapper.style.left)
          const top = Number.parseFloat(wrapper.style.top)
          const height = Number.parseFloat(getComputedStyle(photo).height)
          if (![left, top, height].every(Number.isFinite) || height <= 0) return 'Invalid photo geometry'
          const column = columns.get(left) ?? []
          column.push({ top, height })
          columns.set(left, column)
        }
        for (const column of columns.values()) {
          column.sort((a, b) => a.top - b.top)
          for (let index = 1; index < column.length; index++) {
            const previous = column[index - 1]!
            const gap = column[index]!.top - previous.top - previous.height
            // The positioner rounds photo heights; the intended row gutter is 4px.
            if (gap < 3 || gap > 5)
              return `Unexpected row gap: ${JSON.stringify({ previous, next: column[index], gap })}`
          }
        }
        return photos.length > 0 && photos.length < 100 ? null : `Unexpected mounted photo count: ${photos.length}`
      }),
    )
    .toBeNull()
}

test('lays out first-view photos without hidden wrapper height reads', async ({ page }, testInfo) => {
  await page.goto('/')
  const photos = page.locator('[data-photo-id]')
  await expect(photos.first()).toHaveAttribute('data-photo-id', photoId(99))
  await expect(photos.first()).toBeVisible()
  await expectConsistentLayout(page)
  const metrics = await page.evaluate(() => ({
    hiddenPhotoHeightReads: (window as typeof window & { __hiddenPhotoHeightReads: number }).__hiddenPhotoHeightReads,
    mountedPhotos: document.querySelectorAll('[data-photo-id]').length,
  }))
  await testInfo.attach('mobile-photo-layout', {
    body: JSON.stringify(metrics, null, 2),
    contentType: 'application/json',
  })
  expect(metrics.hiddenPhotoHeightReads).toBe(0)
  expect(metrics.mountedPhotos).toBeLessThan(PHOTO_COUNT)
})

test('keeps a long gallery virtualized through scrolling, resizing, columns and same-length sorting', async ({
  page,
}) => {
  await page.goto('/')
  const photos = page.locator('[data-photo-id]')
  await expect(photos.first()).toHaveAttribute('data-photo-id', photoId(99))
  await expectConsistentLayout(page)

  const lastPhoto = page.locator(`[data-photo-id="${photoId(0)}"]`)
  await expect
    .poll(async () => {
      await page.evaluate(() => document.body.scrollTo(0, document.body.scrollHeight))
      return lastPhoto.isVisible()
    })
    .toBe(true)
  await expect(page.locator(`[data-photo-id="${photoId(99)}"]`)).toHaveCount(0)
  await expectConsistentLayout(page)

  await page.evaluate(() => document.body.scrollTo(0, 0))
  await expect(photos.first()).toHaveAttribute('data-photo-id', photoId(99))
  await page.setViewportSize({ width: 620, height: 800 })
  await expectConsistentLayout(page)
  const columnCount = () =>
    photos.evaluateAll(
      (items) => new Set(items.map((item) => item.closest<HTMLElement>('[role="listitem"]')!.style.left)).size,
    )
  await expect.poll(columnCount).toBe(4)

  await page.getByRole('button', { name: 'View', exact: true }).click()
  const drawer = page.getByRole('dialog')
  const slider = drawer.getByRole('slider')
  await slider.press('Home')
  await slider.press('ArrowRight')
  await expect(slider).toHaveAttribute('aria-valuenow', '3')
  await page.keyboard.press('Escape')
  await expect(drawer).toBeHidden()
  await expect.poll(columnCount).toBe(3)
  await expectConsistentLayout(page)

  await page.getByRole('button', { name: 'View', exact: true }).click()
  await drawer.getByRole('button', { name: 'Oldest First', exact: true }).click()
  await page.keyboard.press('Escape')
  await expect(drawer).toBeHidden()
  await expect(photos.first()).toHaveAttribute('data-photo-id', photoId(0))
  await expectConsistentLayout(page)

  await photos.first().click()
  await expect(page).toHaveURL(new RegExp(`/photos/${photoId(0)}/?$`))
  await expect(page.getByRole('dialog')).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(page.getByRole('dialog')).toBeHidden()
  await expect(photos.first()).toBeVisible()
  await expectConsistentLayout(page)
})
