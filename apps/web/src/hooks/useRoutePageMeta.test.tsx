import type { PhotoManifestItem } from '@afilmory/builder/photo-types'
import { act, cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import * as React from 'react'
import { StrictMode } from 'react'
import { createMemoryRouter, Link, RouterProvider } from 'react-router'
import { afterEach, describe, expect, it, vi } from 'vitest'

import type { SiteConfig } from '../../../../site.config'
import { applyPhotoPageMeta, createPhotoPageMeta } from '../../plugins/vite/photo-page-meta'
import { useRoutePageMeta } from './useRoutePageMeta'

const { config, photos } = vi.hoisted(() => ({
  config: {
    name: 'Gallery',
    title: 'Home gallery',
    description: 'Home description',
    url: 'https://photos.example.com/',
    accentColor: '#000',
    author: { name: 'Jacky', url: 'https://example.com/' },
  } satisfies SiteConfig,
  photos: [
    {
      id: 'first',
      title: 'First photo',
      description: 'First description',
      originalUrl: '/first.jpg',
      thumbnailUrl: '/first.webp',
      thumbnailWebpSrcSet: '/first.webp 640w',
      dateTaken: '2026-01-02T03:04:05Z',
      width: 1200,
      height: 800,
    },
    {
      id: 'next',
      title: 'Next photo',
      description: 'Next description',
      originalUrl: '/next.jpg',
      thumbnailUrl: '/next.webp',
      thumbnailWebpSrcSet: '/next.webp 640w',
      dateTaken: '2026-01-03T03:04:05Z',
      width: 1200,
      height: 800,
    },
    {
      id: 'encoded/name with space',
      title: 'Encoded photo',
      originalUrl: '/encoded.jpg',
      thumbnailUrl: '/encoded.webp',
      width: 1200,
      height: 800,
    },
  ],
}))

vi.mock('~/config', () => ({ siteConfig: config }))
vi.mock('@afilmory/data', () => ({
  photoLoader: { getPhoto: (id: string) => photos.find((photo) => photo.id === id) },
}))
vi.mock('react-i18next', () => ({ useTranslation: vi.fn(() => ({ i18n: { language: 'zh-CN' } })) }))
vi.mock('./usePhotoTextUpdates', () => ({ usePhotoTextUpdates: vi.fn(() => 0) }))

function TestRoutes() {
  const isNotFound = useRoutePageMeta()
  return (
    <>
      <span>{isNotFound ? 'Not found route' : 'Valid route'}</span>
      <Link to="/photos/next/">Next</Link>
      <Link to="/">Home</Link>
      <Link to="/explory">Map</Link>
    </>
  )
}

function renderRoute(pathname: string, includeManifest = false) {
  const router = createMemoryRouter(
    [
      {
        path: '/',
        element: <TestRoutes />,
        children: [
          { index: true, element: <div /> },
          { path: 'photos/:photoId', element: <div /> },
          { path: 'explory', element: <div /> },
          ...(includeManifest ? [{ path: 'manifest', element: <div /> }] : []),
          { path: '*', element: <div />, handle: { notFound: true } },
        ],
      },
    ],
    { initialEntries: [pathname] },
  )
  const view = render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  )
  return { ...view, router }
}

const getMeta = (property: string) => document.querySelector<HTMLMetaElement>(`meta[property="${property}"]`)?.content
const getJsonLd = () => JSON.parse(document.querySelector('script[data-afilmory-page-jsonld]')?.textContent ?? '{}')

afterEach(() => {
  cleanup()
  document.head.innerHTML = ''
})

