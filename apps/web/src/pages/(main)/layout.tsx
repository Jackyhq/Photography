import { useAtomValue, useSetAtom } from 'jotai'
import { lazy, Suspense, useEffect, useRef } from 'react'
import { Outlet, useLocation, useNavigate, useParams, useSearchParams } from 'react-router'

import { gallerySettingAtom } from '~/atoms/app'
import { siteConfig } from '~/config'
import { getFilteredPhotos, useOpenPhotoViewer, usePhotos, usePhotoViewerState } from '~/hooks/usePhotoViewer'
import { getPhotoDetailPath } from '~/lib/photo-route'
import { PhotosProvider } from '~/providers/photos-provider'

const loadGalleryRouteContent = () =>
  import('~/modules/gallery/GalleryRouteContent').then((module) => ({ default: module.GalleryRouteContent }))

const GalleryRouteContent = lazy(loadGalleryRouteContent)

if (typeof window !== 'undefined' && !window.location.pathname.startsWith('/photos/')) {
  void loadGalleryRouteContent().catch(() => null)
}

export const Component = () => {
  useStateRestoreFromUrl()
  useSyncStateToUrl()

  const { photoId } = useParams()
  const isDirectPhotoRouteRef = useRef(Boolean(photoId))
  const photos = usePhotos()
  const shouldRenderGallery = !photoId || !isDirectPhotoRouteRef.current

  return (
    <>
      <PhotosProvider photos={photos}>
        {siteConfig.accentColor && (
          <style
            dangerouslySetInnerHTML={{
              __html: `
          :root:has(input.theme-controller[value=dark]:checked), [data-theme="dark"] {
            --color-primary: ${siteConfig.accentColor};
            --color-accent: ${siteConfig.accentColor};
            --color-secondary: ${siteConfig.accentColor};
          }
          `,
            }}
          />
        )}

        {shouldRenderGallery && (
          <Suspense fallback={null}>
            <GalleryRouteContent />
          </Suspense>
        )}

        <Outlet />
      </PhotosProvider>
    </>
  )
}

let isRestored = false
let pendingPhotoFocusId: string | null = null
const useStateRestoreFromUrl = () => {
  const triggerOnceRef = useRef(false)

  const { openViewerByPhotoId } = useOpenPhotoViewer()
  const { photoId } = useParams()
  const gallerySetting = useAtomValue(gallerySettingAtom)
  const setGallerySetting = useSetAtom(gallerySettingAtom)

  const [searchParams] = useSearchParams()
  useEffect(() => {
    if (triggerOnceRef.current) return
    triggerOnceRef.current = true

    const getListFromSearchParams = (key: string) => {
      const value = searchParams.get(key)
      if (!value) return

      const values = value
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean)

      if (values.length > 0) return values
    }

    const tagsFromSearchParams = getListFromSearchParams('tags')
    const camerasFromSearchParams = getListFromSearchParams('cameras')
    const lensesFromSearchParams = getListFromSearchParams('lenses')
    const ratingParam = searchParams.get('rating')
    const parsedRating = ratingParam ? Number(ratingParam) : null
    const ratingsFromSearchParams = parsedRating !== null && Number.isFinite(parsedRating) ? parsedRating : null
    const rawTagModeFromSearchParams = searchParams.get('tag_mode')
    const tagModeFromSearchParams =
      rawTagModeFromSearchParams === 'intersection' || rawTagModeFromSearchParams === 'union'
        ? rawTagModeFromSearchParams
        : null

    if (
      tagsFromSearchParams ||
      camerasFromSearchParams ||
      lensesFromSearchParams ||
      ratingsFromSearchParams !== null ||
      tagModeFromSearchParams
    ) {
      const restoredGallerySetting = {
        ...gallerySetting,
        selectedTags: tagsFromSearchParams || gallerySetting.selectedTags,
        selectedCameras: camerasFromSearchParams || gallerySetting.selectedCameras,
        selectedLenses: lensesFromSearchParams || gallerySetting.selectedLenses,
        selectedRatings: ratingsFromSearchParams ?? gallerySetting.selectedRatings,
        tagFilterMode: tagModeFromSearchParams || gallerySetting.tagFilterMode,
      }

      setGallerySetting(restoredGallerySetting)

      if (photoId) {
        openViewerByPhotoId(photoId, {
          gallerySetting: restoredGallerySetting,
          resetFiltersIfHidden: true,
        })
      }

      isRestored = true
      return
    }

    if (photoId) {
      openViewerByPhotoId(photoId, { resetFiltersIfHidden: true })
    }

    isRestored = true
  }, [gallerySetting, openViewerByPhotoId, photoId, searchParams, setGallerySetting])
}

