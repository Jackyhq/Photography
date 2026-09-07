import { photoLoader } from '@afilmory/data'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useMatches } from 'react-router'

import { siteConfig } from '~/config'
import { createNotFoundPageMeta, createPhotoMeta, createSitePageMeta } from '~/lib/page-meta'
import { getLocalizedPhotoDescription, getLocalizedPhotoTitle } from '~/lib/photo-description'
import type { AppRouteHandle } from '~/lib/route-builder'

import { usePageMeta } from './usePageMeta'
import { usePhotoTextUpdates } from './usePhotoTextUpdates'

export function useRoutePageMeta() {
  const { pathname } = useLocation()
  const matches = useMatches()
  const { i18n } = useTranslation()
  usePhotoTextUpdates()
  const language = i18n.resolvedLanguage ?? i18n.language
  const [siteImage] = useState(
    () => document.querySelector<HTMLMetaElement>('meta[name="afilmory:site-image"]')?.content,
  )
  const leafMatch = matches.at(-1)
  const photoId = leafMatch?.params.photoId
  const photo = photoId ? photoLoader.getPhoto(photoId) : undefined
  const isNotFound =
    (leafMatch?.handle as AppRouteHandle | undefined)?.notFound === true || (photoId !== undefined && !photo)

  usePageMeta(
    isNotFound
      ? createNotFoundPageMeta(siteConfig)
      : photo
        ? createPhotoMeta(photo, siteConfig, {
            title: getLocalizedPhotoTitle(photo, language),
            description: getLocalizedPhotoDescription(photo, language),
          })
        : createSitePageMeta(siteConfig, pathname, siteImage),
  )

  return isNotFound
}
