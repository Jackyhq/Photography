import { renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { usePageMeta } from './usePageMeta'

vi.mock('~/config', () => ({
  siteConfig: {
    name: "Jackywhq's Photography",
    title: "Jackywhq's Photography",
    description: 'Gallery description',
    url: 'https://photo.jackyw.cn',
  },
}))

interface HookProps {
  title: string
  image: string
  imageWidth?: number
  imageHeight?: number
}

describe('usePageMeta', () => {
  beforeEach(() => {
    document.head.innerHTML = `
      <meta property="og:image" content="https://photo.jackyw.cn/home.png">
      <meta property="og:image:alt" content="Gallery home">
      <meta property="og:image:width" content="1200">
      <meta property="og:image:height" content="630">
      <meta property="twitter:image" content="https://photo.jackyw.cn/home.png">
      <meta property="twitter:image:alt" content="Gallery home">
    `
  })

  it('keeps image metadata synchronized and removes dimensions that no longer apply', () => {
    const initialProps: HookProps = {
      title: 'Photo one',
      image: '/photo.jpg',
      imageWidth: 1600,
      imageHeight: 900,
    }
    const { rerender, unmount } = renderHook(
      (props: HookProps) =>
        usePageMeta({
          ...props,
          url: '/photos/photo-1/',
        }),
      { initialProps },
    )

    expect(document.querySelector('meta[property="og:image:alt"]')?.getAttribute('content')).toBe(
      "Photo one | Jackywhq's Photography",
    )
    expect(document.querySelector('meta[property="og:image:width"]')?.getAttribute('content')).toBe('1600')
    expect(document.querySelector('meta[property="og:image:height"]')?.getAttribute('content')).toBe('900')

    rerender({ title: 'Photo two', image: '/photo.webp' })

    expect(document.querySelector('meta[property="og:image:alt"]')?.getAttribute('content')).toBe(
      "Photo two | Jackywhq's Photography",
    )
    expect(document.querySelector('meta[property="twitter:image:alt"]')?.getAttribute('content')).toBe(
      "Photo two | Jackywhq's Photography",
    )
    expect(document.querySelector('meta[property="og:image:width"]')).toBeNull()
    expect(document.querySelector('meta[property="og:image:height"]')).toBeNull()

    unmount()

    expect(document.querySelector('meta[property="og:image:alt"]')?.getAttribute('content')).toBe('Gallery home')
    expect(document.querySelector('meta[property="og:image:width"]')?.getAttribute('content')).toBe('1200')
    expect(document.querySelector('meta[property="og:image:height"]')?.getAttribute('content')).toBe('630')
  })
})
