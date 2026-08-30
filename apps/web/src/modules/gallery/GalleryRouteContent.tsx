import { ScrollArea, ScrollElementContext } from '@afilmory/ui/scroll-areas'

import { useMobile } from '~/hooks/useMobile'
import { usePhotoViewerState } from '~/hooks/usePhotoViewer'

import { MasonryRoot } from './MasonryRoot'

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
        <ScrollArea rootClassName="h-svh w-full" viewportClassName="size-full">
          <MasonryRoot />
        </ScrollArea>
      )}
    </div>
  )
}
