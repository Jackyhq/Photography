import { afterEach, describe, expect, it, vi } from 'vitest'

describe('photoLoader photo text packs', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
    vi.resetModules()
  })

  it('loads localized photo text once and updates searchable text', async () => {
    vi.stubGlobal('__MANIFEST__', {
      version: 'v1',
      cameras: [],
      lenses: [],
      data: [
        {
          id: 'photo-1',
          title: '中文标题',
          description: '中文描述',
          tags: [],
          sortTime: 0,
        },
      ],
    })
    vi.stubGlobal('__PHOTO_TEXT_URLS__', {
      en: '/assets/photo-text.en.json',
    })

    const fetchMock = vi.fn(async () => {
      return new Response(
        JSON.stringify({
          version: 'v1',
          language: 'en',
          photos: {
            'photo-1': {
              title: 'English title',
              description: 'English description',
            },
          },
        }),
        {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
    })
    vi.stubGlobal('fetch', fetchMock)

    const { photoLoader } = await import('./index')
    const photo = photoLoader.getPhoto('photo-1')
    const listener = vi.fn()
    const unsubscribe = photoLoader.subscribePhotoTextChanges(listener)

    expect(photoLoader.getSearchablePhotoText(photo)).toEqual(['中文标题', '中文描述'])
    expect(photoLoader.getPhotoTextRevision()).toBe(0)

    await photoLoader.loadPhotoText('en')

    expect(fetchMock).toHaveBeenCalledTimes(1)
    expect(fetchMock).toHaveBeenCalledWith('/assets/photo-text.en.json', {
      credentials: 'same-origin',
    })
    expect(photoLoader.getPhotoText(photo, 'en')).toEqual({
      title: 'English title',
      description: 'English description',
    })
    expect(photoLoader.getPhotoText(photo, 'zh-CN')).toEqual({
      title: '中文标题',
      description: '中文描述',
    })
    expect(photoLoader.getSearchablePhotoText(photo)).toEqual([
      '中文标题',
      '中文描述',
      'English title',
      'English description',
    ])
    expect(photoLoader.getPhotoTextRevision()).toBe(1)
    expect(listener).toHaveBeenCalledTimes(1)

    await photoLoader.loadPhotoText('en-US')
    expect(fetchMock).toHaveBeenCalledTimes(1)
    expect(listener).toHaveBeenCalledTimes(1)

    unsubscribe()
  })
})
