import type { Locator, Page } from '@playwright/test'
import { expect, test } from '@playwright/test'

const PHOTO_ROUTE = /\/photos\/[^/?]+\/?(?:\?.*)?$/

// Gallery E2E covers interaction and layout, not entrance animation timing.
// Keep masonry targets stationary so mobile pointer clicks are deterministic.
test.use({ reducedMotion: 'reduce' })

async function focusByTab(page: Page, target: Locator, maxPresses = 60): Promise<void> {
  for (let press = 0; press < maxPresses; press++) {
    await page.keyboard.press('Tab')
    if (await target.evaluateAll((elements) => elements.includes(document.activeElement as Element))) return
  }

  throw new Error(`Could not reach the requested control with ${maxPresses} Tab presses`)
}

async function expectFocusToRemainInside(page: Page, dialog: Locator, presses = 12): Promise<void> {
  for (let press = 0; press < presses; press++) {
    await page.keyboard.press(press % 2 === 0 ? 'Tab' : 'Shift+Tab')
    await expect.poll(() => dialog.evaluate((element) => element.contains(document.activeElement))).toBe(true)
  }
}

async function openFirstPhotoViewer(page: Page): Promise<Locator> {
  await page.goto('/')

  const firstPhoto = page.locator('[data-photo-id]').first()
  await expect(firstPhoto).toBeVisible()
  await firstPhoto.click()

  const viewer = page.getByRole('dialog')
  await expect(page).toHaveURL(PHOTO_ROUTE)
  await expect(viewer).toBeVisible()
  return viewer
}

test('keeps the manifest viewer unavailable in production builds', async ({ page }) => {
  test.skip(process.env.PLAYWRIGHT_PRODUCTION !== 'true', 'The manifest viewer remains available during development')

  await page.goto('/manifest')

  await expect(page.getByText('You have come to a desert of knowledge where there is nothing.')).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Afilmory Manifest' })).toHaveCount(0)
})

test('marks unknown routes as noindex without a misleading canonical', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop', 'SEO route behavior only needs one browser profile')

  for (const pathname of ['/photos/not-a-real-photo/', '/not-a-real-page/']) {
    await page.goto(pathname)

    await expect(page.getByRole('heading', { name: 'Page not found' })).toBeVisible()
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, follow')
    await expect(page.locator('link[rel="canonical"]')).toHaveCount(0)
    await expect(page.locator('article[aria-labelledby="photo-detail-heading"]')).toHaveCount(0)
  }
})

test('serves the production manifest from a stable public URL', async ({ request }) => {
  const response = await request.get('/photos-manifest.json')

  expect(response.status()).toBe(200)
  expect(response.headers()['content-type']).toContain('application/json')

  const manifest = (await response.json()) as {
    version?: string
    data?: Array<{ thumbnailSrcSet?: string; thumbnailUrl?: string }>
  }
  expect(manifest.version).toBeTruthy()
  expect(manifest.data?.length).toBeGreaterThan(0)
  expect(manifest.data?.[0]?.thumbnailUrl).toMatch(/\.webp(?:\?|$)/)
  expect(manifest.data?.[0]).not.toHaveProperty('thumbnailSrcSet')
})

test('renders the masonry gallery and opens the photo viewer', async ({ page }, testInfo) => {
  await page.goto('/')
  const firstPhoto = page.locator('[data-photo-id]').first()
  await expect(firstPhoto).toHaveAttribute('href', PHOTO_ROUTE)
  const firstPhotoId = await firstPhoto.getAttribute('data-photo-id')
  expect(firstPhotoId).toBeTruthy()
  await expect(page.locator('[data-primary-site][href="https://jackyw.cn/"]')).toHaveCount(1)
  await expect(page.locator('[data-primary-site][href="https://jackyw.uk/"]')).toHaveCount(1)
  await expect(page.locator('link[rel="canonical"]')).toHaveCount(1)
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://photo.jackyw.cn')

  const viewer = await openFirstPhotoViewer(page)
  await expect(page.locator('link[rel="canonical"]')).toHaveCount(1)
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    'href',
    `https://photo.jackyw.cn/photos/${encodeURIComponent(firstPhotoId!)}/`,
  )
  await expect(page.locator('meta[property="og:image:alt"]')).toHaveAttribute(
    'content',
    await page.locator('meta[property="og:title"]').getAttribute('content'),
  )
  await expect(page.locator('meta[property="twitter:image:alt"]')).toHaveAttribute(
    'content',
    await page.locator('meta[property="twitter:title"]').getAttribute('content'),
  )
  await expect(page.getByLabel(/close photo viewer/i)).toBeVisible()
  await expect(viewer.locator('button[aria-current="true"]')).toHaveCount(1)
  await expect(page.locator('article[aria-labelledby="photo-detail-heading"]')).toHaveAttribute('aria-hidden', 'true')
  await expect(page.locator('article[aria-labelledby="photo-detail-heading"]')).toHaveAttribute('inert', '')
  await expect(page.getByTestId('gallery-content')).toHaveAttribute('aria-hidden', 'true')
  await expect(page.getByTestId('gallery-content')).toHaveAttribute('inert', '')

  if (testInfo.project.name === 'desktop') {
    await expect(page.getByRole('button', { name: /raw exif|原始 exif/i })).toBeVisible()
  } else {
    await page.getByRole('button', { name: /toggle photo information|切换照片信息/i }).click()
    await expect(page.getByRole('button', { name: /close photo information|关闭照片信息/i })).toBeVisible()
  }
})

