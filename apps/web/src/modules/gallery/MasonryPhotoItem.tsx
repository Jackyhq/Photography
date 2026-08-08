import {
  CarbonIsoOutline,
  MaterialSymbolsShutterSpeed,
  StreamlineImageAccessoriesLensesPhotosCameraShutterPicturePhotographyPicturesPhotoLens,
  TablerAperture,
} from '@afilmory/ui/icons'
import { Thumbhash } from '@afilmory/ui/thumbhash'
import clsx from 'clsx'
import { m } from 'motion/react'
import type { KeyboardEvent, PointerEvent as ReactPointerEvent } from 'react'
import { Fragment, memo, useCallback, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useOpenPhotoViewer } from '~/hooks/usePhotoViewer'
import { isAbortError } from '~/lib/abort-error'
import { isMobileDevice } from '~/lib/device-viewport'
import { formatDuration } from '~/lib/format-duration'
import type { ImageLoaderManager } from '~/lib/image-loader-manager'
import { getImageFormat } from '~/lib/image-utils'
import { getLocalizedPhotoTitle, getPhotoAltText } from '~/lib/photo-description'
import type { PhotoManifest } from '~/types/photo'

const PRIORITY_IMAGE_COUNT = 6
const THUMBNAIL_SIZES = '(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 350px'
const TOUCH_LONG_PRESS_DELAY = 450

type VideoSource = Parameters<ImageLoaderManager['processVideo']>[0]

const PhotoErrorOverlay = () => {
  const { t } = useTranslation()

  return (
    <div className="bg-fill-quaternary text-text-tertiary absolute inset-0 flex items-center justify-center">
      <div className="text-center">
        <i className="i-mingcute-image-line text-2xl" />
        <p className="mt-2 text-sm">{t('photo.error.loading')}</p>
      </div>
    </div>
  )
}

const MasonryPhotoTitle = ({ title }: { title: string }) => {
  return <h3 className="mb-2 truncate text-sm font-medium opacity-0 group-hover:opacity-100">{title}</h3>
}

const VideoMediaBadge = ({ formattedDuration }: { formattedDuration: string | null }) => {
  const { t } = useTranslation()

  return (
    <>
      <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center opacity-100 transition-opacity duration-200 group-hover:opacity-0">
        <div className="flex size-10 items-center justify-center rounded-full bg-black/45 text-white shadow-lg backdrop-blur-md">
          <i className="i-mingcute-play-fill ml-0.5 size-5" />
        </div>
      </div>
      <div className="absolute top-2 left-2 z-20 flex items-center gap-1 rounded-xl bg-black/50 px-2 py-1 text-xs text-white">
        <i className="i-mingcute-video-line size-4" />
        <span>{t('photo.video.badge', { defaultValue: 'Video' })}</span>
      </div>
      {formattedDuration && (
        <div className="absolute right-2 bottom-2 z-20 rounded bg-black/60 px-1.5 py-0.5 text-xs font-medium text-white">
          {formattedDuration}
        </div>
      )}
    </>
  )
}

const LivePhotoIndicator = ({
  isConvertingVideo,
  videoConvertionError,
}: {
  isConvertingVideo: boolean
  videoConvertionError: unknown
}) => {
  const { t } = useTranslation()

  return (
    <div
      className={clsx(
        'absolute z-20 flex items-center space-x-1 rounded-xl bg-black/50 px-1 py-1 text-xs text-white transition-all duration-200 hover:bg-black/70',
        'top-2 left-2',
        'flex-wrap gap-y-1',
      )}
      title={isMobileDevice ? t('photo.live.tooltip.mobile.main') : t('photo.live.tooltip.desktop.main')}
    >
      {isConvertingVideo ? (
        <div className="flex items-center gap-1 px-1">
          <i className="i-mingcute-loading-line animate-spin" />
          <span>{t('loading.converting')}</span>
        </div>
      ) : (
        <Fragment>
          <i className="i-mingcute-live-photo-line size-4 shrink-0" />
          <span className="mr-1 shrink-0">{t('photo.live.badge')}</span>
          {videoConvertionError ? (
            <span className={'bg-warning/20 ml-0.5 rounded px-1 text-xs'}>
              <div className="text-yellow w-3 text-center font-bold" title={(videoConvertionError as Error).message}>
                !
              </div>
            </span>
          ) : null}
        </Fragment>
      )}
    </div>
  )
}

