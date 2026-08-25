import { describe, expect, it } from 'vitest'

import type { DependencyChunkGroup } from './deps'
import { resolveDependencyChunkName } from './deps'

const groups = [
  { name: 'heic', dependencies: ['heic-to'] },
  { name: 'react', dependencies: ['react', 'react-dom'] },
] satisfies readonly DependencyChunkGroup[]

describe('dependency chunks', () => {
  it('uses stable semantic names instead of array positions', () => {
    expect(resolveDependencyChunkName('/project/node_modules/heic-to/index.js', groups)).toBe('vendor/heic')
    expect(resolveDependencyChunkName('/project/node_modules/react-dom/client.js', groups)).toBe('vendor/react')
    expect(
      resolveDependencyChunkName('/project/node_modules/.pnpm/react@19.2.0/node_modules/react/index.js', groups),
    ).toBe('vendor/react')
  })

  it('does not absorb nested dependencies or unrelated modules', () => {
    expect(resolveDependencyChunkName('/project/node_modules/heic-to/node_modules/react/index.js', groups)).toBe(null)
    expect(resolveDependencyChunkName('/project/src/heic-to.ts', groups)).toBe(null)
  })
})
