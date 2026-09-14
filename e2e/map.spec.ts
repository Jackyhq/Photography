import { expect, test } from '@playwright/test'
import sharp from 'sharp'

test('renders worker-backed maps and supports zooming and photo markers', async ({ page }, testInfo) => {
  test.skip(process.env.AFILMORY_E2E_FIXTURE !== 'true', 'Requires the synthetic GPS photo fixtures')

  const pageErrors: string[] = []
  page.on('pageerror', (error) => pageErrors.push(error.message))

  await page.addInitScript(() => {
    localStorage.setItem('i18nextLng', 'en')
    let config: Record<string, unknown> = {}
    // The HTML injects configuration after init scripts; retain the test style on each assignment.
    Object.defineProperty(window, '__SITE_CONFIG__', {
      configurable: true,
      get: () => config,
      set: (value: Record<string, unknown>) => {
        config = { ...value, mapStyle: '/__e2e/map-style.json', mapProjection: 'mercator' }
      },
    })
  })

  // Exercise real GeoJSON worker processing without relying on third-party tiles, glyphs or sprites.
  await page.route('**/__e2e/map-style.json', (route) =>
    route.fulfill({
      json: {
        version: 8,
        sources: { fixture: { type: 'geojson', data: '/__e2e/map-points.geojson' } },
        layers: [
          { id: 'background', type: 'background', paint: { 'background-color': '#eeeeee' } },
          {
            id: 'fixture-point',
            type: 'circle',
            source: 'fixture',
            paint: { 'circle-color': '#ff00aa', 'circle-radius': 12 },
          },
        ],
      },
    }),
  )
  await page.route('**/__e2e/map-points.geojson', (route) =>
    route.fulfill({
      json: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {},
            // Between the two synthetic photo locations, away from their HTML markers.
            geometry: { type: 'Point', coordinates: [121.0295, 31.26465] },
          },
        ],
      },
    }),
  )

  const workerCreated = page.waitForEvent('worker')
  await page.goto('/explory')
  expect((await workerCreated).url()).toContain('maplibre-gl-worker')
  expect(await page.evaluate(() => matchMedia('(prefers-reduced-motion: reduce)').matches)).toBe(true)

  const canvas = page.locator('.maplibregl-canvas')
  await expect(canvas).toBeVisible()
  await expect(page.getByRole('heading', { name: /map/i })).toBeVisible()

  // Worker creation alone is insufficient: its parsed GeoJSON must reach the WebGL renderer.
  await expect
    .poll(
      async () => {
        const { data, info } = await sharp(await canvas.screenshot())
          .raw()
          .toBuffer({ resolveWithObject: true })
        let renderedPointPixels = 0
        for (let offset = 0; offset < data.length; offset += info.channels) {
          if (data[offset] > 250 && data[offset + 1] < 5 && Math.abs(data[offset + 2] - 170) < 5) {
            renderedPointPixels++
          }
        }
        return renderedPointPixels
      },
      { message: 'The real MapLibre worker should render the GeoJSON point' },
    )
    .toBeGreaterThan(100)

  const marker = page.locator('.maplibregl-marker').first()
  const markerButton = marker.getByRole('button')
  await expect(markerButton).toBeVisible()
  await expect(page.locator('.maplibregl-marker[role="button"]')).toHaveCount(0)
  const initialPosition = await marker.getAttribute('style')

  await page.getByRole('button', { name: 'Zoom out', exact: true }).click()
  await expect.poll(() => marker.getAttribute('style')).not.toBe(initialPosition)

  await markerButton.click()
  await expect.poll(() => new URL(page.url()).searchParams.get('photoId')).toBeTruthy()
  const photoId = new URL(page.url()).searchParams.get('photoId')!
  await expect(page.locator(`a[href="/photos/${encodeURIComponent(photoId)}/"]`)).toBeVisible()

  await page.getByRole('button', { name: 'Close', exact: true }).click()
  await expect.poll(() => new URL(page.url()).searchParams.get('photoId')).toBeNull()

  await page.goto(`/photos/${encodeURIComponent(photoId)}/`)
  await expect(page.getByRole('dialog')).toBeVisible()
  if (testInfo.project.name === 'mobile') {
    await page.getByRole('button', { name: 'Toggle photo information', exact: true }).click()
  }
  const miniMapLink = page.getByRole('link', { name: 'View location in map', exact: true })
  await miniMapLink.scrollIntoViewIfNeeded()
  await expect(miniMapLink).toBeVisible()
  const miniMap = miniMapLink.locator('..')
  await expect(miniMap.locator('.maplibregl-canvas')).toBeVisible()
  await expect(miniMap.getByText('Loading map...', { exact: true })).toHaveCount(0)
  expect(pageErrors).toEqual([])
})
