import type { MainSupportedLanguages } from './constants'

export type AppResource = typeof import('@locales/app/en.json')
export type AppI18nResources = { app: AppResource }
type LoadedAppResource = Record<string, string>

const unwrapResource = (module: unknown): LoadedAppResource => {
  const resource = (module as { default?: unknown }).default ?? module
  return resource as LoadedAppResource
}

const resourceLoaders = {
  en: () => import('@locales/app/en.json').then(unwrapResource),
  'zh-CN': () => import('@locales/app/zh-CN.json').then(unwrapResource),
  'zh-HK': () => import('@locales/app/zh-HK.json').then(unwrapResource),
  jp: () => import('@locales/app/jp.json').then(unwrapResource),
  ko: () => import('@locales/app/ko.json').then(unwrapResource),
  'zh-TW': () => import('@locales/app/zh-TW.json').then(unwrapResource),
} satisfies Record<MainSupportedLanguages, () => Promise<LoadedAppResource>>

const resourcePromiseCache = new Map<MainSupportedLanguages, Promise<LoadedAppResource>>()

export const loadAppResource = (language: MainSupportedLanguages): Promise<LoadedAppResource> => {
  const cached = resourcePromiseCache.get(language)
  if (cached) return cached

  const resourcePromise = resourceLoaders[language]().catch((error) => {
    resourcePromiseCache.delete(language)
    throw error
  })
  resourcePromiseCache.set(language, resourcePromise)
  return resourcePromise
}
