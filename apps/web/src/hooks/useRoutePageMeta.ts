import { photoLoader } from '@afilmory/data'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router'

import { siteConfig } from '~/config'
import { createPhotoMeta, createSitePageMeta } from '~/lib/page-meta'
import { getLocalizedPhotoDescription, getLocalizedPhotoTitle } from '~/lib/photo-description'
import { getPhotoIdFromPathname } from '~/lib/photo-route'

import { usePageMeta } from './usePageMeta'
import { usePhotoTextUpdates } from './usePhotoTextUpdates'

export function useRoutePageMeta() {
  const { pathname } = useLocation()
  const { i18n } = useTranslation()
  usePhotoTextUpdates()
  const language = i18n.resolvedLanguage ?? i18n.language
  const [siteImage] = useState(
    () => document.querySelector<HTMLMetaElement>('meta[name="afilmory:site-image"]')?.content,
  )
  const photoId = getPhotoIdFromPathname(pathname)
  const photo = photoId ? photoLoader.getPhoto(photoId) : undefined

  usePageMeta(
    photo
      ? createPhotoMeta(photo, siteConfig, {
          title: getLocalizedPhotoTitle(photo, language),
          description: getLocalizedPhotoDescription(photo, language),
        })
      : createSitePageMeta(siteConfig, pathname, siteImage),
  )
}