test('shows Instagram as the first social sharing option', async ({ page }) => {
  await openFirstPhotoViewer(page)
  await page.getByRole('button', { name: /share photo|分享照片|分享相片/i }).click()

  const socialHeading = page.getByRole('heading', {
    name: /social media|社交媒体|社交媒體|ソーシャルメディア|소셜 미디어/i,
  })
  const socialOptions = socialHeading.locator('..').locator('..').getByRole('button')

  await expect(socialOptions.first()).toHaveText('Instagram')
  await expect(page.getByRole('button', { name: /weibo|微博/i })).toHaveCount(0)
})

test('keeps desktop header controls before photos in the keyboard order', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop', 'Desktop masonry includes the header card')

  await page.goto('/')
  await expect(page.locator('[data-photo-id]').first()).toBeVisible()

  const headerControlsComeFirst = await page.evaluate(() => {
    const searchButton = document.querySelector('[data-testid="command-palette-trigger"]')
    const firstPhoto = document.querySelector('[data-photo-id]')

    if (!searchButton || !firstPhoto) return false

    return Boolean(searchButton.compareDocumentPosition(firstPhoto) & Node.DOCUMENT_POSITION_FOLLOWING)
  })

  expect(headerControlsComeFirst).toBe(true)
})

test('enters and traverses header keyboard navigation with arrow keys', async ({ page }) => {
  await page.goto('/')

  const firstPhoto = page.locator('[data-photo-id]').first()
  const homepage = page.locator('[data-gallery-keyboard-group="social"] a').first()
  const instagram = page.getByRole('link', { name: 'Instagram' })
  const map = page.getByTestId('map-explore-trigger').first()
  const search = page.getByTestId('command-palette-trigger').first()

  await expect(firstPhoto).toBeVisible()
  await expect(homepage).toHaveAccessibleName('Jackywhq homepage')
  await page.keyboard.press('ArrowDown')
  await expect(homepage).toBeFocused()

  await page.keyboard.press('ArrowRight')
  await expect(instagram).toBeFocused()

  await page.keyboard.press('ArrowDown')
  await expect(map).toBeFocused()

  await page.keyboard.press('ArrowLeft')
  await expect(search).toBeFocused()

  await page.keyboard.press('ArrowDown')
  await expect(firstPhoto).toBeFocused()

  await page.keyboard.press('ArrowUp')
  await expect(search).toBeFocused()
})

test('moves focus horizontally between masonry photos with arrow keys', async ({ page }) => {
  await page.goto('/')

  const firstPhoto = page.locator('[data-photo-id]').first()
  await expect(firstPhoto).toBeVisible()
  await focusByTab(page, firstPhoto)

  const firstPhotoId = await firstPhoto.getAttribute('data-photo-id')
  const firstBox = await firstPhoto.boundingBox()
  expect(firstPhotoId).toBeTruthy()
  expect(firstBox).not.toBeNull()

  await expect.poll(() => page.locator('[data-photo-id][tabindex="0"]').count()).toBe(1)

  await page.keyboard.press('ArrowRight')
  const rightPhoto = page.locator('[data-photo-id]:focus')
  await expect(rightPhoto).toBeVisible()
  await expect(rightPhoto).not.toHaveAttribute('data-photo-id', firstPhotoId!)
  const rightBox = await rightPhoto.boundingBox()
  expect(rightBox).not.toBeNull()
  expect(rightBox!.x).toBeGreaterThan(firstBox!.x)

  await page.keyboard.press('ArrowLeft')
  await expect(firstPhoto).toBeFocused()
})

