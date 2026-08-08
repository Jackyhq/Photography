import { glassMenuItemStyle } from '@afilmory/ui'
import { useAtom } from 'jotai'
import { useTranslation } from 'react-i18next'

import { gallerySettingAtom } from '~/atoms/app'

const SORT_OPTIONS = [
  {
    order: 'desc',
    icon: 'i-mingcute-sort-descending-line',
    label: 'action.sort.newest.first',
  },
  {
    order: 'asc',
    icon: 'i-mingcute-sort-ascending-line',
    label: 'action.sort.oldest.first',
  },
] as const

export const SortPanel = () => {
  const { t } = useTranslation()
  const [gallerySetting, setGallerySetting] = useAtom(gallerySettingAtom)

  const setSortOrder = (order: 'asc' | 'desc') => {
    setGallerySetting((current) => ({
      ...current,
      sortOrder: order,
    }))
  }

  return (
    <div className="-mx-2 flex flex-col p-0 text-sm lg:p-0">
      {SORT_OPTIONS.map(({ order, icon, label }) => (
        <button
          key={order}
          type="button"
          className="group hover:text-accent flex w-full cursor-pointer items-center gap-2 rounded-lg bg-transparent px-2 py-2 text-left transition-all duration-200 hover:[background:var(--highlight-bg)] lg:py-1"
          style={glassMenuItemStyle}
          aria-pressed={gallerySetting.sortOrder === order}
          onClick={() => setSortOrder(order)}
        >
          <i className={icon} />
          <span>{t(label)}</span>
          {gallerySetting.sortOrder === order && <i className="i-mingcute-check-line ml-auto" />}
        </button>
      ))}
    </div>
  )
}