const useSyncStateToUrl = () => {
  const { selectedTags, selectedCameras, selectedLenses, selectedRatings, tagFilterMode } =
    useAtomValue(gallerySettingAtom)
  const [_, setSearchParams] = useSearchParams()
  const navigate = useNavigate()

  const location = useLocation()
  const { isOpen, currentIndex } = usePhotoViewerState()

  useEffect(() => {
    if (!isRestored) return

    if (!isOpen) {
      if (location.pathname.startsWith('/photos/')) {
        pendingPhotoFocusId = getFilteredPhotos()[currentIndex]?.id ?? null
        const timer = setTimeout(() => {
          navigate({ pathname: '/', search: location.search })
        }, 500)
        return () => clearTimeout(timer)
      }
    } else {
      pendingPhotoFocusId = null
      const photos = getFilteredPhotos()
      const targetPhoto = photos[currentIndex]
      if (!targetPhoto) return

      const targetPathname = getPhotoDetailPath(targetPhoto.id)
      if (location.pathname !== targetPathname) {
        navigate({ pathname: targetPathname, search: location.search })
      }
    }
  }, [currentIndex, isOpen, location.pathname, location.search, navigate])

  useEffect(() => {
    const photoId = pendingPhotoFocusId
    if (isOpen || location.pathname !== '/' || !photoId) return

    let attempts = 0
    const maxAttempts = 120
    let animationFrame = 0
    const restoreFocus = () => {
      const photoCard = Array.from(document.querySelectorAll<HTMLElement>('[data-photo-id]')).find(
        (element) => element.dataset.photoId === photoId && element.isConnected,
      )
      if (!photoCard) {
        attempts++
        if (attempts < maxAttempts) animationFrame = requestAnimationFrame(restoreFocus)
        return
      }

      photoCard.focus({ preventScroll: true })
      pendingPhotoFocusId = null
    }
    animationFrame = requestAnimationFrame(restoreFocus)

    return () => cancelAnimationFrame(animationFrame)
  }, [isOpen, location.pathname])

  useEffect(() => {
    if (!isRestored) return

    const tags = selectedTags.join(',')
    const cameras = selectedCameras.join(',')
    const lenses = selectedLenses.join(',')
    const rating = selectedRatings?.toString() ?? ''
    const tagMode = tagFilterMode === 'union' ? '' : tagFilterMode

    setSearchParams((search) => {
      const currentTags = search.get('tags')
      const currentCameras = search.get('cameras')
      const currentLenses = search.get('lenses')
      const currentRating = search.get('rating')
      const currentTagMode = search.get('tag_mode')

      // Check if anything has changed
      if (
        currentTags === tags &&
        currentCameras === cameras &&
        currentLenses === lenses &&
        currentRating === rating &&
        currentTagMode === tagMode
      ) {
        return search
      }

      const newer = new URLSearchParams(search)

      // Update tags
      if (tags) {
        newer.set('tags', tags)
      } else {
        newer.delete('tags')
      }

      // Update cameras
      if (cameras) {
        newer.set('cameras', cameras)
      } else {
        newer.delete('cameras')
      }

      // Update lenses
      if (lenses) {
        newer.set('lenses', lenses)
      } else {
        newer.delete('lenses')
      }

      // Update rating
      if (rating) {
        newer.set('rating', rating)
      } else {
        newer.delete('rating')
      }

      // Update tag filter mode
      if (tagMode) {
        newer.set('tag_mode', tagMode)
      } else {
        newer.delete('tag_mode')
      }

      return newer
    })
  }, [selectedTags, selectedCameras, selectedLenses, selectedRatings, tagFilterMode, setSearchParams])
}
