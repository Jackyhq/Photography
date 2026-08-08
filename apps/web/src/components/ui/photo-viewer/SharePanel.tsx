import { glassInnerGlowBackground, glassSurfaceStyle, RootPortal } from '@afilmory/ui'
import { clsxm, Spring } from '@afilmory/utils'
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import { AnimatePresence, m } from 'motion/react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'

import { injectConfig, siteConfig } from '~/config'
import { isAbortError } from '~/lib/abort-error'
import { getLocalizedPhotoTitle } from '~/lib/photo-description'
import type { PhotoManifest } from '~/types/photo'

import { openInstagramShare } from './instagram-share'
import { fetchShareMediaBlob, openNativeShare } from './share-media'
import { createSocialShareUrl, openSocialShareWindow } from './social-share'

interface SharePanelProps {
  photo: PhotoManifest
  trigger: React.ReactNode
  blobSrc?: string
}

interface ShareOption {
  id: string
  label: string
  icon: string
  action: () => Promise<void> | void
  color?: string
  bgColor?: string
}

interface SocialShareOptionBase {
  label: string
  icon: string
  color: string
  bgColor: string
}

type SocialShareOption = SocialShareOptionBase &
  ({ id: 'instagram'; url?: never } | { id: 'twitter' | 'facebook' | 'telegram'; url: string })

const SOCIAL_SHARE_OPTIONS = [
  {
    id: 'instagram',
    label: 'Instagram',
    icon: 'i-mingcute-instagram-line',
    color: 'text-white',
    bgColor: 'bg-gradient-to-br from-[#833AB4] via-[#E1306C] to-[#FCAF45]',
  },
  {
    id: 'twitter',
    label: 'Twitter',
    icon: 'i-mingcute-twitter-fill',
    url: 'https://twitter.com/intent/tweet?text={text}&url={url}',
    color: 'text-white',
    bgColor: 'bg-sky-500',
  },
  {
    id: 'facebook',
    label: 'Facebook',
    icon: 'i-mingcute-facebook-line',
    url: 'https://www.facebook.com/sharer/sharer.php?u={url}',
    color: 'text-white',
    bgColor: 'bg-[#1877F2]',
  },
  {
    id: 'telegram',
    label: 'Telegram',
    icon: 'i-mingcute-telegram-line',
    url: 'https://t.me/share/url?url={url}&text={text}',
    color: 'text-white',
    bgColor: 'bg-[#0088CC]',
  },
] satisfies readonly SocialShareOption[]

