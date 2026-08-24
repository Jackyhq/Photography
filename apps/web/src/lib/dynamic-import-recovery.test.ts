import { describe, expect, it, vi } from 'vitest'

import {
  claimDynamicImportReload,
  DYNAMIC_IMPORT_RELOAD_STORAGE_KEY,
  isDynamicImportError,
  shouldReloadForDynamicImportError,
} from './dynamic-import-recovery'

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

  it('persists the cooldown before allowing an automatic reload', () => {
    const getItem = vi.fn(() => null)
    const setItem = vi.fn()

    expect(
      claimDynamicImportReload({
        message: 'Failed to fetch dynamically imported module',
        getStorage: () => ({ getItem, setItem }),
        now: 100_000,
      }),
    ).toBe(true)
    expect(getItem).toHaveBeenCalledWith(DYNAMIC_IMPORT_RELOAD_STORAGE_KEY)
    expect(setItem).toHaveBeenCalledWith(DYNAMIC_IMPORT_RELOAD_STORAGE_KEY, '100000')
  })

  it.each(['read', 'write'] as const)('skips automatic reload when storage %s fails', (failure) => {
    const getItem = vi.fn(() => {
      if (failure === 'read') throw new DOMException('Denied', 'SecurityError')
      return null
    })
    const setItem = vi.fn(() => {
      if (failure === 'write') throw new DOMException('Denied', 'SecurityError')
    })

    expect(
      claimDynamicImportReload({
        message: 'Failed to fetch dynamically imported module',
        getStorage: () => ({ getItem, setItem }),
        now: 100_000,
      }),
    ).toBe(false)
  })

  it('skips automatic reload when access to session storage fails', () => {
    expect(
      claimDynamicImportReload({
        message: 'Failed to fetch dynamically imported module',
        getStorage: () => {
          throw new DOMException('Denied', 'SecurityError')
        },
      }),
    ).toBe(false)
  })
})
