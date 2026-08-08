import path from 'node:path'

import { describe, expect, it } from 'vitest'

import { workdir } from '../path.js'
import { getThumbnailDirectory, getThumbnailUrlPrefix } from './thumbnail-paths.js'

describe('thumbnail paths', () => {
  it('uses the production thumbnail cache by default', () => {
    expect(getThumbnailDirectory(false)).toBe(path.join(workdir, 'public/thumbnails'))
    expect(getThumbnailUrlPrefix(false)).toBe('/thumbnails')
  })

  it('isolates E2E fixture thumbnails from the production cache', () => {
    expect(getThumbnailDirectory(true)).toBe(path.join(workdir, 'public/__fixtures/thumbnails'))
    expect(getThumbnailUrlPrefix(true)).toBe('/__fixtures/thumbnails')
  })
})
