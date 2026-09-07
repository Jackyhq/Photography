import { describe, expect, it } from 'vitest'

import { buildGlobRoutes } from './route-builder'

describe('route-builder', () => {
  it('builds grouped layouts, index routes, and dynamic params', () => {
    const routes = buildGlobRoutes({
      './pages/(main)/layout.tsx': async () => ({}),
      './pages/(main)/index.tsx': async () => ({}),
      './pages/(main)/photos/[photoId]/index.tsx': async () => ({}),
      './pages/explory/index.tsx': async () => ({}),
    })

    const main = routes.find((route) => route.handle?.fs === './pages/(main)')
    expect(main?.path).toBe('')
    expect(main?.children?.some((route) => route.path === '')).toBe(true)

    const photos = main?.children?.find((route) => route.path === 'photos')
    expect(photos?.handle?.notFound).toBe(true)
    const photoId = photos?.children?.find((route) => route.path === ':photoId')
    expect(photoId?.children?.some((route) => route.path === '')).toBe(true)
    expect(photoId?.children?.find((route) => route.path === '')?.handle?.notFound).not.toBe(true)

    const explory = routes.find((route) => route.path === 'explory')
    expect(explory?.children?.some((route) => route.path === '')).toBe(true)
  })
})
