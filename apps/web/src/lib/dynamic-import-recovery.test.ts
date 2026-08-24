import { describe, expect, it } from 'vitest'

import { isDynamicImportError, shouldReloadForDynamicImportError } from './dynamic-import-recovery'

describe('dynamic import recovery', () => {
  it.each([
    'Failed to fetch dynamically imported module: /assets/page.js',
    'error loading dynamically imported module',
    'Importing a module script failed.',
  ])('recognizes browser chunk-load errors: %s', (message) => {
    expect(isDynamicImportError(message)).toBe(true)
  })

  it('ignores unrelated route errors', () => {
    expect(isDynamicImportError('404 Not Found')).toBe(false)
  })

  it('allows only one reload during the cooldown window', () => {
    const now = 100_000

    expect(
      shouldReloadForDynamicImportError({
        message: 'Failed to fetch dynamically imported module',
        lastReloadAt: null,
        now,
      }),
    ).toBe(true)
    expect(
      shouldReloadForDynamicImportError({
        message: 'Failed to fetch dynamically imported module',
        lastReloadAt: now - 1_000,
        now,
      }),
    ).toBe(false)
    expect(
      shouldReloadForDynamicImportError({
        message: 'Failed to fetch dynamically imported module',
        lastReloadAt: now - 30_000,
        now,
      }),
    ).toBe(true)
  })
})
