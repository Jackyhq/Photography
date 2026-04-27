import { clsxm } from '@afilmory/utils'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import type { PhotoManifest } from '~/types/photo'

export const VideoViewer = ({
  media,
  isCurrent,
  className,
}: {
  media: PhotoManifest
  isCurrent: boolean
  className?: string
}) => {
  const { t } = useTranslation()
  const videoRef = useRef<HTMLVideoElement>(null)
  const [hasError, setHasError] = useState(false)
  const src = getVideoSourceUrl(media)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    if (!isCurrent) {
      video.pause()
      video.currentTime = 0
    }
  }, [isCurrent])

  useEffect(() => {
    setHasError(false)
    const video = videoRef.current

    return () => {
      if (video) {
        video.pause()
        video.removeAttribute('src')
        video.load()
      }
    }
  }, [src])

  return (
    <div className={clsxm('relative flex h-full w-full items-center justify-center overflow-hidden', className)}>
      <video
        ref={videoRef}
        key={src}
        src={src}
        className="max-h-full max-w-full bg-black object-contain"
        poster={media.thumbnailUrl}
        controls
        playsInline
        preload="metadata"
        onError={() => setHasError(true)}
      />

      {hasError && (
        <div className="bg-material-ultra-thick pointer-events-none absolute inset-0 flex items-center justify-center text-white backdrop-blur-2xl">
          <div className="text-center">
            <i className="i-mingcute-video-line text-3xl" />
            <p className="mt-2 text-sm">{t('video.error.loading', { defaultValue: 'Failed to load video' })}</p>
          </div>
        </div>
      )}
    </div>
  )
}

function getVideoSourceUrl(media: PhotoManifest): string {
  if (import.meta.env.DEV && media.s3Key) {
    return `/photos/${media.s3Key.split('/').map(encodeURIComponent).join('/')}`
  }

  return media.videoUrl || media.originalUrl
}
