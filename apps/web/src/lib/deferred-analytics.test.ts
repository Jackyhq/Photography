import { JSDOM } from 'jsdom'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import html from '../../index.html?raw'
import { scheduleDeferredAnalytics } from './deferred-analytics'

const analyticsScripts = () => document.querySelectorAll('script[src*="googletagmanager.com/gtag/js"]')

describe('deferred analytics', () => {
  const callbacks: IdleRequestCallback[] = []
  const requestIdleCallback = vi.fn((callback: IdleRequestCallback) => {
    callbacks.push(callback)
    return callbacks.length
  })
  const cancelIdleCallback = vi.fn()
  const runIdleCallbacks = () => {
    for (const callback of callbacks.splice(0)) callback({ didTimeout: false, timeRemaining: () => 10 })
  }

  beforeEach(() => {
    vi.useFakeTimers()
    vi.spyOn(document, 'readyState', 'get').mockReturnValue('loading')
    vi.stubGlobal('requestIdleCallback', requestIdleCallback)
    vi.stubGlobal('cancelIdleCallback', cancelIdleCallback)
    document.head.innerHTML = '<script id="analytics-bootstrap" data-measurement-id="G-TEST"></script>'
  })

  afterEach(() => {
    document.head.innerHTML = ''
    callbacks.length = 0
    vi.clearAllMocks()
    vi.restoreAllMocks()
    vi.unstubAllGlobals()
    vi.useRealTimers()
  })

  it('waits for window load and idle without replacing queued commands', () => {
    const queue = [
      ['config', 'G-TEST'],
      ['event', 'photo_open'],
    ]
    vi.stubGlobal('dataLayer', queue)
    const cleanup = scheduleDeferredAnalytics()

    expect(requestIdleCallback).not.toHaveBeenCalled()
    expect(analyticsScripts()).toHaveLength(0)
    window.dispatchEvent(new Event('load'))
    expect(requestIdleCallback).toHaveBeenCalledWith(expect.any(Function), { timeout: 3000 })
    expect(analyticsScripts()).toHaveLength(0)

    runIdleCallbacks()
    const script = analyticsScripts()[0] as HTMLScriptElement
    expect(script.src).toBe('https://www.googletagmanager.com/gtag/js?id=G-TEST')
    expect(script.async).toBe(true)
    expect(Reflect.get(window, 'dataLayer')).toBe(queue)
    expect(queue).toEqual([
      ['config', 'G-TEST'],
      ['event', 'photo_open'],
    ])
    cleanup()
  })

  it('loads only once across concurrent schedules and later mounts', () => {
    vi.spyOn(document, 'readyState', 'get').mockReturnValue('complete')
    const firstCleanup = scheduleDeferredAnalytics()
    const secondCleanup = scheduleDeferredAnalytics()
    runIdleCallbacks()

    expect(analyticsScripts()).toHaveLength(1)
    const thirdCleanup = scheduleDeferredAnalytics()
    expect(requestIdleCallback).toHaveBeenCalledTimes(2)
    firstCleanup()
    secondCleanup()
    thirdCleanup()
    expect(analyticsScripts()).toHaveLength(1)
  })

  it('cancels load listeners and idle callbacks while allowing a remount', () => {
    const beforeLoadCleanup = scheduleDeferredAnalytics()
    beforeLoadCleanup()
    window.dispatchEvent(new Event('load'))
    expect(requestIdleCallback).not.toHaveBeenCalled()

    const beforeIdleCleanup = scheduleDeferredAnalytics()
    window.dispatchEvent(new Event('load'))
    beforeIdleCleanup()
    expect(cancelIdleCallback).toHaveBeenCalledWith(1)
    runIdleCallbacks()
    expect(analyticsScripts()).toHaveLength(0)

    const remountCleanup = scheduleDeferredAnalytics()
    window.dispatchEvent(new Event('load'))
    runIdleCallbacks()
    expect(analyticsScripts()).toHaveLength(1)
    remountCleanup()
  })

  it('uses a cancellable bounded timer when idle callbacks are unavailable', () => {
    vi.stubGlobal('requestIdleCallback', null)
    vi.spyOn(document, 'readyState', 'get').mockReturnValue('complete')
    const cleanup = scheduleDeferredAnalytics()
    vi.advanceTimersByTime(2999)
    expect(analyticsScripts()).toHaveLength(0)
    cleanup()
    vi.advanceTimersByTime(1)
    expect(analyticsScripts()).toHaveLength(0)

    const remountCleanup = scheduleDeferredAnalytics()
    vi.advanceTimersByTime(3000)
    expect(analyticsScripts()).toHaveLength(1)
    remountCleanup()
  })

  it('queues the initial page URL and title before navigation without an eager network script', () => {
    const bootstrap = html.match(/<script id="analytics-bootstrap"[\s\S]*?<\/script>/)?.[0]
    expect(bootstrap).toBeDefined()
    expect(html.indexOf('</title>')).toBeLessThan(html.indexOf('<script id="analytics-bootstrap"'))
    expect(html).not.toMatch(/<script[^>]+src="https:\/\/www\.googletagmanager\.com/)
    const dom = new JSDOM(`<title>First photo</title>${bootstrap}`, {
      url: 'https://photo.example.com/photos/first/?source=gallery',
      referrer: 'https://example.com/',
      runScripts: 'dangerously',
    })

    try {
      dom.window.history.pushState({}, '', '/photos/next/')
      dom.window.document.title = 'Next photo'
      dom.window.gtag('event', 'photo_open')
      const commands = dom.window.dataLayer.map((command: IArguments) => Array.from(command))
      expect(commands[1]).toEqual([
        'config',
        'G-5QBS0G1NGJ',
        {
          page_location: 'https://photo.example.com/photos/first/?source=gallery',
          page_referrer: 'https://example.com/',
          page_title: 'First photo',
        },
      ])
      expect(commands[2]).toEqual(['event', 'photo_open'])
    } finally {
      dom.window.close()
    }
  })
})
