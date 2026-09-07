import { expect, test } from '@playwright/test'

test('keeps scrolling photo clicks active while respecting a modal menu', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop', 'Exercises desktop mouse activation during scrolling')

  // The short viewport also makes the two-photo public fixture genuinely scrollable.
  await page.setViewportSize({ width: 1280, height: 200 })
  await page.goto('/')

  const firstPhoto = page.locator('[data-photo-id]').first()
  await expect(firstPhoto).toBeVisible()
  const photoPath = await firstPhoto.getAttribute('href')
  expect(photoPath).toBeTruthy()
  const bounds = await firstPhoto.boundingBox()
  expect(bounds).not.toBeNull()
  const visibleTop = Math.max(bounds!.y, 0)
  const visibleBottom = Math.min(bounds!.y + bounds!.height, 200)
  expect(visibleBottom - visibleTop).toBeGreaterThan(8)

  await page.mouse.move(bounds!.x + bounds!.width / 2, (visibleTop + visibleBottom) / 2)
  await page.mouse.down()
  try {
    const scrollingState = await firstPhoto.evaluate(async (photo) => {
      const scrollElement = photo.closest<HTMLElement>('[data-radix-scroll-area-viewport]')
      const grid = photo.closest<HTMLElement>('[role="grid"]')
      if (!scrollElement || !grid) throw new Error('Photo is missing its masonry scroll container')
      if (scrollElement.scrollHeight <= scrollElement.clientHeight) throw new Error('Gallery must be scrollable')

      const previousScrollTop = scrollElement.scrollTop
      await new Promise<void>((resolve) => {
        scrollElement.addEventListener(
          'scroll',
          () => requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
          { once: true },
        )
        scrollElement.scrollTop += 4
      })

      const style = getComputedStyle(grid)
      return {
        scrolled: scrollElement.scrollTop > previousScrollTop,
        willChange: style.willChange,
        pointerEvents: style.pointerEvents,
      }
    })

    // Inspect the active scroll state directly; waiting for scrolling to end hides the regression.
    expect(scrollingState).toEqual({ scrolled: true, willChange: 'contents', pointerEvents: 'auto' })
  } finally {
    await page.mouse.up()
  }

  await expect(page).toHaveURL(new URL(photoPath!, page.url()).href)
  await expect(page.getByRole('dialog')).toBeVisible()

  await page.keyboard.press('Escape')
  await expect(page.getByRole('dialog')).toHaveCount(0)
  await expect.poll(() => new URL(page.url()).pathname).toBe('/')
  await page.setViewportSize({ width: 1280, height: 800 })
  await page.getByRole('button', { name: 'View', exact: true }).first().click()
  const menu = page.getByRole('menu')
  await expect(menu).toBeVisible()
  await expect
    .poll(() =>
      firstPhoto.evaluate((photo) => ({
        body: getComputedStyle(document.body).pointerEvents,
        grid: getComputedStyle(photo.closest('[role="grid"]')!).pointerEvents,
      })),
    )
    .toEqual({ body: 'none', grid: 'none' })

  const blockedPhotoBounds = await firstPhoto.boundingBox()
  const menuBounds = await menu.boundingBox()
  expect(blockedPhotoBounds).not.toBeNull()
  expect(menuBounds).not.toBeNull()
  const clickX = blockedPhotoBounds!.x + blockedPhotoBounds!.width / 2
  const clickY = blockedPhotoBounds!.y + blockedPhotoBounds!.height / 2
  expect(clickY).toBeGreaterThan(0)
  expect(clickY).toBeLessThan(800)
  expect(
    clickX >= menuBounds!.x &&
      clickX <= menuBounds!.x + menuBounds!.width &&
      clickY >= menuBounds!.y &&
      clickY <= menuBounds!.y + menuBounds!.height,
  ).toBe(false)

  // A physical outside click must dismiss the menu without activating the blocked photo underneath.
  await page.mouse.click(clickX, clickY)
  await expect(menu).toBeHidden()
  await expect(page.getByRole('dialog')).toHaveCount(0)
  expect(new URL(page.url()).pathname).toBe('/')
})
