import { Thumbhash, useScrollViewElement } from '@afilmory/ui'
import clsx from 'clsx'
import { m } from 'motion/react'
import { Fragment, useCallback, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useContextPhotos, usePhotoViewer } from '~/hooks/usePhotoViewer'
import {
  CarbonIsoOutline,
  MaterialSymbolsShutterSpeed,
  StreamlineImageAccessoriesLensesPhotosCameraShutterPicturePhotographyPicturesPhotoLens,
  TablerAperture,
} from '~/icons'
import { isMobileDevice } from '~/lib/device-viewport'
import type { ImageLoaderManager } from '~/lib/image-loader-manager'
import { getImageFormat } from '~/lib/image-utils'
import type { PhotoManifest } from '~/types/photo'

const PRIORITY_IMAGE_COUNT = 6
const THUMBNAIL_SIZES = '(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 350px'

type VideoSource = Parameters<ImageLoaderManager['processVideo']>[0]

const formatDuration = (duration: number) => {
  const totalSeconds = Math.max(0, Math.round(duration))
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }

  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

export const MasonryPhotoItem = ({ data, width, index }: { data: PhotoManifest; width: number; index: number }) => {
  const photos = useContextPhotos()
  const photoViewer = usePhotoViewer()
  const { t } = useTranslation()
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)

  // Live Photo 相关状态
  const [isPlayingLivePhoto, setIsPlayingLivePhoto] = useState(false)
  const [livePhotoVideoLoaded, setLivePhotoVideoLoaded] = useState(false)
  const [isConvertingVideo, setIsConvertingVideo] = useState(false)
  const [videoConvertionError, setVideoConversionError] = useState<unknown>(null)
  const [shouldPreloadVideo, setShouldPreloadVideo] = useState(false)

  const itemRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const hoverTimerRef = useRef<NodeJS.Timeout | null>(null)
  const imageLoaderManagerRef = useRef<ImageLoaderManager | null>(null)
  const videoLoadStartedRef = useRef(false)
  const scrollElement = useScrollViewElement()
  const photoAlt = data.title || data.id
  const isPriorityImage = index < PRIORITY_IMAGE_COUNT

  const handleImageLoad = () => {
    setImageLoaded(true)
  }

  const handleImageError = () => {
    setImageError(true)
  }

  const handleClick = () => {
    const photoIndex = photos.findIndex((photo) => photo.id === data.id)
    if (photoIndex !== -1) {
      const triggerEl =
        imageRef.current?.parentElement instanceof HTMLElement ? imageRef.current.parentElement : imageRef.current

      photoViewer.openViewer(photoIndex, triggerEl ?? undefined)
    }
  }

  // 计算基于宽度的高度
  const calculatedHeight = width / data.aspectRatio

  // 格式化 EXIF 数据
  const formatExifData = () => {
    const { exif } = data

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

  useEffect(() => {
    if (!hasLivePhotoVideo || shouldPreloadVideo) return

    const item = itemRef.current
    if (!item || typeof IntersectionObserver === 'undefined') {
      setShouldPreloadVideo(true)
      return
    }

    const root = scrollElement && scrollElement !== document.body ? scrollElement : null
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldPreloadVideo(true)
          observer.disconnect()
        }
      },
      {
        root,
        rootMargin: isMobileDevice ? '400px 0px' : '1000px 0px',
        threshold: 0,
      },
    )

    observer.observe(item)

    return () => {
      observer.disconnect()
    }
  }, [hasLivePhotoVideo, scrollElement, shouldPreloadVideo])

  // Live Photo/Motion Photo 视频加载逻辑
  useEffect(() => {
    if (!photoVideo || !imageLoaded || !shouldPreloadVideo || videoLoadStartedRef.current || !videoRef.current) {
      return
    }

    let isCancelled = false
    videoLoadStartedRef.current = true

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
          await imageLoaderManager.processVideo(videoSource, videoRef.current!)
          if (!isCancelled) {
            setLivePhotoVideoLoaded(true)
          }
        }
      } catch (videoError) {
        console.error('Failed to process video:', videoError)
        if (!isCancelled) {
          setVideoConversionError(videoError)
        }
      } finally {
        if (!isCancelled) {
          setIsConvertingVideo(false)
        }
      }
    }

    loadVideo()

    return () => {
      isCancelled = true
      imageLoaderManager?.cleanup()
      if (imageLoaderManagerRef.current === imageLoaderManager) {
        imageLoaderManagerRef.current = null
      }
    }
  }, [photoVideo, originalUrl, imageLoaded, shouldPreloadVideo])

  // Live Photo/Motion Photo hover 处理（仅在桌面端）
  const handleMouseEnter = useCallback(() => {
    if (isMobileDevice || !hasLivePhotoVideo || !livePhotoVideoLoaded || isPlayingLivePhoto || isConvertingVideo) {
      return
    }

    hoverTimerRef.current = setTimeout(() => {
      setIsPlayingLivePhoto(true)
      const video = videoRef.current
      if (video) {
        video.currentTime = 0
        video.play()
      }
    }, 200) // 200ms hover 延迟
  }, [hasLivePhotoVideo, livePhotoVideoLoaded, isPlayingLivePhoto, isConvertingVideo])

  const handleMouseLeave = useCallback(() => {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current)
      hoverTimerRef.current = null
    }

    if (isPlayingLivePhoto) {
      setIsPlayingLivePhoto(false)
      const video = videoRef.current
      if (video) {
        video.pause()
        video.currentTime = 0
      }
    }
  }, [isPlayingLivePhoto])

  // 视频播放结束处理
  const handleVideoEnded = useCallback(() => {
    setIsPlayingLivePhoto(false)
  }, [])

  // 清理定时器
  useEffect(() => {
    return () => {
      if (hoverTimerRef.current) {
        clearTimeout(hoverTimerRef.current)
        hoverTimerRef.current = null
      }
    }
  }, [])

  return (
    <m.div
      ref={itemRef}
      className="bg-fill-quaternary group relative w-full cursor-pointer overflow-hidden"
      style={{
        width,
        height: calculatedHeight,
      }}
      data-photo-id={data.id}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
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
            ref={imageRef}
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
      {imageError && (
        <div className="bg-fill-quaternary text-text-tertiary absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <i className="i-mingcute-image-line text-2xl" />
            <p className="mt-2 text-sm">{t('photo.error.loading')}</p>
          </div>
        </div>
      )}

      {/* 独立视频标识 */}
      {isVideoMedia && (
        <>
          <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
            <div className="flex size-12 items-center justify-center rounded-full bg-black/45 text-white shadow-lg backdrop-blur-md transition-transform duration-300 group-hover:scale-110">
              <i className="i-mingcute-play-fill ml-0.5 size-6" />
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
      )}

      {/* Live Photo/Motion Photo 标识 */}
      {hasLivePhotoVideo && (
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
                  <div
                    className="text-yellow w-3 text-center font-bold"
                    title={(videoConvertionError as Error).message}
                  >
                    !
                  </div>
                </span>
              ) : null}
            </Fragment>
          )}
        </div>
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
              <h3 className="mb-2 truncate text-sm font-medium opacity-0 group-hover:opacity-100">{data.title}</h3>
              {data.description && (
                <p className="mb-2 line-clamp-2 text-sm text-white/80 opacity-0 group-hover:opacity-100">
                  {data.description}
                </p>
              )}

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
    </m.div>
  )
}
