import { expect, test } from '@playwright/test'

// Install-time precaching deliberately includes both device variants. These
// checks measure page dependencies independently of background PWA downloads.
test.use({ serviceWorkers: 'block' })

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('i18nextLng', 'en'))
})

const desktopModule = /\/(?:DesktopGalleryScrollArea|DesktopActionButton)[-.]/

test('starts desktop dependencies before the gallery module finishes downloading', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop', 'Checks parallel desktop startup')
  let releaseGallery!: () => void
  const galleryGate = new Promise<void>((resolve) => {
    releaseGallery = resolve
  })
  await page.route(/\/GalleryRouteContent[.-]/, async (route) => {
    await galleryGate
    await route.continue()
  })
  const desktopRequested = page.waitForRequest(/\/DesktopGalleryScrollArea[.-]/)
  try {
    await page.goto('/', { waitUntil: 'domcontentloaded' })
    await desktopRequested
    releaseGallery()
    await expect(page.locator('[data-photo-id]').first()).toBeVisible()
  } finally {
    releaseGallery()
  }
})

test('skips gallery desktop modules on a fresh direct photo visit', async ({ page, request }) => {
  const response = await request.get('/photos-manifest.json')
  expect(response.ok()).toBe(true)
  const manifest = (await response.json()) as { data: Array<{ id: string }> }
  const photo = manifest.data[0]
  expect(photo).toBeDefined()
  const desktopRequests: string[] = []
  page.on('request', (entry) => {
    if (desktopModule.test(entry.url())) desktopRequests.push(entry.url())
  })

  await page.goto(`/photos/${encodeURIComponent(photo!.id)}/`)
  await expect(page.getByRole('dialog')).toBeVisible()
  expect(desktopRequests).toEqual([])
  await page.keyboard.press('Escape')
  await expect(page.getByRole('dialog')).toBeHidden()
  await expect(page.locator('[data-photo-id]').first()).toBeVisible()
})

test('keeps desktop gallery modules out of mobile startup and view settings', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'mobile', 'Measures the mobile page dependency graph')
  const desktopRequests: string[] = []
  page.on('request', (request) => {
    if (desktopModule.test(request.url())) desktopRequests.push(request.url())
  })

  await page.goto('/')
  const photos = page.locator('[data-photo-id]')
  await expect(photos.first()).toBeVisible()
  const firstId = await photos.first().getAttribute('data-photo-id')
  expect(desktopRequests).toEqual([])
  await expect(page.locator('[data-radix-scroll-area-viewport]')).toHaveCount(0)

  await page.getByRole('button', { name: 'View', exact: true }).click()
  const drawer = page.getByRole('dialog')
  await expect(drawer.getByRole('slider')).toHaveAttribute('aria-valuemax', '5')
  await drawer.getByRole('button', { name: 'Oldest First', exact: true }).click()
  await page.keyboard.press('Escape')
  await expect(drawer).toBeHidden()
  await expect(photos.first()).not.toHaveAttribute('data-photo-id', firstId!)

  await page.getByRole('button', { name: 'View', exact: true }).click()
  await expect(drawer.getByRole('button', { name: 'Oldest First', exact: true })).toHaveAttribute(
    'aria-pressed',
    'true',
  )
  await page.keyboard.press('Escape')
  await expect(drawer).toBeHidden()
  expect(desktopRequests).toEqual([])
  await photos.first().click()
  await expect(page.getByRole('dialog')).toBeVisible()
  await expect(page).toHaveURL(/\/photos\//)
})

test('preserves the first keyboard open while the desktop menu module loads', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop', 'Exercises the desktop lazy menu boundary')
  let releaseMenu!: () => void
  const menuGate = new Promise<void>((resolve) => {
    releaseMenu = resolve
  })
  await page.route(/\/DesktopActionButton[.-]/, async (route) => {
    await menuGate
    await route.continue()
  })

  try {
    await page.goto('/', { waitUntil: 'domcontentloaded' })
    await expect(page.locator('[data-photo-id]').first()).toBeVisible()
    const view = page.getByRole('button', { name: 'View', exact: true }).first()
    await view.focus()
    await page.keyboard.press('Enter')
    releaseMenu()

    const menu = page.getByRole('menu')
    await expect(menu.getByRole('slider')).toHaveAttribute('aria-valuemax', '8')
    await expect.poll(() => menu.evaluate((element) => element.contains(document.activeElement))).toBe(true)
    await page.keyboard.press('Escape')
    await expect(menu).toBeHidden()
    await expect(view).toBeFocused()
    await page.keyboard.press('Space')
    await expect(menu).toBeVisible()
    await page.keyboard.press('Escape')
    await expect(menu).toBeHidden()
    await expect(view).toBeFocused()
  } finally {
    releaseMenu()
  }
})

test('switches gallery scrolling and controls across the desktop breakpoint', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop', 'One context exercises both responsive branches')
  await page.setViewportSize({ width: 1023, height: 800 })
  await page.goto('/')
  await expect(page.locator('[data-photo-id]').first()).toBeVisible()
  await expect(page.locator('[data-radix-scroll-area-viewport]')).toHaveCount(0)

  await page.setViewportSize({ width: 1024, height: 800 })
  await expect(page.locator('[data-radix-scroll-area-viewport]')).toBeVisible()
  await page.getByRole('button', { name: 'View', exact: true }).first().click()
  await expect(page.getByRole('menu').getByRole('slider')).toHaveAttribute('aria-valuemax', '8')
  await page.keyboard.press('Escape')
  await expect(page.getByRole('menu')).toBeHidden()

  await page.setViewportSize({ width: 1023, height: 800 })
  await expect(page.locator('[data-radix-scroll-area-viewport]')).toHaveCount(0)
  await page.getByRole('button', { name: 'View', exact: true }).click()
  await expect(page.getByRole('dialog').getByRole('slider')).toHaveAttribute('aria-valuemax', '5')
  await page.keyboard.press('Escape')
  await expect(page.getByRole('dialog')).toBeHidden()
  const firstPhoto = page.locator('[data-photo-id]').first()
  await firstPhoto.click()
  await expect(page.getByRole('dialog')).toBeVisible()
  await expect(page).toHaveURL(/\/photos\//)
})
