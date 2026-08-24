import { photoLoader } from '@afilmory/data'
import i18next from 'i18next'
import { useAtom } from 'jotai'
import type { FC, PropsWithChildren } from 'react'
import { useEffect } from 'react'
import { I18nextProvider } from 'react-i18next'

import { EventBus } from '~/lib/event-bus'
import { toHtmlLanguage } from '~/lib/language'

import { i18nAtom } from '../i18n'

export const I18nProvider: FC<PropsWithChildren> = ({ children }) => {
  const [currentI18NInstance, update] = useAtom(i18nAtom)

  useEffect(() => {
    if (!import.meta.env.DEV) return

    return EventBus.subscribe('I18N_UPDATE', () => {
      const nextI18n = i18next.cloneInstance({})
      update(nextI18n)
    })
  }, [update])

  useEffect(() => {
    const updateDocumentLanguage = (language: string) => {
      document.documentElement.lang = toHtmlLanguage(language)
    }

    updateDocumentLanguage(currentI18NInstance.resolvedLanguage || currentI18NInstance.language)
    currentI18NInstance.on('languageChanged', updateDocumentLanguage)

    return () => {
      currentI18NInstance.off('languageChanged', updateDocumentLanguage)
    }
  }, [currentI18NInstance])

  useEffect(() => {
    let isCancelled = false

    const loadPhotoText = (language: string) => {
      void photoLoader.loadPhotoText(language).catch((error) => {
        if (!isCancelled) {
          console.error('Failed to load localized photo text:', error)
        }
      })
    }

    loadPhotoText(currentI18NInstance.resolvedLanguage || currentI18NInstance.language)
    currentI18NInstance.on('languageChanged', loadPhotoText)

    return () => {
      isCancelled = true
      currentI18NInstance.off('languageChanged', loadPhotoText)
    }
  }, [currentI18NInstance])

  return <I18nextProvider i18n={currentI18NInstance}>{children}</I18nextProvider>
}

declare module '~/lib/event-bus' {
  interface CustomEvent {
    I18N_UPDATE: string
  }
}