interface MasonryPhotoItemProps {
  data: PhotoManifest
  width: number
  index: number
  tabIndex: number
  onFocus: (photoId: string) => void
  onKeyDown: (event: KeyboardEvent<HTMLButtonElement>, index: number) => void
}

const MasonryPhotoItemBase = ({ data, width, index, tabIndex, onFocus, onKeyDown }: MasonryPhotoItemProps) => {
  const { i18n } = useTranslation()
  const { openViewerByPhotoId } = useOpenPhotoViewer()
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)

  // Live Photo 相关状态
  const [isPlayingLivePhoto, setIsPlayingLivePhoto] = useState(false)
  const [livePhotoVideoLoaded, setLivePhotoVideoLoaded] = useState(false)
  const [isConvertingVideo, setIsConvertingVideo] = useState(false)
  const [videoConvertionError, setVideoConversionError] = useState<unknown>(null)
  const [shouldPreloadVideo, setShouldPreloadVideo] = useState(false)

  const itemRef = useRef<HTMLButtonElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const hoverTimerRef = useRef<NodeJS.Timeout | null>(null)
  const longPressTimerRef = useRef<NodeJS.Timeout | null>(null)
  const imageLoaderManagerRef = useRef<ImageLoaderManager | null>(null)
  const videoAbortControllerRef = useRef<AbortController | null>(null)
  const videoLoadStartedRef = useRef(false)
  const isPointerInsideRef = useRef(false)
  const activeTouchPointerRef = useRef<number | null>(null)
  const touchLongPressTriggeredRef = useRef(false)
  const locale = i18n.resolvedLanguage ?? i18n.language
  const photoAlt = getPhotoAltText(data, locale)
  const photoTitle = getLocalizedPhotoTitle(data, locale) || data.id
  const isPriorityImage = index < PRIORITY_IMAGE_COUNT

  const handleImageLoad = () => {
    setImageLoaded(true)
  }

  const handleImageError = () => {
    setImageError(true)
  }

  const handleClick = () => {
    openViewerByPhotoId(data.id, { element: itemRef.current ?? undefined })
  }

  const handleFocus = () => {
    onFocus(data.id)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    onKeyDown(event, index)
  }

  // 计算基于宽度的高度
  const calculatedHeight = width / data.aspectRatio

  // 格式化 EXIF 数据
  const formatExifData = () => {
    const exif = data.galleryExif ?? data.exif

    // 安全处理：如果 exif 不存在或为空，则返回空对象
    if (!exif) {
      return {
        focalLength35mm: null,
        iso: null,
        shutterSpeed: null,
        aperture: null,
      }
    }

    // 等效焦距 (35mm)
    const focalLength35mm = exif.FocalLengthIn35mmFormat
      ? Number.parseInt(exif.FocalLengthIn35mmFormat)
      : exif.FocalLength
        ? Number.parseInt(exif.FocalLength)
        : null

    // ISO
    const iso = exif.ISO

    // 快门速度
    const exposureTime = exif.ExposureTime
    const shutterSpeed = exposureTime ? `${exposureTime}s` : null

    // 光圈
    const aperture = exif.FNumber ? `f/${exif.FNumber}` : null

    return {
      focalLength35mm,
      iso,
      shutterSpeed,
      aperture,
    }
  }

  const exifData = formatExifData()

  // 使用通用的图片格式提取函数
  const imageFormat = getImageFormat(data.originalUrl || data.s3Key || '')

  const isVideoMedia = data.mediaType === 'video'
  const formattedDuration = isVideoMedia && data.duration ? formatDuration(data.duration) : null

  // 检查是否有实况视频内容（Live Photo 或 Motion Photo）
  const { video: photoVideo, originalUrl } = data
  const hasLivePhotoVideo = !isVideoMedia && photoVideo !== undefined

  useEffect(() => {
    videoLoadStartedRef.current = false
    setShouldPreloadVideo(false)
    setLivePhotoVideoLoaded(false)
    setIsConvertingVideo(false)
    setVideoConversionError(null)
    setIsPlayingLivePhoto(false)
  }, [data.id])

  // Live Photo/Motion Photo 视频加载逻辑
  useEffect(() => {
    if (!photoVideo || !imageLoaded || !shouldPreloadVideo || videoLoadStartedRef.current || !videoRef.current) {
      return
    }

    let isCancelled = false
    videoLoadStartedRef.current = true
    const abortController = new AbortController()
    videoAbortControllerRef.current = abortController

    let imageLoaderManager: ImageLoaderManager | null = null

    const loadVideo = async () => {
      setIsConvertingVideo(true)

      try {
        const imageLoaderManagerModule = await import('~/lib/image-loader-manager')
        if (isCancelled) return

        imageLoaderManager = new imageLoaderManagerModule.ImageLoaderManager()
        imageLoaderManagerRef.current = imageLoaderManager

        // 构造 VideoSource（适配前端格式）- 使用 type narrowing
        let videoSource: VideoSource

        if (photoVideo.type === 'motion-photo') {
          videoSource = {
            type: 'motion-photo',
            imageUrl: originalUrl,
            offset: photoVideo.offset,
            size: photoVideo.size,
            presentationTimestamp: photoVideo.presentationTimestamp,
          }
        } else if (photoVideo.type === 'live-photo') {
          videoSource = {
            type: 'live-photo',
            videoUrl: photoVideo.videoUrl,
          }
        } else {
          videoSource = { type: 'none' }
        }

        if (videoSource.type !== 'none') {
          await imageLoaderManager.processVideo(videoSource, videoRef.current!, { signal: abortController.signal })
          if (!isCancelled) {
            setLivePhotoVideoLoaded(true)
            if (isPointerInsideRef.current && videoRef.current) {
              setIsPlayingLivePhoto(true)
              videoRef.current.currentTime = 0
              void videoRef.current.play()
            }
          }
        }
      } catch (videoError) {
        const wasAborted = isAbortError(videoError)
        if (!wasAborted) {
          console.error('Failed to process video:', videoError)
        }
        if (!isCancelled && !wasAborted) {
          setVideoConversionError(videoError)
        }
      } finally {
        if (!isCancelled) {
          setIsConvertingVideo(false)
        }
        if (videoAbortControllerRef.current === abortController) {
          videoAbortControllerRef.current = null
        }
      }
    }

    loadVideo()

    return () => {
      isCancelled = true
      abortController.abort()
      videoLoadStartedRef.current = false
      imageLoaderManager?.cleanup()
      if (imageLoaderManagerRef.current === imageLoaderManager) {
        imageLoaderManagerRef.current = null
      }
    }
  }, [photoVideo, originalUrl, imageLoaded, shouldPreloadVideo])

  const releaseLivePhotoPreview = useCallback((updateState = true) => {
    videoAbortControllerRef.current?.abort()
    videoAbortControllerRef.current = null
    imageLoaderManagerRef.current?.cleanup()
    imageLoaderManagerRef.current = null
    videoLoadStartedRef.current = false

    const video = videoRef.current
    if (video) {
      video.pause()
      video.removeAttribute('src')
      video.load()
    }

    if (updateState) {
      setShouldPreloadVideo(false)
      setLivePhotoVideoLoaded(false)
      setIsConvertingVideo(false)
      setVideoConversionError(null)
      setIsPlayingLivePhoto(false)
    }
  }, [])

  // Live Photo/Motion Photo hover 处理（仅在桌面端）
  const handleMouseEnter = useCallback(() => {
    if (isMobileDevice || !hasLivePhotoVideo || isPlayingLivePhoto) {
      return
    }

    isPointerInsideRef.current = true
    hoverTimerRef.current = setTimeout(() => {
      if (livePhotoVideoLoaded && videoRef.current) {
        setIsPlayingLivePhoto(true)
        const video = videoRef.current
        video.currentTime = 0
        void video.play()
      } else if (!isConvertingVideo) {
        setShouldPreloadVideo(true)
      }
    }, 200) // 200ms hover 延迟
  }, [hasLivePhotoVideo, livePhotoVideoLoaded, isPlayingLivePhoto, isConvertingVideo])

  const handleMouseLeave = useCallback(() => {
    isPointerInsideRef.current = false
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current)
      hoverTimerRef.current = null
    }

    if (!hasLivePhotoVideo) return
    releaseLivePhotoPreview()
  }, [hasLivePhotoVideo, releaseLivePhotoPreview])

  const resetTouchLivePhoto = useCallback(
    (updateState = true) => {
      if (longPressTimerRef.current) {
        clearTimeout(longPressTimerRef.current)
        longPressTimerRef.current = null
      }

      const shouldResetMedia = touchLongPressTriggeredRef.current
      activeTouchPointerRef.current = null
      touchLongPressTriggeredRef.current = false
      isPointerInsideRef.current = false

      if (!shouldResetMedia) return

      releaseLivePhotoPreview(updateState)
    },
    [releaseLivePhotoPreview],
  )

  const handlePointerDown = useCallback(
    (event: ReactPointerEvent<HTMLButtonElement>) => {
      if (event.pointerType !== 'touch' || !hasLivePhotoVideo) return

      resetTouchLivePhoto()
      activeTouchPointerRef.current = event.pointerId
      longPressTimerRef.current = setTimeout(() => {
        if (activeTouchPointerRef.current !== event.pointerId) return

        longPressTimerRef.current = null
        touchLongPressTriggeredRef.current = true
        isPointerInsideRef.current = true
        if (livePhotoVideoLoaded && videoRef.current) {
          setIsPlayingLivePhoto(true)
          videoRef.current.currentTime = 0
          void videoRef.current.play()
        } else {
          setShouldPreloadVideo(true)
        }
      }, TOUCH_LONG_PRESS_DELAY)
    },
    [hasLivePhotoVideo, livePhotoVideoLoaded, resetTouchLivePhoto],
  )

  const handlePointerEnd = useCallback(
    (event: ReactPointerEvent<HTMLButtonElement>) => {
      if (event.pointerType === 'touch' && activeTouchPointerRef.current === event.pointerId) {
        resetTouchLivePhoto()
      }
    },
    [resetTouchLivePhoto],
  )

  // 视频播放结束处理
  const handleVideoEnded = useCallback(() => {
    setIsPlayingLivePhoto(false)
  }, [])

  // 清理定时器
  useEffect(() => {
    return () => {
      isPointerInsideRef.current = false
      videoAbortControllerRef.current?.abort()
      resetTouchLivePhoto(false)
      if (hoverTimerRef.current) {
        clearTimeout(hoverTimerRef.current)
        hoverTimerRef.current = null
      }
    }
  }, [resetTouchLivePhoto])

  return (
    <m.button
      ref={itemRef}
      type="button"
      aria-label={photoAlt}
      className="bg-fill-quaternary group focus-visible:outline-accent relative block w-full cursor-pointer overflow-hidden border-0 p-0 text-left focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-2"
      style={{
        width,
        height: calculatedHeight,
      }}
      data-photo-id={data.id}
      tabIndex={tabIndex}
      onClick={handleClick}
      onFocus={handleFocus}
      onKeyDown={handleKeyDown}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerEnd}
      onPointerCancel={handlePointerEnd}
      onPointerLeave={handlePointerEnd}
    >
      {/* Blurhash 占位符 */}
      {data.thumbHash && <Thumbhash thumbHash={data.thumbHash} className="absolute inset-0" />}

      {!imageError && (
        <picture className="absolute inset-0 block h-full w-full">
          {data.thumbnailWebpSrcSet && (
            <source type="image/webp" srcSet={data.thumbnailWebpSrcSet} sizes={THUMBNAIL_SIZES} />
          )}
          {data.thumbnailSrcSet && <source srcSet={data.thumbnailSrcSet} sizes={THUMBNAIL_SIZES} />}
          <img
            src={data.thumbnailUrl}
            alt={photoAlt}
            className={clsx('h-full w-full object-cover duration-300 group-hover:scale-105')}
            onLoad={handleImageLoad}
            onError={handleImageError}
            loading={isPriorityImage ? 'eager' : 'lazy'}
            fetchPriority={isPriorityImage ? 'high' : 'auto'}
            decoding="async"
            sizes={THUMBNAIL_SIZES}
          />
        </picture>
      )}

      {/* Live Photo/Motion Photo 视频 */}
      {hasLivePhotoVideo && (
        <video
          ref={videoRef}
          className={clsx(
            'absolute inset-0 h-full w-full object-cover duration-300 group-hover:scale-105',
            isPlayingLivePhoto ? 'z-10' : 'pointer-events-none opacity-0',
          )}
          muted
          playsInline
          onEnded={handleVideoEnded}
        />
      )}

      {/* 错误状态 */}
      {imageError && <PhotoErrorOverlay />}

      {/* 独立视频标识 */}
      {isVideoMedia && <VideoMediaBadge formattedDuration={formattedDuration} />}

      {/* Live Photo/Motion Photo 标识 */}
      {hasLivePhotoVideo && (
        <LivePhotoIndicator isConvertingVideo={isConvertingVideo} videoConvertionError={videoConvertionError} />
      )}

      {/* 图片信息和 EXIF 覆盖层 */}
      {imageLoaded && (
        <div className="pointer-events-none">
          {/* 渐变背景 - 独立的层 */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          {/* 内容层 - 独立的层以支持 backdrop-filter */}
          <div className="absolute inset-x-0 bottom-0 p-4 pb-0 text-white">
            {/* 基本信息和标签 section */}
            <div className="mb-3 [&_*]:duration-300">
              <MasonryPhotoTitle title={photoTitle} />

              {/* 基本信息 */}
              <div className="mb-2 flex flex-wrap gap-2 text-xs text-white/80 opacity-0 group-hover:opacity-100">
                <span>{imageFormat}</span>
                <span>•</span>
                <span>
                  {data.width} × {data.height}
                </span>
                <span>•</span>
                <span>{(data.size / 1024 / 1024).toFixed(1)}MB</span>
                {formattedDuration && (
                  <>
                    <span>•</span>
                    <span>{formattedDuration}</span>
                  </>
                )}
              </div>

              {/* Tags */}
              {data.tags && data.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {data.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-white/20 px-2 py-0.5 text-xs text-white/90 opacity-0 backdrop-blur-sm group-hover:opacity-100"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* EXIF 信息网格 */}
            {calculatedHeight >= 200 && (
              <div className="grid grid-cols-2 gap-2 pb-4 text-xs">
                {exifData.focalLength35mm && (
                  <div className="flex items-center gap-1.5 rounded-md bg-white/10 px-2 py-1 opacity-0 backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100">
                    <StreamlineImageAccessoriesLensesPhotosCameraShutterPicturePhotographyPicturesPhotoLens className="text-white/70" />
                    <span className="text-white/90">{exifData.focalLength35mm}mm</span>
                  </div>
                )}

                {exifData.aperture && (
                  <div className="flex items-center gap-1.5 rounded-md bg-white/10 px-2 py-1 opacity-0 backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100">
                    <TablerAperture className="text-white/70" />
                    <span className="text-white/90">{exifData.aperture}</span>
                  </div>
                )}

                {exifData.shutterSpeed && (
                  <div className="flex items-center gap-1.5 rounded-md bg-white/10 px-2 py-1 opacity-0 backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100">
                    <MaterialSymbolsShutterSpeed className="text-white/70" />
                    <span className="text-white/90">{exifData.shutterSpeed}</span>
                  </div>
                )}

                {exifData.iso && (
                  <div className="flex items-center gap-1.5 rounded-md bg-white/10 px-2 py-1 opacity-0 backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100">
                    <CarbonIsoOutline className="text-white/70" />
                    <span className="text-white/90">ISO {exifData.iso}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </m.button>
  )
}

export const MasonryPhotoItem = memo(
  MasonryPhotoItemBase,
  (previous, next) =>
    previous.data === next.data &&
    previous.width === next.width &&
    previous.index === next.index &&
    previous.tabIndex === next.tabIndex &&
    previous.onFocus === next.onFocus &&
    previous.onKeyDown === next.onKeyDown,
)
