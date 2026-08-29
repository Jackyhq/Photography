import { clsxm } from '@afilmory/utils'
import { repository } from '@pkg'
import * as AvatarPrimitive from '@radix-ui/react-avatar'
import { useTranslation } from 'react-i18next'

import { siteConfig } from '~/config'
import { usePhotos } from '~/hooks/usePhotoViewer'
import { useAppUpdate } from '~/providers/app-update-context'

import { ActionGroup } from './ActionGroup'

export const MasonryHeaderMasonryItem = ({ style, className }: { style?: React.CSSProperties; className?: string }) => {
  const { i18n, t } = useTranslation()
  const locale = i18n.resolvedLanguage ?? i18n.language
  const visiblePhotoCount = usePhotos().length
  const { needRefresh, updateApp } = useAppUpdate()
  return (
    <div
      className={clsxm(
        'overflow-hidden border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900',
        className,
      )}
      style={style}
    >
      {/* Header section with clean typography */}
      <div className="px-6 pt-8 pb-6 text-center">
        <div className="flex items-center justify-center">
          <div className="relative">
            {siteConfig.author.avatar && (
              <AvatarPrimitive.Root>
                <AvatarPrimitive.Image
                  src={siteConfig.author.avatar}
                  alt={t('gallery.authorAvatar', { name: siteConfig.author.name })}
                  className="size-16 rounded-full"
                />
                <AvatarPrimitive.Fallback>
                  <div className="bg-material-medium size-16 rounded-full" />
                </AvatarPrimitive.Fallback>
              </AvatarPrimitive.Root>
            )}
            <div
              className={clsxm(
                'from-accent to-accent/80 inline-flex items-center justify-center rounded-2xl bg-gradient-to-br shadow-lg',
                siteConfig.author.avatar ? 'size-8 rounded absolute bottom-0 -right-3' : 'size-16 mb-4',
              )}
            >
              <i className="i-mingcute-camera-2-line text-2xl text-white" />
            </div>
          </div>
        </div>

        <h1 className="mt-1 mb-1 text-2xl font-semibold text-gray-900 dark:text-white">{siteConfig.name}</h1>

        {/* Social media links */}
        {siteConfig.social && (
          <div
            className="mt-1 mb-3 flex items-center justify-center gap-3"
            role="group"
            aria-label={t('gallery.social.links')}
            data-gallery-keyboard-group="social"
          >
            {siteConfig.author.url && (
              <a
                href={siteConfig.author.url}
                target="_blank"
                rel="noreferrer"
                className="text-text-secondary flex items-center justify-center p-2 duration-200 hover:text-[#007bff]"
                title="Home"
                aria-label={t('gallery.authorHome', { name: siteConfig.author.name })}
              >
                <i className="i-mingcute-home-4-fill text-sm" aria-hidden="true" />
              </a>
            )}
            {siteConfig.social.instagram && (
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noreferrer"
                className="text-text-secondary flex items-center justify-center p-2 duration-200 hover:text-[#E1306C]"
                title="Instagram"
                aria-label="Instagram"
              >
                <i className="i-mingcute-instagram-fill text-sm" aria-hidden="true" />
              </a>
            )}
            {siteConfig.social.github && (
              <a
                href={`https://github.com/${siteConfig.social.github}`}
                target="_blank"
                rel="noreferrer"
                className="text-text-secondary flex items-center justify-center p-2 duration-200 hover:text-[#E7E8E8]"
                title="GitHub"
                aria-label="GitHub"
              >
                <i className="i-mingcute-github-fill text-sm" aria-hidden="true" />
              </a>
            )}
            {siteConfig.social.twitter && (
              <a
                href={`https://twitter.com/${siteConfig.social.twitter.replace('@', '')}`}
                target="_blank"
                rel="noreferrer"
                className="text-text-secondary flex items-center justify-center p-2 duration-200 hover:text-[#1da1f2]"
                title="Twitter"
                aria-label="Twitter"
              >
                <i className="i-mingcute-twitter-fill text-sm" aria-hidden="true" />
              </a>
            )}
            {siteConfig.social.rss && (
              <a
                href="/feed.xml"
                target="_blank"
                className="text-text-secondary flex items-center justify-center p-2 duration-200 hover:text-[#ec672c]"
                title="RSS"
                aria-label="RSS"
              >
                <i className="i-mingcute-rss-2-fill text-sm" aria-hidden="true" />
              </a>
            )}
          </div>
        )}

        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
          {t('gallery.photos', { count: visiblePhotoCount || 0 })}
        </p>
      </div>

      {/* Controls section */}
      <div className="px-6 pb-6">
        <ActionGroup keyboardNavigationGroup />
      </div>

      {/* Footer with build date and ICP */}
      <div className="border-t border-gray-100 bg-gray-50 px-6 py-4 dark:border-gray-800 dark:bg-gray-800/50">
        <div
          className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-xs text-gray-500 dark:text-gray-400"
          aria-live="polite"
        >
          <span className="inline-flex items-center justify-center gap-2">
            <i className="i-mingcute-calendar-line text-sm" />
            <span>
              {t('gallery.built.at')}
              {new Date(BUILT_DATE).toLocaleDateString(locale, {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
              {GIT_COMMIT_HASH && (
                <span className="ml-1">
                  (
                  <a
                    href={`${repository.url}/commit/${GIT_COMMIT_HASH}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-gray-500 dark:text-gray-400"
                  >
                    {GIT_COMMIT_HASH.slice(0, 6)}
                  </a>
                  )
                </span>
              )}
            </span>
          </span>
          {needRefresh && (
            <button
              type="button"
              onClick={updateApp}
              className="border-accent/25 bg-accent/10 text-accent hover:bg-accent/20 inline-flex items-center gap-1 rounded-full border px-2 py-0.5 font-medium transition-colors"
            >
              <i className="i-mingcute-refresh-2-line text-sm" />
              <span>{t('gallery.update.available')}</span>
            </button>
          )}
        </div>
        <div className="mt-1 flex items-center justify-center gap-1 text-xs text-gray-500 dark:text-gray-400">
          <a
            href="https://beian.miit.gov.cn/"
            target="_blank"
            rel="noreferrer"
            className="hover:text-gray-700 dark:hover:text-gray-300"
          >
            粤ICP备2025447157号
          </a>
        </div>
      </div>
    </div>
  )
}
