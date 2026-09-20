import { ScrollElementContext } from '@afilmory/ui/scroll-areas/context'
import { lazy, Suspense } from 'react'

import { useMobile } from '~/hooks/useMobile'
import { usePhotoViewerState } from '~/hooks/usePhotoViewer'

import { MasonryRoot } from './MasonryRoot'

const loadDesktopScrollArea = () =>
  import('./DesktopGalleryScrollArea').then((module) => ({ default: module.DesktopGalleryScrollArea }))
const DesktopGalleryScrollArea = lazy(loadDesktopScrollArea)

export const GalleryRouteContent = () => {
  const isMobile = useMobile()
  const { isOpen: isPhotoViewerOpen } = usePhotoViewerState()

  return (
    <div className="contents" data-testid="gallery-content" aria-hidden={isPhotoViewerOpen} inert={isPhotoViewerOpen}>
      {isMobile ? (
        <ScrollElementContext value={document.body}>
          <MasonryRoot />
        </ScrollElementContext>
      ) : (
        <Suspense fallback={null}>
          <DesktopGalleryScrollArea>
            <MasonryRoot />
          </DesktopGalleryScrollArea>
        </Suspense>
      )}
    </div>
  )
}
