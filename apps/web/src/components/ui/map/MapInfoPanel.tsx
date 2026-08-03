import { m } from 'motion/react'
import * as React from 'react'
import { useTranslation } from 'react-i18next'

interface MapInfoPanelProps {
  markersCount: number
}

export const MapInfoPanel = ({ markersCount }: MapInfoPanelProps) => {
  const { t } = useTranslation()

  return (
    <m.div
      className="absolute top-4 right-4 z-40 max-w-xs"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      <div className="bg-material-thick border-fill-tertiary rounded-2xl border shadow-2xl backdrop-blur-[120px]">
        {/* Header Section */}
        <div className="p-5">
          <m.div
            className="flex items-center gap-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            {/* Icon container with enhanced styling */}
            <div className="bg-blue/10 ring-blue/20 flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl ring-1 ring-inset">
              <i className="i-mingcute-map-line text-blue text-lg" aria-hidden="true" />
            </div>

            <div className="min-w-0 flex-1">
              <h1 className="text-text text-lg leading-tight font-semibold tracking-tight">
                {t('explory.explore.map')}
              </h1>
              <div className="mt-1.5 flex items-center gap-2">
                <div className="bg-green/10 ring-green/20 flex items-center gap-1.5 rounded-full px-2.5 py-1 ring-1 ring-inset">
                  <div className="bg-green h-1.5 w-1.5 rounded-full" />
                  <span className="text-text-secondary text-xs font-medium">
                    {t('explory.found.locations', { count: markersCount })}
                  </span>
                </div>
              </div>
            </div>
          </m.div>
        </div>
      </div>
    </m.div>
  )
}
