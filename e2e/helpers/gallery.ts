import type { Locator, Page } from '@playwright/test'
import { expect } from '@playwright/test'

const PHOTO_ROUTE = /\/photos\/[^/?]+\/?(?:\?.*)?$/

export async function openFirstPhotoViewer(page: Page): Promise<Locator> {
  await page.goto('/')
  expect(await page.evaluate(() => matchMedia('(prefers-reduced-motion: reduce)').matches)).toBe(true)

  const firstPhoto = page.locator('[data-photo-id]').first()
  await expect(firstPhoto).toBeVisible()
  await firstPhoto.click()

  const viewer = page.getByRole('dialog')
  await expect(page).toHaveURL(PHOTO_ROUTE)
  await expect(viewer).toBeVisible()
  return viewer
}
