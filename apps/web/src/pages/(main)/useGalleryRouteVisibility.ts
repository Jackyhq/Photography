import { useEffect, useRef, useState } from 'react'

/**
 * Keep the gallery chunk out of an initial direct photo route, then mount it as
 * soon as that viewer closes so the delayed navigation has content behind it.
 */
export const useGalleryRouteVisibility = (photoId: string | undefined, isPhotoViewerOpen: boolean) => {
  const isDirectPhotoRouteRef = useRef(Boolean(photoId))
  const [hasOpenedDirectViewer, setHasOpenedDirectViewer] = useState(false)

  useEffect(() => {
    if (!isDirectPhotoRouteRef.current) return

    if (!photoId) {
      isDirectPhotoRouteRef.current = false
      return
    }

    if (isPhotoViewerOpen) {
      setHasOpenedDirectViewer(true)
    }
  }, [isPhotoViewerOpen, photoId])

  return !photoId || !isDirectPhotoRouteRef.current || (hasOpenedDirectViewer && !isPhotoViewerOpen)
}