test('moves focus vertically between masonry photos with arrow keys', async ({ page }) => {
  await page.setViewportSize({ width: 280, height: 800 })
  await page.goto('/')

  const firstPhoto = page.locator('[data-photo-id]').first()
  await expect(firstPhoto).toBeVisible()
  await focusByTab(page, firstPhoto)

  const firstPhotoId = await firstPhoto.getAttribute('data-photo-id')
  const firstBox = await firstPhoto.boundingBox()
  expect(firstPhotoId).toBeTruthy()
  expect(firstBox).not.toBeNull()

  await page.keyboard.press('ArrowDown')
  const lowerPhoto = page.locator('[data-photo-id]:focus')
  await expect(lowerPhoto).toBeVisible()
  await expect(lowerPhoto).not.toHaveAttribute('data-photo-id', firstPhotoId!)
  const lowerBox = await lowerPhoto.boundingBox()
  expect(lowerBox).not.toBeNull()
  expect(lowerBox!.y).toBeGreaterThan(firstBox!.y)

  await page.keyboard.press('ArrowUp')
  await expect(firstPhoto).toBeFocused()
})

test('keeps the preview visible and reports when the original image is blocked', async ({ page }) => {
  await page.goto('/')

  const firstPhoto = page.locator('[data-photo-id]').first()
  await expect(firstPhoto).toBeVisible()
  const photoId = await firstPhoto.getAttribute('data-photo-id')
  const originalUrl = await page.evaluate((id) => {
    const runtime = window as typeof window & {
      __MANIFEST__?: { data?: Array<{ id: string; originalUrl: string }> }
    }
    return runtime.__MANIFEST__?.data?.find((photo) => photo.id === id)?.originalUrl
  }, photoId)
  expect(originalUrl).toBeTruthy()

  await page.route(originalUrl!, (route) => route.abort('blockedbyclient'))
  await page.goto(`/photos/${encodeURIComponent(photoId!)}/`)

  const viewer = page.getByRole('dialog')
  await expect(viewer).toBeVisible()
  const loadAlert = page.getByRole('alert')
  await expect(loadAlert).toContainText(/original image unavailable|原图加载失败/i)
  await expect(loadAlert).toContainText(/showing the preview image instead|当前显示的是预览图/i)
  await expect(viewer.locator('img').first()).toBeVisible()
})

test('opens and closes the viewer with only the keyboard, traps focus, and restores the trigger', async ({
  page,
}, testInfo) => {
  await page.goto('/')

  const firstPhoto = page.locator('[data-photo-id]').first()
  await expect(firstPhoto).toBeVisible()
  const triggerElement = await firstPhoto.elementHandle()
  await focusByTab(page, firstPhoto)
  await page.keyboard.press('Enter')

  const viewer = page.getByRole('dialog')
  const closeButton = page.getByRole('button', { name: /close photo viewer|关闭照片查看器/i })
  await expect(viewer).toBeVisible()
  await expect(closeButton).toBeFocused()
  await expectFocusToRemainInside(page, viewer)

  await page.keyboard.press('Escape')
  await expect(viewer).toBeHidden()

  if (testInfo.project.name === 'mobile') {
    await expect
      .poll(async () => {
        return page.evaluate((trigger) => {
          const active = document.activeElement
          if (trigger && active === trigger) return 'trigger'
          if (active === document.body) return 'body'
          return 'other'
        }, triggerElement)
      })
      .toMatch(/trigger|body/)

    await expect
      .poll(() =>
        page.evaluate(() => {
          const active = document.activeElement
          return active instanceof Element ? active.closest('[role="dialog"]') === null : true
        }),
      )
      .toBe(true)
  } else {
    await expect(firstPhoto).toBeFocused()
  }
})

test('opens the command palette and filters results', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('[data-photo-id]').first()).toBeVisible()

  await page.getByTestId('command-palette-trigger').click()
  await expect(page.getByRole('dialog', { name: /search/i })).toBeVisible()
  const firstOption = page.getByRole('option').first()
  await expect(firstOption).toBeVisible()

  const initialOptionText = (await firstOption.textContent())?.trim() ?? ''
  const fallbackQuery = process.env.AFILMORY_E2E_FIXTURE === 'true' ? 'fixture' : ''
  const query = initialOptionText.slice(0, 2) || fallbackQuery

  await page.getByRole('textbox').fill(query)
  await expect(page.getByRole('listbox', { name: /search results/i })).toBeVisible()
  await expect(firstOption).toBeVisible()
})