describe('route page metadata', () => {
  it('keeps direct photo, next photo, home and map head consistent, including structured data and default sharing image', async () => {
    const baseHtml =
      '<html><head><title>Home</title><meta name="afilmory:site-image" content="https://photos.example.com/site.png"></head><body></body></html>'
    const staticHtml = applyPhotoPageMeta(baseHtml, createPhotoPageMeta(photos[0] as PhotoManifestItem, config))
    document.head.innerHTML = new DOMParser().parseFromString(staticHtml, 'text/html').head.innerHTML

    const { unmount } = renderRoute('/photos/first/')
    expect(document.title).toBe('First photo | Gallery')
    expect(getMeta('og:image')).toBe('https://photos.example.com/first.jpg')
    expect(getJsonLd().url).toBe('https://photos.example.com/photos/first/')

    fireEvent.click(screen.getByText('Next'))
    await waitFor(() => expect(document.title).toBe('Next photo | Gallery'))
    expect(getMeta('og:description')).toBe('Next description')
    expect(getMeta('og:url')).toBe('https://photos.example.com/photos/next/')
    expect(getJsonLd().contentUrl).toBe('https://photos.example.com/next.jpg')

    fireEvent.click(screen.getByText('Home'))
    await waitFor(() => expect(document.title).toBe(config.title))
    expect(getMeta('og:url')).toBe(config.url)
    expect(getMeta('og:description')).toBe(config.description)
    expect(getMeta('og:image')).toBe('https://photos.example.com/site.png')
    expect(getMeta('twitter:image')).toBe('https://photos.example.com/site.png')
    expect(getJsonLd()['@type']).toBe('WebSite')
    expect(getJsonLd()).not.toHaveProperty('contentUrl')

    fireEvent.click(screen.getByText('Map'))
    await waitFor(() => expect(getMeta('og:url')).toBe('https://photos.example.com/explory/'))
    expect(document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.href).toBe(getMeta('og:url'))
    expect(getJsonLd()['@type']).toBe('WebPage')
    expect(document.querySelectorAll('script[type="application/ld+json"]')).toHaveLength(1)
    expect(document.querySelectorAll('link[rel="canonical"]')).toHaveLength(1)
    unmount()
  })

  it.each(['/unknown/path', '/photos/missing/', '/photos/first/extra/', '/manifest', '/photos/'])(
    'marks a direct invalid route as noindex and clears inherited metadata: %s',
    (pathname) => {
      const staticHtml = applyPhotoPageMeta(
        '<html><head><title>Home</title></head><body></body></html>',
        createPhotoPageMeta(photos[0] as PhotoManifestItem, config),
      )
      document.head.innerHTML = new DOMParser().parseFromString(staticHtml, 'text/html').head.innerHTML
      renderRoute(pathname)

      expect(screen.getByText('Not found route')).toBeVisible()
      expect(document.title).toBe('Page not found | Gallery')
      expect(document.querySelector('meta[name="robots"]')).toHaveAttribute('content', 'noindex, follow')
      expect(document.querySelector('link[rel="canonical"]')).toBeNull()
      expect(document.querySelector('script[data-afilmory-page-jsonld]')).toBeNull()
      expect(getMeta('og:url')).toBeUndefined()
      expect(getMeta('og:image')).toBeUndefined()
      expect(getMeta('twitter:url')).toBeUndefined()
      expect(getMeta('twitter:image')).toBeUndefined()
    },
  )

  it('restores indexing and complete metadata across invalid routes and browser history', async () => {
    const { router } = renderRoute('/photos/first/')
    await act(() => router.navigate('/photos/missing/'))
    expect(document.querySelector('meta[name="robots"]')).toHaveAttribute('content', 'noindex, follow')

    await act(() => router.navigate('/'))
    expect(document.querySelector('meta[name="robots"]')).toBeNull()
    expect(getJsonLd()['@type']).toBe('WebSite')
    expect(document.querySelector('link[rel="canonical"]')).toHaveAttribute('href', config.url)

    await act(() => router.navigate(-1))
    expect(document.querySelector('meta[name="robots"]')).toHaveAttribute('content', 'noindex, follow')
    expect(document.querySelector('link[rel="canonical"]')).toBeNull()
    expect(document.querySelector('script[data-afilmory-page-jsonld]')).toBeNull()

    await act(() => router.navigate(1))
    expect(document.querySelector('meta[name="robots"]')).toBeNull()
    expect(getJsonLd()['@type']).toBe('WebSite')

    await act(() => router.navigate('/unknown'))
    await act(() => router.navigate('/photos/next/'))
    expect(document.title).toBe('Next photo | Gallery')
    expect(getJsonLd().contentUrl).toBe('https://photos.example.com/next.jpg')
    expect(document.querySelector('meta[name="robots"]')).toBeNull()
    expect(document.querySelectorAll('link[rel="canonical"]')).toHaveLength(1)
    expect(document.querySelectorAll('script[data-afilmory-page-jsonld]')).toHaveLength(1)
  })

  it('keeps the manifest page indexable when the development route exists', () => {
    renderRoute('/manifest', true)
    expect(screen.getByText('Valid route')).toBeVisible()
    expect(document.querySelector('meta[name="robots"]')).toBeNull()
    expect(document.querySelector('link[rel="canonical"]')).toHaveAttribute(
      'href',
      'https://photos.example.com/manifest/',
    )
  })

  it.each(['/PHOTOS/first/', '/photos/encoded%2Fname%20with%20space/'])(
    'uses the router match and decoded parameters for valid photos: %s',
    (pathname) => {
      renderRoute(pathname)
      expect(screen.getByText('Valid route')).toBeVisible()
      expect(getJsonLd()['@type']).toBe('ImageObject')
      expect(document.querySelector('meta[name="robots"]')).toBeNull()
    },
  )
})
