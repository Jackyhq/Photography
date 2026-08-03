import { describe, expect, it, vi } from 'vitest'

import { fetchShareMediaBlob, MAX_NATIVE_SHARE_FILE_BYTES, openNativeShare } from './share-media.js'

const { signal } = new AbortController()

describe('fetchShareMediaBlob', () => {
  it('returns media only for successful responses with the expected type', async () => {
    const fetcher = vi.fn(async () => new Response('photo', { status: 200, headers: { 'content-type': 'image/jpeg' } }))

    const blob = await fetchShareMediaBlob('/photo.jpg', 'image', signal, fetcher as typeof fetch)

    expect(blob.type).toBe('image/jpeg')
    expect(fetcher).toHaveBeenCalledWith('/photo.jpg', { signal })
  })

  it('rejects failed responses before opening the system share sheet', async () => {
    const fetcher = vi.fn(async () => new Response('not found', { status: 404 }))

    await expect(fetchShareMediaBlob('/missing.jpg', 'image', signal, fetcher as typeof fetch)).rejects.toThrow(
      'status 404',
    )
  })

  it('rejects unexpected content types', async () => {
    const fetcher = vi.fn(async () => new Response('error', { status: 200, headers: { 'content-type': 'text/html' } }))

    await expect(fetchShareMediaBlob('/photo.jpg', 'image', signal, fetcher as typeof fetch)).rejects.toThrow(
      'unexpected content type',
    )
  })

  it('rejects oversized media from response headers without reading the body', async () => {
    const response = new Response('video', {
      headers: {
        'content-length': String(MAX_NATIVE_SHARE_FILE_BYTES + 1),
        'content-type': 'video/mp4',
      },
    })
    const blobSpy = vi.spyOn(response, 'blob')
    const fetcher = vi.fn(async () => response)

    await expect(fetchShareMediaBlob('/video.mp4', 'video', signal, fetcher as typeof fetch)).rejects.toThrow(
      'too large',
    )
    expect(blobSpy).not.toHaveBeenCalled()
  })
})

describe('openNativeShare', () => {
  it('treats user cancellation as a silent outcome', async () => {
    const share = vi.fn(async () => {
      throw new DOMException('User cancelled', 'AbortError')
    })

    await expect(openNativeShare(share, { url: 'https://example.com/photo' })).resolves.toBe('cancelled')
  })

  it('keeps non-cancellation failures visible to the caller', async () => {
    const share = vi.fn(async () => {
      throw new Error('share unavailable')
    })

    await expect(openNativeShare(share, { url: 'https://example.com/photo' })).rejects.toThrow('share unavailable')
  })
})
