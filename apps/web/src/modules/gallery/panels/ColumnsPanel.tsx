import { useAtom } from 'jotai'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { gallerySettingAtom } from '~/atoms/app'
import { Slider } from '~/components/ui/slider'
import { useMobile } from '~/hooks/useMobile'

export const ColumnsPanel = () => {
  const { t } = useTranslation()
  const [gallerySetting, setGallerySetting] = useAtom(gallerySettingAtom)
  const isMobile = useMobile()
  // Local preview state to avoid reflow while dragging
  const [previewColumns, setPreviewColumns] = useState<number | 'auto'>(gallerySetting.columns)

  const handleChange = (val: number | 'auto') => {
    setPreviewColumns(val)
  }

  const handleValueCommit = (val: number | 'auto') => {
    setGallerySetting((prev) => ({ ...prev, columns: val }))
  }
  // 根据设备类型提供不同的列数范围
  const columnRange = isMobile
    ? { min: 3, max: 5 } // 移动端适合的列数范围
    : { min: 3, max: 8 } // 桌面端适合的列数范围

  return (
    <div className="w-full lg:w-80">
      <Slider
        value={previewColumns}
        onChange={handleChange}
        onValueCommit={handleValueCommit}
        min={columnRange.min}
        max={columnRange.max}
        autoLabel={t('action.auto')}
        ariaLabel={t('action.columns.setting')}
      />
    </div>
  )
}
