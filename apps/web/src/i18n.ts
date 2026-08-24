import type { BackendModule, ReadCallback } from 'i18next'
import i18next from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { atom } from 'jotai'
import { initReactI18next } from 'react-i18next'

import { currentSupportedLanguages, defaultNS, ns } from './@types/constants'
import { loadAppResource } from './@types/resources'
import { jotaiStore } from './lib/jotai'
import { normalizeAppLanguage } from './lib/language'

const appResourceBackend: BackendModule = {
  type: 'backend',
  init() {},
  read(language: string, namespace: string, callback: ReadCallback) {
    const normalizedLanguage = normalizeAppLanguage(language)
    if (!normalizedLanguage || namespace !== defaultNS) {
      callback(new Error(`Unsupported locale resource: ${language}/${namespace}`), false)
      return
    }

    void loadAppResource(normalizedLanguage).then(
      (resource) => callback(null, resource),
      (error: unknown) => callback(error instanceof Error ? error : new Error(String(error)), false),
    )
  },
}

const i18n = i18next.createInstance()
export const i18nReady = i18n
  .use(appResourceBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    detection: {
      order: ['querystring', 'hash', 'cookie', 'localStorage', 'sessionStorage', 'navigator', 'htmlTag'],
      convertDetectedLanguage: (language) => normalizeAppLanguage(language) ?? language,
    },
    fallbackLng: {
      ja: ['jp'],
      zh: ['zh-CN'],
      default: ['en'],
    },
    defaultNS,
    ns,
    supportedLngs: currentSupportedLanguages,
  })

export const i18nAtom = atom(i18n)

export const getI18n = () => {
  return jotaiStore.get(i18nAtom)
}
