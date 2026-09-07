import type { PhotoManifestItem } from '@afilmory/builder/photo-types'
import { fireEvent, render, screen } from '@testing-library/react'
import * as React from 'react'
import { StrictMode } from 'react'
import { Link, MemoryRouter } from 'react-router'
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
  ],
}))

vi.mock('~/config', () => ({ siteConfig: config }))
vi.mock('@afilmory/data', () => ({
  photoLoader: { getPhoto: (id: string) => photos.find((photo) => photo.id === id) },
}))
vi.mock('react-i18next', () => ({ useTranslation: vi.fn(() => ({ i18n: { language: 'zh-CN' } })) }))
vi.mock('./usePhotoTextUpdates', () => ({ usePhotoTextUpdates: vi.fn(() => 0) }))

function TestRoutes() {
  useRoutePageMeta()
  return (
    <>
      <Link to="/photos/next/">Next</Link>
      <Link to="/">Home</Link>
      <Link to="/explory">Map</Link>
    </>
  )
}

const getMeta = (property: string) => document.querySelector<HTMLMetaElement>(`meta[property="${property}"]`)?.content
const getJsonLd = () => JSON.parse(document.querySelector('script[data-afilmory-page-jsonld]')?.textContent ?? '{}')

afterEach(() => {
  document.head.innerHTML = ''
})

describe('route page metadata', () => {
  it('keeps direct photo, next photo, home and map head consistent, including structured data and default sharing image', () => {
    const baseHtml =
      '<html><head><title>Home</title><meta name="afilmory:site-image" content="https://photos.example.com/site.png"></head><body></body></html>'
    const staticHtml = applyPhotoPageMeta(baseHtml, createPhotoPageMeta(photos[0] as PhotoManifestItem, config))
    document.head.innerHTML = new DOMParser().parseFromString(staticHtml, 'text/html').head.innerHTML

    const { unmount } = render(
      <StrictMode>
        <MemoryRouter initialEntries={['/photos/first/']}>
          <TestRoutes />
        </MemoryRouter>
      </StrictMode>,
    )
    expect(document.title).toBe('First photo | Gallery')
    expect(getMeta('og:image')).toBe('https://photos.example.com/first.jpg')
    expect(getJsonLd().url).toBe('https://photos.example.com/photos/first/')

    fireEvent.click(screen.getByText('Next'))
    expect(document.title).toBe('Next photo | Gallery')
    expect(getMeta('og:description')).toBe('Next description')
    expect(getMeta('og:url')).toBe('https://photos.example.com/photos/next/')
    expect(getJsonLd().contentUrl).toBe('https://photos.example.com/next.jpg')

    fireEvent.click(screen.getByText('Home'))
    expect(document.title).toBe(config.title)
    expect(getMeta('og:url')).toBe(config.url)
    expect(getMeta('og:description')).toBe(config.description)
    expect(getMeta('og:image')).toBe('https://photos.example.com/site.png')
    expect(getMeta('twitter:image')).toBe('https://photos.example.com/site.png')
    expect(getJsonLd()['@type']).toBe('WebSite')
    expect(getJsonLd()).not.toHaveProperty('contentUrl')

    fireEvent.click(screen.getByText('Map'))
    expect(getMeta('og:url')).toBe('https://photos.example.com/explory/')
    expect(document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.href).toBe(getMeta('og:url'))
    expect(getJsonLd()['@type']).toBe('WebPage')
    expect(document.querySelectorAll('script[type="application/ld+json"]')).toHaveLength(1)
    expect(document.querySelectorAll('link[rel="canonical"]')).toHaveLength(1)
    unmount()
  })
})
