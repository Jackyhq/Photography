import { clsxm } from '@afilmory/utils'
import { m, useAnimationControls } from 'motion/react'
import { useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react'

import { isAbortError } from '~/lib/abort-error'
import type { ImageLoaderManager } from '~/lib/image-loader-manager'

import type { LoadingIndicatorRef } from './LoadingIndicator'
import type { VideoSource } from './types'

interface LivePhotoVideoProps {
  /** Video source (Live Photo or Motion Photo) */
  videoSource: VideoSource
  /** 图片加载管理器实例 */
  imageLoaderManager: ImageLoaderManager
  /** 加载指示器引用 */
  loadingIndicatorRef: React.RefObject<LoadingIndicatorRef | null>
  /** 是否是当前图片 */
  isCurrentImage: boolean
  /** 自定义样式类名 */
  className?: string
  onPlayingChange?: (isPlaying: boolean) => void
  /** 是否自动播放一次 */
  shouldAutoPlayOnce?: boolean
}

export interface LivePhotoVideoHandle {
  play: () => void
  stop: () => void
  getIsVideoLoaded: () => boolean
}

export const LivePhotoVideo = ({
  ref,
  videoSource,
  imageLoaderManager,
  loadingIndicatorRef,
  isCurrentImage,
  className,
  onPlayingChange,
  shouldAutoPlayOnce = false,
}: LivePhotoVideoProps & {
  ref?: React.RefObject<LivePhotoVideoHandle | null>
}) => {
  const [isPlayingLivePhoto, setIsPlayingLivePhoto] = useState(false)
  const [livePhotoVideoLoaded, setLivePhotoVideoLoaded] = useState(false)
  const [isConvertingVideo, setIsConvertingVideo] = useState(false)
  const hasAutoPlayedRef = useRef(false)
  const playbackRequestRef = useRef(0)

  const videoRef = useRef<HTMLVideoElement>(null)
  const videoAnimateController = useAnimationControls()
  const presentationTimestampRef = useRef<number | undefined>(undefined)
  const videoType = videoSource.type
  const motionImageUrl = videoSource.type === 'motion-photo' ? videoSource.imageUrl : undefined
  const motionOffset = videoSource.type === 'motion-photo' ? videoSource.offset : undefined
  const motionSize = videoSource.type === 'motion-photo' ? videoSource.size : undefined
  const motionTimestamp = videoSource.type === 'motion-photo' ? videoSource.presentationTimestamp : undefined
  const liveVideoUrl = videoSource.type === 'live-photo' ? videoSource.videoUrl : undefined
  const stableVideoSource = useMemo<VideoSource>(() => {
    if (videoType === 'motion-photo' && motionImageUrl !== undefined && motionOffset !== undefined) {
      return {
        type: 'motion-photo',
        imageUrl: motionImageUrl,
        offset: motionOffset,
        size: motionSize,
        presentationTimestamp: motionTimestamp,
      }
    }
    if (videoType === 'live-photo' && liveVideoUrl !== undefined) {
      return { type: 'live-photo', videoUrl: liveVideoUrl }
    }
    return { type: 'none' }
  }, [videoType, motionImageUrl, motionOffset, motionSize, motionTimestamp, liveVideoUrl])

  useEffect(() => {
    onPlayingChange?.(isPlayingLivePhoto)
  }, [isPlayingLivePhoto, onPlayingChange])

  // Extract and track presentationTimestamp for Motion Photo
  useEffect(() => {
    if (stableVideoSource.type === 'motion-photo' && stableVideoSource.presentationTimestamp) {
      // Convert microseconds to seconds
      presentationTimestampRef.current = stableVideoSource.presentationTimestamp / 1_000_000
    } else {
      presentationTimestampRef.current = undefined
    }
  }, [stableVideoSource])

  useEffect(() => {
    if (!isCurrentImage || !videoRef.current || stableVideoSource.type === 'none') {
      return
    }

    const controller = new AbortController()
    let isCancelled = false
    setLivePhotoVideoLoaded(false)
    setIsConvertingVideo(true)
    const processVideo = async () => {
      try {
        await imageLoaderManager.processVideo(stableVideoSource, videoRef.current!, {
          signal: controller.signal,
          onLoadingStateUpdate: (state) => {
            loadingIndicatorRef.current?.updateLoadingState(state)
          },
        })

        if (!isCancelled) setLivePhotoVideoLoaded(true)
      } catch (videoError) {
        if (!isAbortError(videoError)) {
          console.error('Failed to process video:', videoError)
        }
      } finally {
        if (!isCancelled) setIsConvertingVideo(false)
      }
    }
    void processVideo()

    return () => {
      isCancelled = true
      controller.abort()
    }
  }, [isCurrentImage, stableVideoSource, imageLoaderManager, loadingIndicatorRef])

  useEffect(() => {
    if (!isCurrentImage) {
      playbackRequestRef.current += 1
      videoAnimateController.stop()

      const video = videoRef.current
      if (video) {
        video.pause()
        video.currentTime = 0
      }

      setIsPlayingLivePhoto(false)
      setLivePhotoVideoLoaded(false)
      setIsConvertingVideo(false)
      hasAutoPlayedRef.current = false

      videoAnimateController.set({ opacity: 0 })
    }
  }, [isCurrentImage, videoAnimateController])

  const play = useCallback(async () => {
    if (!livePhotoVideoLoaded || isPlayingLivePhoto || isConvertingVideo) return

    const requestId = ++playbackRequestRef.current
    setIsPlayingLivePhoto(true)

    try {
      await videoAnimateController.start({
        opacity: 1,
        transition: { duration: 0.15, ease: 'easeOut' },
      })
      if (requestId !== playbackRequestRef.current) return

      const video = videoRef.current
      if (video) {
        video.currentTime = 0
        await video.play()
      }
    } catch (error) {
      if (requestId !== playbackRequestRef.current) return
      console.error('Failed to play Live Photo video:', error)
      setIsPlayingLivePhoto(false)
      videoAnimateController.set({ opacity: 0 })
    }
  }, [livePhotoVideoLoaded, isPlayingLivePhoto, isConvertingVideo, videoAnimateController])

  const stop = useCallback(async () => {
    playbackRequestRef.current += 1
    videoAnimateController.stop()
    const video = videoRef.current
    if (video) {
      video.pause()
      video.currentTime = 0
    }
    await videoAnimateController.start({
      opacity: 0,
      transition: { duration: 0.2, ease: 'easeIn' },
    })
    setIsPlayingLivePhoto(false)
  }, [videoAnimateController])

  useEffect(
    () => () => {
      playbackRequestRef.current += 1
      videoAnimateController.stop()
    },
    [videoAnimateController],
  )

  // Auto-play effect - play once when video is loaded
  useEffect(() => {
    if (
      shouldAutoPlayOnce &&
      isCurrentImage &&
      livePhotoVideoLoaded &&
      !isPlayingLivePhoto &&
      !isConvertingVideo &&
      !hasAutoPlayedRef.current
    ) {
      hasAutoPlayedRef.current = true
      play()
    }
  }, [shouldAutoPlayOnce, isCurrentImage, livePhotoVideoLoaded, isPlayingLivePhoto, isConvertingVideo, play])

  useImperativeHandle(ref, () => ({
    play,
    stop,
    getIsVideoLoaded: () => livePhotoVideoLoaded,
  }))

  const handleVideoEnded = useCallback(() => {
    stop()
  }, [stop])

  // Handle Motion Photo presentation timestamp
  const handleTimeUpdate = useCallback(() => {
    const video = videoRef.current
    const timestamp = presentationTimestampRef.current

    // Only handle Motion Photo with valid timestamp
    if (!video || timestamp === undefined || stableVideoSource.type !== 'motion-photo') {
      return
    }

    // Stop playback when reaching or passing the presentation timestamp
    if (video.currentTime >= timestamp) {
      stop()
    }
  }, [stableVideoSource.type, stop])

  return (
    <m.video
      ref={videoRef}
      className={clsxm('pointer-events-none absolute inset-0 z-10 h-full w-full object-contain', className)}
      style={{
        opacity: isPlayingLivePhoto ? 1 : 0,
        transition: 'opacity 0.2s ease-in-out',
      }}
      muted
      playsInline
      onTimeUpdate={handleTimeUpdate}
      onEnded={handleVideoEnded}
      initial={{ opacity: 0 }}
      animate={videoAnimateController}
    />
  )
}

LivePhotoVideo.displayName = 'LivePhotoVideo'
