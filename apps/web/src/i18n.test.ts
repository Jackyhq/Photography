import { afterAll, describe, expect, it } from 'vitest'

import { getI18n, i18nReady } from './i18n'

describe('i18n resource loading', () => {
  afterAll(async () => {
    await getI18n().changeLanguage('en')
  })

  it('initializes before the application renders', async () => {
    await i18nReady

    expect(getI18n().isInitialized).toBe(true)
    expect(getI18n().t('action.auto')).not.toBe('action.auto')
  })

  it('loads another language on demand', async () => {
    await i18nReady
    await getI18n().changeLanguage('zh-CN')

    expect(getI18n().t('action.auto')).toBe('自动')
  })
})
