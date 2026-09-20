import { expect, test } from '@playwright/test'

test('renders the loading shell while the deferred photo index downloads, then initializes the gallery', async ({
  page,
}) => {
  test.skip(process.env.PLAYWRIGHT_PRODUCTION !== 'true', 'The external photo index is emitted in production')

  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  let releaseIndex!: () => void
  const indexReady = new Promise<void>((resolve) => {
    releaseIndex = resolve
  })
  await page.route('**/assets/photos-index.*.js', async (route) => {
    await indexReady
    await route.continue()
  })

  try {
    await page.goto('/', { waitUntil: 'commit' })
    await expect(page.locator('#splash-screen')).toBeVisible()
    await expect(page.locator('[data-photo-id]')).toHaveCount(0)
  } finally {
    releaseIndex()
  }

  await expect(page.locator('[data-photo-id]').first()).toBeVisible()
  await expect(page.locator('#splash-screen')).toHaveCount(0)
  expect(errors).toEqual([])
})

test('serves the generated agent index as Markdown text with public discovery links', async ({ request }) => {
  test.skip(process.env.PLAYWRIGHT_PRODUCTION !== 'true', 'The agent index is emitted in production')

  const response = await request.get('/llms.txt')
  expect(response.status()).toBe(200)
  expect(response.headers()['content-type']).toContain('text/plain')
  const body = await response.text()
  expect(body).toMatch(/^# .+/)
  expect(body).toMatch(/\[Photo sitemap\]\(https?:\/\/[^)]+\/sitemap\.xml\)/)
  expect(body).not.toContain('<!doctype html>')
})
