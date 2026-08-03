import { describe, expect, it, vi } from 'vitest'

import { openInstagramShare } from './instagram-share'

const shareData = {
  title: 'Photo',
  text: 'A photo',
  url: 'https://photo.example/photos/1',
}

describe('Instagram sharing', () => {
  it('invokes native sharing synchronously before user activation can expire', async () => {
    const events: string[] = []
    const share = vi.fn(async () => {
      events.push('share')
    })
    const writeText = vi.fn(async () => {})
    const openInstagram = vi.fn()

    const result = openInstagramShare(shareData, { share, writeText, openInstagram })
    events.push('returned')

    expect(events).toEqual(['share', 'returned'])
    await expect(result).resolves.toBe('shared')
    expect(share).toHaveBeenCalledWith(shareData)
    expect(writeText).not.toHaveBeenCalled()
    expect(openInstagram).not.toHaveBeenCalled()
  })

  it('starts copying before opening Instagram in the desktop fallback', async () => {
    const events: string[] = []
    const writeText = vi.fn(async () => {
      events.push('copy')
    })
    const openInstagram = vi.fn(() => events.push('open'))

    const result = openInstagramShare(shareData, { writeText, openInstagram })

    expect(events).toEqual(['copy', 'open'])
    await expect(result).resolves.toBe('fallback-copied')
    expect(writeText).toHaveBeenCalledWith(shareData.url)
  })

  it('still opens Instagram when clipboard access is unavailable', async () => {
    const writeText = vi.fn(() => Promise.reject(new Error('clipboard denied')))
    const openInstagram = vi.fn()

    await expect(openInstagramShare(shareData, { writeText, openInstagram })).resolves.toBe('fallback-opened')
    expect(openInstagram).toHaveBeenCalledOnce()
  })
})
