import { describe, expect, it } from 'vitest'

import { getPhotoDetailPath, normalizeCanonicalPathname } from './photo-route'

describe('photo route canonicalization', () => {
  it('encodes photo ids and keeps the canonical trailing slash', () => {
    expect(getPhotoDetailPath('folder/photo 1')).toBe('/photos/folder%2Fphoto%201/')
  })

  it('normalizes every non-root app route to one trailing slash', () => {
    expect(normalizeCanonicalPathname('/')).toBe('')
    expect(normalizeCanonicalPathname('/explory')).toBe('/explory/')
    expect(normalizeCanonicalPathname('/explory/')).toBe('/explory/')
    expect(normalizeCanonicalPathname('/photos/photo-1/?view=grid')).toBe('/photos/photo-1/')
  })
})
