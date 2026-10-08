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
      component: () =>
        React.createElement(
          'div',
          null,
          React.createElement('h1', null, 'Architecture page'),
          React.createElement('h2', { id: 'first-section' }, 'First section'),
          React.createElement('h2', { id: 'second-section' }, 'Second section'),
        ),
    },
  ]
  return { routes, default: routes }
})
vi.mock('./components', () => ({ MDX: ({ content }: { content: React.ReactNode }) => content }))
vi.mock('./components/DocumentFooter', () => ({ DocumentFooter: () => null }))
vi.mock('./toc-data', () => {
  const items = [
    { id: 'first-section', text: 'First section', level: 2 },
    { id: 'second-section', text: 'Second section', level: 2 },
  ]
  return { getTocByPath: (path: string) => (path === '/architecture' ? items : []) }
})

const originalScrollTo = HTMLElement.prototype.scrollTo
const originalScrollIntoView = HTMLElement.prototype.scrollIntoView
const originalScrollRestoration = window.history.scrollRestoration

beforeEach(() => {
  window.history.replaceState(null, '', '/')
  window.history.scrollRestoration = 'auto'
  HTMLElement.prototype.scrollTo = vi.fn()
  HTMLElement.prototype.scrollIntoView = vi.fn()
  vi.stubGlobal(
    'IntersectionObserver',
    class {
      observe() {}
      unobserve() {}
      disconnect() {}
    },
  )
})

afterEach(() => {
  cleanup()
  document.head.querySelectorAll('[data-docs-meta]').forEach((element) => element.remove())
  HTMLElement.prototype.scrollTo = originalScrollTo
  HTMLElement.prototype.scrollIntoView = originalScrollIntoView
  window.history.scrollRestoration = originalScrollRestoration
  vi.unstubAllGlobals()
  vi.restoreAllMocks()
})

describe('documentation navigation', () => {
  it.each(['auto', 'manual'] as const)(
    'owns scrolling while mounted and restores the previous %s mode',
    (previousMode) => {
      window.history.scrollRestoration = previousMode
      const { unmount } = render(<App url="/" />)
      expect(window.history.scrollRestoration).toBe('manual')

      unmount()
      expect(window.history.scrollRestoration).toBe(previousMode)
    },
  )

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

  it('makes the closed mobile menu inert and restores its toggle when closing focused content', () => {
    render(<App url="/" />)
    const toggle = screen.getByRole('button', { name: 'Toggle navigation' })
    const menu = document.querySelector('#mobile-navigation')!
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    expect(menu).toHaveAttribute('inert')
    expect(menu).toHaveAttribute('aria-hidden', 'true')

    fireEvent.click(toggle)
    expect(toggle).toHaveAttribute('aria-expanded', 'true')
    expect(menu).not.toHaveAttribute('inert')
    expect(menu).toHaveAttribute('aria-hidden', 'false')
    menu.querySelector('a')!.focus()

    fireEvent.click(toggle)
    expect(toggle).toHaveFocus()
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    expect(menu).toHaveAttribute('inert')
    expect(menu).toHaveAttribute('aria-hidden', 'true')
  })

  it('keeps TOC fragments in history and restores scrolling when back and forward stay on the same page', async () => {
    window.history.replaceState(null, '', '/architecture/')
    render(<App url="/architecture/" />)
    const first = screen.getByRole('heading', { name: 'First section' })
    const second = screen.getByRole('heading', { name: 'Second section' })
    const firstScroll = vi.fn()
    const secondScroll = vi.fn()
    first.scrollIntoView = firstScroll
    second.scrollIntoView = secondScroll

    fireEvent.click(screen.getByRole('link', { name: 'First section' }))
    await waitFor(() => expect(firstScroll).toHaveBeenCalled())
    expect(window.location.hash).toBe('#first-section')
    fireEvent.click(screen.getByRole('link', { name: 'Second section' }))
    await waitFor(() => expect(secondScroll).toHaveBeenCalled())
    expect(window.location.hash).toBe('#second-section')
    firstScroll.mockClear()
    secondScroll.mockClear()

    await act(async () => window.history.back())
    await waitFor(() => expect(window.location.hash).toBe('#first-section'))
    await waitFor(() => expect(firstScroll).toHaveBeenCalled())
    expect(window.location.pathname).toBe('/architecture/')
    await act(async () => window.history.forward())
    await waitFor(() => expect(window.location.hash).toBe('#second-section'))
    await waitFor(() => expect(secondScroll).toHaveBeenCalled())
  })

  it('navigates and closes the mobile TOC on an ordinary fragment click', async () => {
    window.history.replaceState(null, '', '/architecture/')
    render(<App url="/architecture/" />)
    fireEvent.click(screen.getByRole('button', { name: 'Toggle TOC' }))
    const mobileLink = screen.getAllByRole('link', { name: 'First section' })[1]
    const target = screen.getByRole('heading', { name: 'First section' })
    const scroll = vi.fn()
    target.scrollIntoView = scroll

    fireEvent.click(mobileLink)
    expect(mobileLink).not.toBeInTheDocument()
    expect(window.location.hash).toBe('#first-section')
    await waitFor(() => expect(scroll).toHaveBeenCalledWith({ behavior: 'smooth' }))
  })

  it.each([{ ctrlKey: true }, { metaKey: true }, { shiftKey: true }, { altKey: true }])(
    'preserves native TOC clicks with modifier %o without closing the mobile TOC',
    (modifier) => {
      window.history.replaceState(null, '', '/architecture/')
      render(<App url="/architecture/" />)
      fireEvent.click(screen.getByRole('button', { name: 'Toggle TOC' }))
      const links = screen.getAllByRole('link', { name: 'First section' })
      const mobileLink = links[1]
      let preventedByApp: boolean | undefined
      window.addEventListener(
        'click',
        (event) => {
          preventedByApp = event.defaultPrevented
          // Suppress jsdom's default navigation only after the application handled the event.
          event.preventDefault()
        },
        { once: true },
      )

      mobileLink.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, ...modifier }))
      expect(preventedByApp).toBe(false)
      expect(window.location.hash).toBe('')
      expect(mobileLink).toBeInTheDocument()
    },
  )

  it('renders unknown routes as noindex pages without a canonical URL', () => {
    window.history.replaceState(null, '', '/missing-page/')
    render(<App url="/missing-page/" />)
    expect(screen.getByRole('heading', { name: '404' })).toBeInTheDocument()
    expect(document.querySelector('meta[name="robots"]')?.getAttribute('content')).toBe('noindex, follow')
    expect(document.querySelector('link[rel="canonical"]')).toBeNull()
    expect(document.querySelector('script[type="application/ld+json"]')).toBeNull()
  })
})
