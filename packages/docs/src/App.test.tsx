// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'

import { act, cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import * as React from 'react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import App from './App'
import { DocsAnchor } from './components/MDX'
import { docsSite } from './site'

vi.mock('./routes', () => {
  const routes = [
    {
      path: '/',
      title: 'Overview',
      meta: { description: 'Overview description' },
      component: () => React.createElement('h1', null, 'Overview page'),
    },
    {
      path: '/architecture',
      title: 'Architecture',
      meta: { description: 'Architecture description' },
      component: () => React.createElement('h1', null, 'Architecture page'),
    },
  ]
  return { routes, default: routes }
})
vi.mock('./components', () => ({ MDX: ({ content }: { content: React.ReactNode }) => content }))
vi.mock('./components/DocumentFooter', () => ({ DocumentFooter: () => null }))
vi.mock('./components/TableOfContents', () => ({ TableOfContents: () => null }))
vi.mock('./components/MobileTableOfContents', () => ({ MobileTableOfContents: () => null }))

const originalScrollTo = HTMLElement.prototype.scrollTo
const originalScrollIntoView = HTMLElement.prototype.scrollIntoView

beforeEach(() => {
  window.history.replaceState(null, '', '/')
  HTMLElement.prototype.scrollTo = vi.fn()
  HTMLElement.prototype.scrollIntoView = vi.fn()
})

afterEach(() => {
  cleanup()
  document.head.querySelectorAll('[data-docs-meta]').forEach((element) => element.remove())
  HTMLElement.prototype.scrollTo = originalScrollTo
  HTMLElement.prototype.scrollIntoView = originalScrollIntoView
  vi.restoreAllMocks()
})

describe('documentation navigation', () => {
  it('canonicalizes document links in rendered content while preserving fragments, assets and external links', () => {
    const destinations = [
      '/architecture?from=guide#details',
      '/files/manual.pdf',
      '#section',
      'https://example.com/guide',
    ]
    render(
      <div>
        {destinations.map((href) => (
          <DocsAnchor key={href} href={href}>
            {href}
          </DocsAnchor>
        ))}
      </div>,
    )
    expect(screen.getAllByRole('link').map((link) => link.getAttribute('href'))).toEqual([
      '/architecture/?from=guide#details',
      '/files/manual.pdf',
      '#section',
      'https://example.com/guide',
    ])
  })

  it('uses real canonical links and keeps content and metadata in sync across back and forward', async () => {
    render(<App url="/" />)
    const architectureLink = screen.getAllByRole('link', { name: 'Architecture' })[0]
    expect(architectureLink.getAttribute('href')).toBe('/architecture/')
    fireEvent.click(architectureLink)

    expect(screen.getByRole('heading', { name: 'Architecture page' })).toBeInTheDocument()
    expect(window.location.pathname).toBe('/architecture/')
    expect(document.title).toBe(`Architecture | ${docsSite.name}`)
    expect(document.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe(`${docsSite.url}/architecture/`)
    expect(document.querySelector('meta[property="og:url"]')?.getAttribute('content')).toBe(
      `${docsSite.url}/architecture/`,
    )
    expect(document.querySelector('meta[name="description"]')?.getAttribute('content')).toBe('Architecture description')

    await act(async () => window.history.back())
    await waitFor(() => expect(screen.getByRole('heading', { name: 'Overview page' })).toBeInTheDocument())
    expect(window.location.pathname).toBe('/')
    expect(document.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe(`${docsSite.url}/`)
    expect(document.querySelector('meta[name="description"]')?.getAttribute('content')).toBe('Overview description')

    await act(async () => window.history.forward())
    await waitFor(() => expect(screen.getByRole('heading', { name: 'Architecture page' })).toBeInTheDocument())
    expect(document.querySelectorAll('link[rel="canonical"]')).toHaveLength(1)
    expect(JSON.parse(document.querySelector('script[type="application/ld+json"]')!.textContent!).url).toBe(
      `${docsSite.url}/architecture/`,
    )
  })

  it('normalizes a direct directory route while preserving query and fragment', () => {
    window.history.replaceState(null, '', '/architecture?from=search#section')
    render(<App url="/architecture" />)
    expect(screen.getByRole('heading', { name: 'Architecture page' })).toBeInTheDocument()
    expect(window.location.pathname).toBe('/architecture/')
    expect(window.location.search).toBe('?from=search')
    expect(window.location.hash).toBe('#section')
    expect(screen.getAllByRole('link', { name: 'Architecture' })[0]).toHaveAttribute('aria-current', 'page')
  })

  it('preserves modified link clicks for native new-tab navigation', () => {
    render(<App url="/" />)
    const link = screen.getAllByRole('link', { name: 'Architecture' })[0]
    const event = new MouseEvent('click', { bubbles: true, cancelable: true, ctrlKey: true })
    let preventedByApp: boolean | undefined
    window.addEventListener(
      'click',
      (receivedEvent) => {
        preventedByApp = receivedEvent.defaultPrevented
        // jsdom cannot open another document; suppress only its native default action.
        receivedEvent.preventDefault()
      },
      { once: true },
    )
    link.dispatchEvent(event)
    expect(preventedByApp).toBe(false)
    expect(window.location.pathname).toBe('/')
    expect(screen.getByRole('heading', { name: 'Overview page' })).toBeInTheDocument()
  })

  it('renders unknown routes as noindex pages without a canonical URL', () => {
    window.history.replaceState(null, '', '/missing-page/')
    render(<App url="/missing-page/" />)
    expect(screen.getByRole('heading', { name: '404' })).toBeInTheDocument()
    expect(document.querySelector('meta[name="robots"]')?.getAttribute('content')).toBe('noindex, follow')
    expect(document.querySelector('link[rel="canonical"]')).toBeNull()
    expect(document.querySelector('script[type="application/ld+json"]')).toBeNull()
  })
})
