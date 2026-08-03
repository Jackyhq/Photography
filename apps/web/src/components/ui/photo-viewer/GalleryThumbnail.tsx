import { Thumbhash } from '@afilmory/ui'
import { clsxm, Spring } from '@afilmory/utils'
import { m } from 'motion/react'
import type { FC } from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useMobile } from '~/hooks/useMobile'
import { nextFrame } from '~/lib/dom'
import { getPhotoAltText } from '~/lib/photo-description'
import type { PhotoManifest } from '~/types/photo'

const thumbnailSize = {
  mobile: 48,
  desktop: 64,
}

const thumbnailGapSize = {
  mobile: 8,
  desktop: 12,
}

const thumbnailPaddingSize = {
  mobile: 12,
  desktop: 16,
}

const thumbnailOverscanSize = {
  mobile: 8,
  desktop: 10,
}

interface ThumbnailRange {
  start: number
  end: number
}

const getInitialThumbnailRange = (currentIndex: number, itemCount: number, overscan: number): ThumbnailRange => {
  if (itemCount === 0) {
    return { start: 0, end: -1 }
  }

  return {
    start: Math.max(0, currentIndex - overscan),
    end: Math.min(itemCount - 1, currentIndex + overscan),
  }
}

export const GalleryThumbnail: FC<{
  currentIndex: number
  photos: PhotoManifest[]
  onIndexChange: (index: number) => void
  visible?: boolean
}> = ({ currentIndex, photos, onIndexChange, visible = true }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const isMobile = useMobile()
  const { i18n } = useTranslation()
  const locale = i18n.resolvedLanguage ?? i18n.language

  const itemSize = isMobile ? thumbnailSize.mobile : thumbnailSize.desktop
  const itemGap = isMobile ? thumbnailGapSize.mobile : thumbnailGapSize.desktop
  const itemPadding = isMobile ? thumbnailPaddingSize.mobile : thumbnailPaddingSize.desktop
  const overscan = isMobile ? thumbnailOverscanSize.mobile : thumbnailOverscanSize.desktop
  const itemStride = itemSize + itemGap
  const trackWidth = photos.length > 0 ? photos.length * itemSize + (photos.length - 1) * itemGap : 0

  const hasPositionedInitialIndexRef = useRef(false)
  const [scrollContainerWidth, setScrollContainerWidth] = useState(0)
  const [visibleRange, setVisibleRange] = useState<ThumbnailRange>(() =>
    getInitialThumbnailRange(currentIndex, photos.length, overscan),
  )

  const updateVisibleRange = useCallback(() => {
    const scrollContainer = scrollContainerRef.current

    if (!scrollContainer || photos.length === 0) {
      setVisibleRange({ start: 0, end: -1 })
      return
    }

    if (!hasPositionedInitialIndexRef.current) {
      const nextRange = getInitialThumbnailRange(currentIndex, photos.length, overscan)
      setVisibleRange((previous) => {
        if (previous.start === nextRange.start && previous.end === nextRange.end) {
          return previous
        }

        return nextRange
      })
      return
    }

    const viewportStart = Math.max(0, scrollContainer.scrollLeft - itemPadding)
    const viewportEnd = Math.max(viewportStart, scrollContainer.scrollLeft + scrollContainer.clientWidth - itemPadding)
    const start = Math.max(0, Math.floor(viewportStart / itemStride) - overscan)
    const end = Math.min(photos.length - 1, Math.ceil(viewportEnd / itemStride) + overscan)

    setVisibleRange((previous) => {
      if (previous.start === start && previous.end === end) {
        return previous
      }

      return { start, end }
    })
  }, [currentIndex, itemPadding, itemStride, overscan, photos.length])

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current
    if (!scrollContainer) return

    const handleResize = () => {
      setScrollContainerWidth(scrollContainer.clientWidth)
      updateVisibleRange()
    }

    handleResize()

    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', handleResize)
      return () => {
        window.removeEventListener('resize', handleResize)
      }
    }

    const resizeObserver = new ResizeObserver(handleResize)
    resizeObserver.observe(scrollContainer)

    return () => {
      resizeObserver.disconnect()
    }
  }, [updateVisibleRange])

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current
    if (!scrollContainer) return

    const handleScroll = () => updateVisibleRange()
    scrollContainer.addEventListener('scroll', handleScroll, { passive: true })
    updateVisibleRange()

    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll)
    }
  }, [updateVisibleRange])

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current
    if (!scrollContainer || scrollContainerWidth === 0 || photos.length === 0) return

    const thumbnailLeft = itemPadding + currentIndex * itemStride
    const scrollLeft = thumbnailLeft - scrollContainerWidth / 2 + itemSize / 2
    const behavior: ScrollBehavior = hasPositionedInitialIndexRef.current ? 'smooth' : 'auto'

    hasPositionedInitialIndexRef.current = true

    nextFrame(() => {
      scrollContainer.scrollTo({
        left: Math.max(0, scrollLeft),
        behavior,
      })
      updateVisibleRange()
    })
  }, [currentIndex, itemPadding, itemSize, itemStride, photos.length, scrollContainerWidth, updateVisibleRange])

  // 处理鼠标滚轮事件，映射为横向滚动
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current
    if (!scrollContainer) return

    const handleWheel = (e: WheelEvent) => {
      // 阻止默认的垂直滚动
      e.preventDefault()

      // 优先使用触控板的横向滚动 (deltaX)
      // 如果没有横向滚动，则将垂直滚动 (deltaY) 转换为横向滚动
      const scrollAmount = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY
      scrollContainer.scrollLeft += scrollAmount
    }

    scrollContainer.addEventListener('wheel', handleWheel, { passive: false })

    return () => {
      scrollContainer.removeEventListener('wheel', handleWheel)
    }
  }, [])

  return (
    <m.div
      className="pb-safe border-accent/20 bg-material-medium z-10 shrink-0 border-t backdrop-blur-2xl"
      initial={{ y: 100, opacity: 0 }}
      animate={{
        y: visible ? 0 : 48,
        opacity: visible ? 1 : 0,
      }}
      exit={{ y: 100, opacity: 0 }}
      transition={Spring.presets.smooth}
      style={{
        pointerEvents: visible ? 'auto' : 'none',
        boxShadow:
          '0 -8px 32px color-mix(in srgb, var(--color-accent) 8%, transparent), 0 -4px 16px color-mix(in srgb, var(--color-accent) 6%, transparent), 0 -2px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      {/* Inner glow layer */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'linear-gradient(to top, color-mix(in srgb, var(--color-accent) 5%, transparent), transparent)',
        }}
      />
      <div
        ref={scrollContainerRef}
        className="scrollbar-none relative z-10 overflow-x-auto"
        style={{
          padding: itemPadding,
        }}
      >
        <div
          className="relative"
          style={{
            width: trackWidth,
            height: itemSize,
          }}
        >
          {photos.slice(visibleRange.start, visibleRange.end + 1).map((photo, offset) => {
            const index = visibleRange.start + offset

            return (
              <button
                type="button"
                key={photo.id}
                aria-current={index === currentIndex ? 'true' : undefined}
                className={clsxm(
                  'contain-intrinsic-size absolute top-0 overflow-hidden rounded-lg border-2 transition-all',
                  index === currentIndex
                    ? 'scale-110 border-accent shadow-[0_0_20px_color-mix(in_srgb,var(--color-accent)_20%,transparent)]'
                    : 'grayscale-50 border-accent/20 hover:border-accent hover:grayscale-0',
                )}
                style={{
                  left: index * itemStride,
                  width: itemSize,
                  height: itemSize,
                }}
                onClick={() => onIndexChange(index)}
              >
                {photo.thumbHash && <Thumbhash thumbHash={photo.thumbHash} className="size-fill absolute inset-0" />}
                <img
                  src={photo.thumbnailUrl}
                  alt={getPhotoAltText(photo, locale)}
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                  fetchPriority={index === currentIndex ? 'high' : 'auto'}
                />
                {photo.mediaType === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 text-white">
                    <i className="i-mingcute-play-fill size-5" />
                  </div>
                )}
              </button>
            )
          })}
        </div>
      </div>
    </m.div>
  )
}
