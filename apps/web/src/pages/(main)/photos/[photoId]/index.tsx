import { RootPortal, RootPortalProvider } from '@afilmory/ui'
import clsx from 'clsx'
import { lazy, Suspense, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { RemoveScroll } from 'react-remove-scroll'

import { NotFound } from '~/components/common/NotFound'
import { usePageMeta } from '~/hooks/usePageMeta'
import { useContextPhotos, usePhotoViewer } from '~/hooks/usePhotoViewer'
import { useTitle } from '~/hooks/useTitle'
import { deriveAccentFromSources } from '~/lib/color'
import { getLocalizedPhotoDescription, getPhotoAltText } from '~/lib/photo-description'
import { getPhotoDetailPath } from '~/lib/photo-route'

const PhotoViewer = lazy(() =>
  import('~/components/ui/photo-viewer/PhotoViewer').then((module) => ({ default: module.PhotoViewer })),
)

export const Component = () => {
  const photoViewer = usePhotoViewer()
  const photos = useContextPhotos()
  const { i18n } = useTranslation()
  const locale = i18n.resolvedLanguage ?? i18n.language

  const [ref, setRef] = useState<HTMLElement | null>(null)
  const rootPortalValue = useMemo(
    () => ({
      to: ref as HTMLElement,
    }),
    [ref],
  )
  const currentPhoto = photos[photoViewer.currentIndex]
  const pageTitle = currentPhoto?.title || currentPhoto?.id || 'Not Found'
  const pageDescription = currentPhoto ? getLocalizedPhotoDescription(currentPhoto, locale) : ''

  useTitle(pageTitle)
  usePageMeta({
    title: currentPhoto ? pageTitle : undefined,
    description: pageDescription || undefined,
    image: currentPhoto?.thumbnailUrl || currentPhoto?.originalUrl,
    url: currentPhoto ? getPhotoDetailPath(currentPhoto.id) : undefined,
    type: currentPhoto?.mediaType === 'video' ? 'video.other' : 'article',
  })

  const [accentColor, setAccentColor] = useState<string | null>(null)

  useEffect(() => {
    const current = photos[photoViewer.currentIndex]
    if (!current) return

    let isCancelled = false

    ;(async () => {
      try {
        const color = await deriveAccentFromSources({
          thumbHash: current.thumbHash,
          thumbnailUrl: current.thumbnailUrl,
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
  }, [photoViewer.currentIndex, photos])

  if (!photos[photoViewer.currentIndex]) {
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
