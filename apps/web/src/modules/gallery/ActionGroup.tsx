import { photoLoader } from '@afilmory/data'
import { Button } from '@afilmory/ui'
import { useAtom, useSetAtom } from 'jotai'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'

import { gallerySettingAtom, isCommandPaletteOpenAtom } from '~/atoms/app'

import { ResponsiveActionButton } from './components/ActionButton'
import { ViewPanel } from './panels/ViewPanel'

export const ActionGroup = ({ keyboardNavigationGroup = false }: { keyboardNavigationGroup?: boolean }) => {
  const { i18n, t } = useTranslation()
  const [gallerySetting] = useAtom(gallerySettingAtom)
  const setCommandPaletteOpen = useSetAtom(isCommandPaletteOpenAtom)
  const navigate = useNavigate()
  const [isSwitchingLanguage, setIsSwitchingLanguage] = useState(false)

  // 计算视图设置是否有自定义配置
  const hasViewCustomization = gallerySetting.columns !== 'auto' || gallerySetting.sortOrder !== 'desc'

  // 计算过滤器数量
  const filterCount =
    gallerySetting.selectedTags.length +
    gallerySetting.selectedCameras.length +
    gallerySetting.selectedLenses.length +
    (gallerySetting.selectedRatings !== null ? 1 : 0)

  const isChineseLanguage = (i18n.resolvedLanguage || i18n.language).startsWith('zh')
  const nextLanguage = isChineseLanguage ? 'en' : 'zh-CN'
  const nextLanguageLabel = isChineseLanguage ? 'EN' : '中'
  const languageToggleTitle = t(
    isChineseLanguage ? 'action.language.switchToEnglish' : 'action.language.switchToChinese',
  )

  const handleLanguageToggle = async () => {
    if (isSwitchingLanguage) return

    setIsSwitchingLanguage(true)
    try {
      await photoLoader.loadPhotoText(nextLanguage)
    } catch (error) {
      console.error('Failed to load localized photo text:', error)
    }

    try {
      localStorage.setItem('i18nextLng', nextLanguage)
    } catch {
      // localStorage can be unavailable in private or restricted browser contexts.
    }

    try {
      await i18n.changeLanguage(nextLanguage)
    } finally {
      setIsSwitchingLanguage(false)
    }
  }

  return (
    <div
      className="flex items-center justify-center gap-3"
      role="group"
      aria-label={t('gallery.actions')}
      data-gallery-keyboard-group={keyboardNavigationGroup ? 'actions' : undefined}
    >
      {/* 搜索和过滤按钮 - 打开命令面板 */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => {
          setCommandPaletteOpen(true)
        }}
        className="relative h-10 min-w-10 rounded-full border-0 bg-gray-100 px-3 transition-all duration-200 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
        title={t('action.search.unified.title')}
        aria-label={t('action.search.unified.title')}
        data-testid="command-palette-trigger"
      >
        <i className="i-mingcute-search-line text-base text-gray-600 dark:text-gray-300" />
        {filterCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-xs font-medium text-white">
            {filterCount}
          </span>
        )}
      </Button>

      {/* 地图探索按钮 */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => navigate('/explory')}
        data-testid="map-explore-trigger"
        className="h-10 w-10 rounded-full border-0 bg-gray-100 transition-all duration-200 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
        title={t('action.map.explore')}
        aria-label={t('action.map.explore')}
      >
        <i className="i-mingcute-map-pin-line text-base text-gray-600 dark:text-gray-300" />
      </Button>

      {/* 视图设置按钮（合并排序和列数） */}
      <ResponsiveActionButton
        icon="i-mingcute-layout-grid-line"
        title={t('action.view.title')}
        badge={hasViewCustomization ? '●' : undefined}
      >
        <ViewPanel />
      </ResponsiveActionButton>

      <Button
        variant="ghost"
        size="sm"
        onClick={() => void handleLanguageToggle()}
        disabled={isSwitchingLanguage}
        aria-busy={isSwitchingLanguage}
        className="h-10 w-10 rounded-full border-0 bg-gray-100 px-0 transition-all duration-200 hover:bg-gray-200 disabled:cursor-wait disabled:opacity-70 dark:bg-gray-800 dark:hover:bg-gray-700"
        title={languageToggleTitle}
        aria-label={languageToggleTitle}
        data-testid="language-toggle"
      >
        {isSwitchingLanguage ? (
          <i className="i-mingcute-loading-line animate-spin text-base text-gray-600 dark:text-gray-300" />
        ) : (
          <span className="text-xs font-semibold text-gray-600 dark:text-gray-300">{nextLanguageLabel}</span>
        )}
      </Button>
    </div>
  )
}
