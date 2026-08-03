import { describe, expect, it, vi } from 'vitest'

import { createSocialShareUrl, openSocialShareWindow } from './social-share'

describe('social sharing', () => {
  it('builds an encoded URL only for an approved share host', () => {
    const url = createSocialShareUrl('https://twitter.com/intent/tweet?text={text}&url={url}', {
      url: 'https://photo.example/photos/1?view=full',
      title: 'Photo title',
      text: 'Photo & caption',
    })

    expect(url).toContain('twitter.com/intent/tweet')
    expect(url).toContain('Photo%20%26%20caption')
    expect(url).toContain('https%3A%2F%2Fphoto.example%2Fphotos%2F1%3Fview%3Dfull')
  })

  it('rejects unapproved and non-HTTPS destinations', () => {
    const values = { url: 'https://photo.example', title: 'Photo', text: 'Photo' }

    expect(() => createSocialShareUrl('https://evil.example/?url={url}', values)).toThrow('Unsupported')
    expect(() => createSocialShareUrl('http://twitter.com/?url={url}', values)).toThrow('Unsupported')
  })

  it('opens an isolated window and clears the opener defensively', () => {
    const openedWindow = { opener: {} } as Window
    const openWindow = vi.fn(() => openedWindow)

    openSocialShareWindow('https://t.me/share/url?url=https%3A%2F%2Fphoto.example', openWindow)

    expect(openWindow).toHaveBeenCalledWith(
      'https://t.me/share/url?url=https%3A%2F%2Fphoto.example',
      '_blank',
      'width=600,height=400,noopener,noreferrer',
    )
    expect(openedWindow.opener).toBeNull()
  })
})