test('traps command palette focus and restores its keyboard trigger', async ({ page }) => {
  await page.goto('/')

  const trigger = page.getByTestId('command-palette-trigger')
  await trigger.focus()
  await expect(trigger).toBeFocused()
  const triggerElement = await page.evaluateHandle(() => document.activeElement)
  await page.keyboard.press('Enter')

  const dialog = page.getByRole('dialog', { name: /search|搜索/i })
  await expect(dialog).toBeVisible()
  await expect(page.getByRole('textbox')).toBeFocused()
  await expectFocusToRemainInside(page, dialog)

  await page.keyboard.press('Escape')
  await expect(dialog).toBeHidden()
  await expect.poll(() => triggerElement.evaluate((element) => element === document.activeElement)).toBe(true)
})

test('does not let command palette arrow keys navigate the viewer underneath it', async ({ page }) => {
  await openFirstPhotoViewer(page)

  const viewerUrl = page.url()
  await page.keyboard.press('Control+k')
  const input = page.getByRole('textbox')
  await expect(input).toBeFocused()
  await input.fill('cat')

  await page.keyboard.press('ArrowLeft')
  await expect.poll(() => input.evaluate((element) => element.selectionStart)).toBe(2)
  await expect(page).toHaveURL(viewerUrl)
})

test('loads a photo detail route directly and preserves filter parameters when closing', async ({ page }) => {
  await page.goto('/')
  const firstPhoto = page.locator('[data-photo-id]').first()
  await expect(firstPhoto).toBeVisible()
  const photoId = await firstPhoto.getAttribute('data-photo-id')
  expect(photoId).toBeTruthy()

  const search = new URLSearchParams({ utm_source: 'e2e' })
  await page.goto(`/photos/${encodeURIComponent(photoId!)}/?${search}`)
  const viewer = page.getByRole('dialog')
  await expect(viewer).toBeVisible()
  await expect.poll(() => new URL(page.url()).searchParams.get('utm_source')).toBe('e2e')
  await expect(page.locator('link[rel="canonical"]')).toHaveCount(1)
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    'href',
    `https://photo.jackyw.cn/photos/${encodeURIComponent(photoId!)}/`,
  )

  await page.keyboard.press('Escape')
  await expect(page).toHaveURL(/\/?\?.*utm_source=e2e/)
  await expect.poll(() => new URL(page.url()).searchParams.get('utm_source')).toBe('e2e')
  await expect(page.locator('link[rel="canonical"]')).toHaveCount(1)
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://photo.jackyw.cn')
})

test('switches the resolved language and accessible labels', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('i18nextLng', 'zh-CN'))
  await page.goto('/')

  const languageToggle = page.getByRole('button', { name: '切换到英文' })
  await expect(languageToggle).toBeVisible()
  await languageToggle.click()

  await expect(page.locator('html')).toHaveAttribute('lang', 'en')
  await expect(page.getByRole('button', { name: 'Switch to Chinese' })).toBeVisible()
})

test('starts and cancels mobile Live Photo loading after long-press intent', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'mobile', 'Mobile-only interaction')
  test.skip(process.env.AFILMORY_E2E_FIXTURE !== 'true', 'Requires the deterministic synthetic Live Photo fixture')

  await page.goto('/')
  const livePhoto = page
    .locator('[data-photo-id]')
    .filter({ has: page.locator('.i-mingcute-live-photo-line') })
    .first()
  await expect(livePhoto).toBeVisible()

  const livePhotoRequest = page.waitForRequest((request) => /\.mov(?:\?|$)/i.test(request.url()))
  await livePhoto.dispatchEvent('pointerdown', {
    pointerId: 1,
    pointerType: 'touch',
    isPrimary: true,
  })
  await page.waitForTimeout(500)
  await livePhotoRequest

  await livePhoto.dispatchEvent('pointercancel', {
    pointerId: 1,
    pointerType: 'touch',
    isPrimary: true,
  })
  await expect.poll(() => livePhoto.locator('video').getAttribute('src')).toBeNull()
})

test('loads the map route', async ({ page }) => {
  await page.goto('/explory')

  await expect(page.getByRole('heading', { name: /map|地图|地圖|マップ|지도/i })).toBeVisible()
  await expect(page.locator('.maplibregl-marker').first()).toBeVisible()
  await expect(page.locator('.maplibregl-marker[role="button"]')).toHaveCount(0)
  await expect(page.locator('.maplibregl-marker button').first()).toBeVisible()
})