export const SharePanel = ({ photo, trigger, blobSrc }: SharePanelProps) => {
  const { i18n, t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const [isPreparingShare, setIsPreparingShare] = useState(false)
  const shareAbortControllerRef = useRef<AbortController | null>(null)
  const localizedTitle = getLocalizedPhotoTitle(photo, i18n.resolvedLanguage ?? i18n.language)

  const handleNativeShare = useCallback(async () => {
    const shareUrl = window.location.href
    const shareTitle = localizedTitle || t('photo.share.default.title')
    const shareText = t('photo.share.text', { title: shareTitle })
    const isVideoMedia = photo.mediaType === 'video'

    const abortController = new AbortController()
    shareAbortControllerRef.current?.abort()
    shareAbortControllerRef.current = abortController
    setIsPreparingShare(true)

    try {
      // 图片优先使用 blobSrc（转换后的图片）；独立视频始终分享原视频。
      const mediaUrl = isVideoMedia ? photo.videoUrl || photo.originalUrl : blobSrc || photo.originalUrl
      let file: File | undefined

      try {
        const blob = await fetchShareMediaBlob(mediaUrl, isVideoMedia ? 'video' : 'image', abortController.signal)
        const fallbackExtension = isVideoMedia ? getExtension(mediaUrl) || 'mp4' : 'jpg'
        file = new File([blob], `${localizedTitle || (isVideoMedia ? 'video' : 'photo')}.${fallbackExtension}`, {
          type: blob.type || photo.mimeType || (isVideoMedia ? 'video/mp4' : 'image/jpeg'),
        })
      } catch (error) {
        if (isAbortError(error)) throw error
        // A link share is still useful when media preparation fails or is too large.
        console.warn('Unable to prepare media for native sharing; sharing the link instead.', error)
      }

      // 检查是否支持文件分享
      const shareResult = await openNativeShare(
        navigator.share.bind(navigator),
        file && navigator.canShare?.({ files: [file] })
          ? {
              title: shareTitle,
              text: shareText,
              url: shareUrl,
              files: [file],
            }
          : {
              title: shareTitle,
              text: shareText,
              url: shareUrl,
            },
      )
      if (shareResult === 'cancelled') return

      setIsOpen(false)
    } catch (error) {
      if (!isAbortError(error)) {
        toast.error(t('photo.share.failed'))
      }
    } finally {
      if (shareAbortControllerRef.current === abortController) {
        shareAbortControllerRef.current = null
        setIsPreparingShare(false)
      }
    }
  }, [photo.mediaType, photo.videoUrl, photo.originalUrl, photo.mimeType, localizedTitle, blobSrc, t])

  const handleOpenChange = useCallback((open: boolean) => {
    if (!open) shareAbortControllerRef.current?.abort()
    setIsOpen(open)
  }, [])

  useEffect(
    () => () => {
      shareAbortControllerRef.current?.abort()
    },
    [],
  )

  const handleCopyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      toast.success(t('photo.share.link.copied'))
      setIsOpen(false)
    } catch {
      toast.error(t('photo.share.copy.failed'))
    }
  }, [t])
  const shareCodeRef = useRef<HTMLElement>(null)

  const handleCopyEmbedCode = useCallback(async () => {
    try {
      const embedCode = shareCodeRef.current?.textContent
      if (embedCode) {
        await navigator.clipboard.writeText(embedCode)
      }
      toast.success(t('photo.share.embed.copied'))
      setIsOpen(false)
    } catch {
      toast.error(t('photo.share.copy.failed'))
    }
  }, [t])

  const handleSocialShare = useCallback(
    (template: string) => {
      const defaultTitle = t('photo.share.default.title')
      const shareTitle = localizedTitle || defaultTitle
      const finalUrl = createSocialShareUrl(template, {
        url: window.location.href,
        title: shareTitle,
        text: t('photo.share.text', { title: shareTitle }),
      })

      openSocialShareWindow(finalUrl)
      setIsOpen(false)
    },
    [localizedTitle, t],
  )

  const handleInstagramShare = useCallback(() => {
    const shareTitle = localizedTitle || t('photo.share.default.title')
    setIsPreparingShare(true)

    // Do not await before invoking openInstagramShare: navigator.share needs
    // the transient user activation from this click handler.
    void openInstagramShare({
      title: shareTitle,
      text: t('photo.share.text', { title: shareTitle }),
      url: window.location.href,
    })
      .then((result) => {
        if (result === 'cancelled') return
        if (result === 'fallback-copied') {
          toast.success(t('photo.share.instagram.link.copied'))
        } else if (result === 'fallback-opened') {
          toast.info(t('photo.share.instagram.opened'))
        }
        setIsOpen(false)
      })
      .catch((error) => {
        if (!isAbortError(error)) toast.error(t('photo.share.failed'))
      })
      .finally(() => setIsPreparingShare(false))
  }, [localizedTitle, t])

  // 功能选项
  const actionOptions: ShareOption[] = [
    ...(typeof navigator !== 'undefined' && 'share' in navigator
      ? [
          {
            id: 'native-share',
            label: t('photo.share.system'),
            icon: 'i-mingcute-share-2-line',
            action: handleNativeShare,
            color: 'text-blue-500',
          },
        ]
      : []),
    {
      id: 'copy-link',
      label: t('photo.share.copy.link'),
      icon: 'i-mingcute-link-line',
      action: handleCopyLink,
    },
    {
      id: 'copy-embed',
      label: t('photo.share.embed.code'),
      icon: 'i-mingcute-code-line',
      action: handleCopyEmbedCode,
      color: 'text-purple-500',
    },
  ]

  return (
    <DropdownMenuPrimitive.Root open={isOpen} onOpenChange={handleOpenChange}>
      <DropdownMenuPrimitive.Trigger asChild>{trigger}</DropdownMenuPrimitive.Trigger>

      <AnimatePresence>
        {isOpen && (
          <RootPortal>
            <DropdownMenuPrimitive.Content
              align="end"
              sideOffset={8}
              className="z-10000 min-w-[280px] will-change-[opacity,transform]"
              asChild
            >
              <m.div
                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={Spring.presets.smooth}
                className="border-accent/20 rounded-2xl border p-4 backdrop-blur-2xl"
                style={glassSurfaceStyle}
              >
                {/* Inner glow layer */}
                <div
                  className="pointer-events-none absolute inset-0 rounded-2xl"
                  style={{ background: glassInnerGlowBackground }}
                />
                {/* 标题区域 */}
                <div className="relative mb-4 text-center">
                  <h3 className="text-text font-semibold">{t('photo.share.title')}</h3>
                  {localizedTitle && <p className="text-text-secondary mt-1 line-clamp-1 text-sm">{localizedTitle}</p>}
                </div>

                {/* 社交媒体分享 - 第一排 */}
                <div className="relative mb-6">
                  <div className="mb-3">
                    <h4 className="text-text-secondary text-xs font-medium tracking-wide uppercase">
                      {t('photo.share.social.media')}
                    </h4>
                  </div>
                  <div className="flex gap-6 px-2">
                    {SOCIAL_SHARE_OPTIONS.map((option) => (
                      <button
                        key={option.id}
                        type="button"
                        className="group flex flex-col items-center gap-2"
                        onClick={() =>
                          option.id === 'instagram' ? void handleInstagramShare() : handleSocialShare(option.url)
                        }
                        disabled={option.id === 'instagram' && isPreparingShare}
                        aria-busy={option.id === 'instagram' && isPreparingShare}
                      >
                        <div
                          className={clsxm(
                            'flex size-12 items-center justify-center rounded-full transition-all duration-200',
                            option.bgColor,
                            'group-hover:scale-110 group-active:scale-95',
                            'shadow-lg',
                          )}
                        >
                          <i
                            className={clsxm(
                              option.id === 'instagram' && isPreparingShare
                                ? 'i-mingcute-loading-3-line animate-spin'
                                : option.icon,
                              'size-5',
                              option.color,
                            )}
                            aria-hidden="true"
                          />
                        </div>
                        <span className="text-text-secondary text-xs font-medium">{option.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 嵌入代码 - 第二排 */}
                {injectConfig.useNext && (
                  <div className="relative mb-6">
                    <div className="mb-3">
                      <h4 className="text-text-secondary text-xs font-medium tracking-wide uppercase">
                        {t('photo.share.embed.code')}
                      </h4>
                      <p className="text-text-tertiary mt-1 text-xs">{t('photo.share.embed.description')}</p>
                    </div>
                    <div className="relative">
                      <div className="border-accent/20 bg-accent/5 rounded-lg border p-3">
                        <code
                          ref={(ref) => {
                            if (ref) {
                              shareCodeRef.current = ref
                            }
                            return () => {
                              shareCodeRef.current = null
                            }
                          }}
                          className="text-text-secondary font-mono text-xs break-all whitespace-pre select-all"
                        >
                          {`<iframe
  src="${siteConfig.url.replace(/\/$/, '')}/share/iframe?id=${photo.id}"
  style="width: 100%; aspect-ratio: ${photo.width} / ${photo.height}"
  allowTransparency
  sandbox="allow-scripts allow-same-origin allow-popups"
/>`}
                        </code>
                      </div>
                      <button
                        type="button"
                        className="glassmorphic-btn border-accent/20 bg-accent/5 absolute top-2 right-2 flex size-7 items-center justify-center rounded-md border backdrop-blur-3xl transition-all duration-200"
                        onClick={handleCopyEmbedCode}
                      >
                        <i className="i-mingcute-copy-line size-3.5" />
                      </button>
                    </div>
                  </div>
                )}

                {/* 功能选项 - 第三排 */}
                <div className="relative">
                  <div className="mb-3">
                    <h4 className="text-text-secondary text-xs font-medium tracking-wide uppercase">
                      {t('photo.share.actions')}
                    </h4>
                  </div>
                  <div className="grid grid-cols-2 gap-1">
                    {actionOptions
                      .filter((option) => option.id !== 'copy-embed')
                      .map((option) => (
                        <button
                          key={option.id}
                          type="button"
                          className="glassmorphic-btn group relative flex cursor-pointer items-center rounded-lg px-2 py-2 text-sm transition-all duration-200 outline-none select-none"
                          onClick={() => option.action()}
                          disabled={option.id === 'native-share' && isPreparingShare}
                          aria-busy={option.id === 'native-share' && isPreparingShare}
                        >
                          <div className="flex items-center gap-2">
                            <div className="bg-accent/10 flex size-7 items-center justify-center rounded-full transition-colors duration-200">
                              <i
                                className={clsxm(
                                  option.id === 'native-share' && isPreparingShare
                                    ? 'i-mingcute-loading-3-line animate-spin'
                                    : option.icon,
                                  'size-3.5',
                                  option.color || 'text-text-secondary',
                                )}
                                aria-hidden="true"
                              />
                            </div>
                            <span className="text-text text-xs font-medium">
                              {option.id === 'native-share' && isPreparingShare
                                ? t('photo.share.preparing')
                                : option.label}
                            </span>
                          </div>
                        </button>
                      ))}
                  </div>
                </div>
              </m.div>
            </DropdownMenuPrimitive.Content>
          </RootPortal>
        )}
      </AnimatePresence>
    </DropdownMenuPrimitive.Root>
  )
}

function getExtension(url: string): string | null {
  const cleanUrl = url.split('?')[0]?.split('#')[0]
  const extension = cleanUrl?.split('.').pop()
  return extension && extension !== cleanUrl ? extension.toLowerCase() : null
}
