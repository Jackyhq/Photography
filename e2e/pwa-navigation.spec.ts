import type { ClientRequest } from 'node:http'
import { createServer, request as forwardRequest } from 'node:http'

import { expect, test } from '@playwright/test'

async function createCanonicalRedirectProxy(baseURL: string) {
  const preview = new URL(baseURL)
  if (preview.protocol !== 'http:' || preview.hostname !== '127.0.0.1') {
    throw new Error('The navigation proxy requires the local HTTP preview')
  }
  const upstreamRequests = new Set<ClientRequest>()
  const server = createServer((incoming, response) => {
    const requestPath = incoming.url ?? '/'
    if (!requestPath.startsWith('/') || requestPath.startsWith('//') || requestPath.includes('\\')) {
      response.writeHead(400)
      response.end('Only local origin-form paths are supported')
      return
    }

    // Cloudflare canonicalizes this file URL, including Workbox revision queries.
    if (requestPath.split('?')[0] === '/index.html') {
      response.writeHead(308, { Location: '/' })
      response.end()
      return
    }

    const upstream = forwardRequest(
      {
        hostname: '127.0.0.1',
        port: preview.port,
        path: requestPath,
        method: incoming.method,
        headers: { ...incoming.headers, host: preview.host },
      },
      (upstreamResponse) => {
        response.writeHead(upstreamResponse.statusCode ?? 502, upstreamResponse.headers)
        upstreamResponse.pipe(response)
      },
    )
    upstreamRequests.add(upstream)
    upstream.on('close', () => upstreamRequests.delete(upstream))
    upstream.on('error', (error) => {
      if (response.destroyed) return
      if (response.headersSent) {
        response.destroy(error)
      } else {
        response.writeHead(502)
        response.end('Preview proxy request failed')
      }
    })
    incoming.on('aborted', () => upstream.destroy())
    incoming.pipe(upstream)
  })

  await new Promise<void>((resolve, reject) => {
    server.once('error', reject)
    server.listen(0, '127.0.0.1', resolve)
  })
  const address = server.address()
  if (!address || typeof address === 'string') throw new Error('Preview proxy did not obtain a TCP port')

  return {
    origin: `http://127.0.0.1:${address.port}`,
    close: () =>
      new Promise<void>((resolve, reject) => {
        server.close((error) => (error ? reject(error) : resolve()))
        server.closeAllConnections()
        for (const upstream of upstreamRequests) upstream.destroy()
      }),
  }
}

test('opens Google photo links after the service worker app shell cache is evicted', async ({
  page,
  request,
  baseURL,
}) => {
  test.skip(process.env.PLAYWRIGHT_PRODUCTION !== 'true', 'Requires the generated production service worker')
  expect(baseURL).toBeTruthy()
  const manifestResponse = await request.get('/photos-manifest.json')
  expect(manifestResponse.ok()).toBe(true)
  const manifest = (await manifestResponse.json()) as { data: Array<{ id: string }> }
  const photo = manifest.data[0]
  expect(photo).toBeDefined()
  const photoPath = `/photos/${encodeURIComponent(photo!.id)}/`
  const proxy = await createCanonicalRedirectProxy(baseURL!)

  try {
    const redirectResponse = await request.get(`${proxy.origin}/index.html?__WB_REVISION__=fixture`, {
      maxRedirects: 0,
    })
    expect(redirectResponse.status()).toBe(308)
    expect(redirectResponse.headers().location).toBe('/')

    for (const requestPath of [baseURL!, `//${new URL(baseURL!).host}/`]) {
      const status = await new Promise<number | undefined>((resolve, reject) => {
        const proxyRequest = forwardRequest(
          { hostname: '127.0.0.1', port: new URL(proxy.origin).port, path: requestPath },
          (response) => {
            response.once('end', () => resolve(response.statusCode))
            response.resume()
          },
        )
        proxyRequest.once('error', reject)
        proxyRequest.end()
      })
      expect(status).toBe(400)
    }

    await page.goto(proxy.origin)
    await expect
      .poll(() => page.evaluate(async () => Boolean((await navigator.serviceWorker.getRegistration())?.active)))
      .toBe(true)
    await page.reload()
    await expect.poll(() => page.evaluate(() => Boolean(navigator.serviceWorker.controller))).toBe(true)

    const photoURL = `${proxy.origin}${photoPath}`
    const warmResponse = await page.goto(photoURL, { referer: 'https://www.google.com/' })
    expect(warmResponse?.status()).toBe(200)
    expect(warmResponse?.fromServiceWorker()).toBe(true)
    await expect(page.getByRole('dialog')).toBeVisible()

    const removedShellEntries = await page.evaluate(async () => {
      const removed: string[] = []
      for (const name of await caches.keys()) {
        if (!name.includes('workbox-precache')) continue
        const cache = await caches.open(name)
        for (const entry of await cache.keys()) {
          const { pathname } = new URL(entry.url)
          if ((pathname === '/' || pathname === '/index.html') && (await cache.delete(entry))) {
            removed.push(entry.url)
          }
        }
      }
      return removed
    })
    expect(removedShellEntries).toHaveLength(1)

    const recoveredResponse = await page.goto(photoURL, { referer: 'https://www.google.com/' })
    expect(recoveredResponse?.status()).toBe(200)
    expect(recoveredResponse?.fromServiceWorker()).toBe(true)
    await expect(page.getByRole('dialog')).toBeVisible()
    await expect(page).toHaveURL(photoURL)
    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href')
    expect(new URL(canonical!).pathname).toBe(photoPath)
    expect(await page.evaluate(() => Boolean(navigator.serviceWorker.controller))).toBe(true)

    const reloadResponse = await page.reload()
    expect(reloadResponse?.status()).toBe(200)
    expect(reloadResponse?.fromServiceWorker()).toBe(true)
    await expect(page.getByRole('dialog')).toBeVisible()
    await expect(page).toHaveURL(photoURL)
  } finally {
    await proxy.close()
  }
})
