import { photoLoader } from '@afilmory/data'
import { RootPortal, RootPortalProvider } from '@afilmory/ui'
import clsx from 'clsx'
import { lazy, Suspense, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { RemoveScroll } from 'react-remove-scroll'
import { useParams } from 'react-router'

import { NotFound } from '~/components/common/NotFound'
import { usePageMeta } from '~/hooks/usePageMeta'
import { usePhotoTextUpdates } from '~/hooks/usePhotoTextUpdates'
import { useContextPhotos, usePhotoViewer } from '~/hooks/usePhotoViewer'
import { useTitle } from '~/hooks/useTitle'
import { deriveAccentFromSources } from '~/lib/color'
import { getLocalizedPhotoDescription, getLocalizedPhotoTitle, getPhotoAltText } from '~/lib/photo-description'
import { getPhotoDetailPath } from '~/lib/photo-route'
import { getPhotoSocialPreview } from '~/lib/social-preview'

const PhotoViewer = lazy(() =>
  import('~/components/ui/photo-viewer/PhotoViewer').then((module) => ({ default: module.PhotoViewer })),
)

export const Component = () => {
  const photoViewer = usePhotoViewer()
  const photos = useContextPhotos()
  const { photoId } = useParams()
  const { i18n } = useTranslation()
  usePhotoTextUpdates()
  const locale = i18n.resolvedLanguage ?? i18n.language

  const [ref, setRef] = useState<HTMLElement | null>(null)
  const rootPortalValue = useMemo(
    () => ({
      to: ref as HTMLElement,
    }),
    [ref],
  )
  const currentPhoto = photoId ? photoLoader.getPhoto(photoId) : undefined
  const socialPreview = currentPhoto ? getPhotoSocialPreview(currentPhoto) : undefined
  const pageTitle = currentPhoto ? getLocalizedPhotoTitle(currentPhoto, locale) || currentPhoto.id : 'Not Found'
  const pageDescription = currentPhoto ? getLocalizedPhotoDescription(currentPhoto, locale) : ''

  useTitle(pageTitle)
  usePageMeta({
    title: currentPhoto ? pageTitle : undefined,
    description: pageDescription || undefined,
    image: socialPreview?.source,
    imageWidth: socialPreview?.width,
    imageHeight: socialPreview?.height,
    url: currentPhoto ? getPhotoDetailPath(currentPhoto.id) : undefined,
    type: currentPhoto?.mediaType === 'video' ? 'video.other' : 'article',
  })

  const [accentColor, setAccentColor] = useState<string | null>(null)

  useEffect(() => {
    if (!currentPhoto) return

    let isCancelled = false

    ;(async () => {
      try {
        const color = await deriveAccentFromSources({
          thumbHash: currentPhoto.thumbHash,
          thumbnailUrl: currentPhoto.thumbnailUrl,
        })
        if (!isCancelled) {
          setAccentColor(color ?? null)
        }
      } catch {
        if (!isCancelled) setAccentColor(null)
      }
    })()

    return () => {
      isCancelled = true
    }
  }, [currentPhoto])

  if (!currentPhoto) {
    return <NotFound />
  }

  return (
    <>
      <article
        className="sr-only"
        aria-labelledby="photo-detail-heading"
        aria-hidden={photoViewer.isOpen}
        inert={photoViewer.isOpen}
      >
        <h1 id="photo-detail-heading">{pageTitle}</h1>
        {pageDescription && <p>{pageDescription}</p>}
        <p>{getPhotoAltText(currentPhoto, locale)}</p>
      </article>

      <RootPortal>
        <RootPortalProvider value={rootPortalValue}>
          <RemoveScroll
            style={
              {
                ...(accentColor ? { '--color-accent': accentColor } : {}),
              } as React.CSSProperties
            }
            ref={setRef}
            className={clsx(
              'photo-viewer-accent-transition',
              photoViewer.isOpen ? 'fixed inset-0 z-9999' : 'pointer-events-none fixed inset-0 z-40',
            )}
          >
            <Suspense fallback={null}>
              <PhotoViewer
                photos={photos}
                currentIndex={photoViewer.currentIndex}
                isOpen={photoViewer.isOpen}
                triggerElement={photoViewer.triggerElement}
                onClose={photoViewer.closeViewer}
                onIndexChange={photoViewer.goToIndex}
              />
            </Suspense>
          </RemoveScroll>
        </RootPortalProvider>
      </RootPortal>
    </>
  )
}
