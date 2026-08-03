import { m } from 'motion/react'
import * as React from 'react'
import { useTranslation } from 'react-i18next'

interface MapInfoPanelProps {
  markersCount: number
  bounds?: {
    minLat: number
    maxLat: number
    minLng: number
    maxLng: number
  } | null
}

export const MapInfoPanel = ({ markersCount, bounds }: MapInfoPanelProps) => {
  const { t } = useTranslation()
  const [isExpanded, setIsExpanded] = React.useState(false)
  const detailsId = React.useId()
  const showDetails = isExpanded && Boolean(bounds)

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
              <div className="flex items-center justify-between">
                <h1 className="text-text text-lg leading-tight font-semibold tracking-tight">
                  {t('explory.explore.map')}
                </h1>
                {/* Collapse/Expand Button */}
                <button
                  type="button"
                  onClick={() => setIsExpanded((expanded) => !expanded)}
                  className="bg-fill-secondary/50 ring-fill-tertiary/20 hover:bg-fill-tertiary relative -top-2 -mb-2 flex size-8 flex-shrink-0 items-center justify-center rounded-xl ring-1 transition-all duration-200 ring-inset"
                  aria-label={t(isExpanded ? 'explory.info.collapse' : 'explory.info.expand')}
                  aria-expanded={showDetails}
                  aria-controls={detailsId}
                  disabled={!bounds}
                >
                  <m.i
                    className="i-mingcute-down-line text-text-secondary text-base"
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    aria-hidden="true"
                  />
                </button>
              </div>
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

        {/* Coordinates Section - Collapsible */}
        <m.div
          id={detailsId}
          initial={false}
          animate={{
            height: showDetails ? 'auto' : 0,
            opacity: showDetails ? 1 : 0,
          }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="overflow-hidden"
          aria-hidden={!showDetails}
          inert={!showDetails}
        >
          {bounds && (
            <div className="border-fill-secondary border-t px-5 pt-4 pb-5">
              {/* Section header */}
              <div className="mb-4 flex items-center gap-2.5">
                <i className="i-mingcute-location-line text-text-secondary" aria-hidden="true" />
                <span className="text-text text-sm font-medium tracking-tight">{t('explory.shooting.range')}</span>
              </div>

              {/* Enhanced coordinate cards */}
              <div className="space-y-3">
                {/* Min coordinates */}
                <div className="bg-fill-vibrant-quinary border-fill-tertiary rounded-xl border p-4">
                  <div className="text-text-secondary mb-2 flex items-center gap-2 text-xs font-medium tracking-wide uppercase">
                    <i className="i-mingcute-arrow-left-down-line text-sm" aria-hidden="true" />
                    {t('explory.info.southwest')}
                  </div>
                  <div className="space-y-1">
                    <div className="text-text flex items-center justify-between">
                      <span className="text-xs font-medium">{t('explory.info.latitude')}</span>
                      <span className="font-mono text-sm tabular-nums">{bounds.minLat.toFixed(6)}°</span>
                    </div>
                    <div className="text-text flex items-center justify-between">
                      <span className="text-xs font-medium">{t('explory.info.longitude')}</span>
                      <span className="font-mono text-sm tabular-nums">{bounds.minLng.toFixed(6)}°</span>
                    </div>
                  </div>
                </div>

                {/* Max coordinates */}
                <div className="bg-fill-vibrant-quinary border-fill-tertiary rounded-xl border p-4">
                  <div className="text-text-secondary mb-2 flex items-center gap-2 text-xs font-medium tracking-wide uppercase">
                    <i className="i-mingcute-arrow-right-up-line text-sm" aria-hidden="true" />
                    {t('explory.info.northeast')}
                  </div>
                  <div className="space-y-1">
                    <div className="text-text flex items-center justify-between">
                      <span className="text-xs font-medium">{t('explory.info.latitude')}</span>
                      <span className="font-mono text-sm tabular-nums">{bounds.maxLat.toFixed(6)}°</span>
                    </div>
                    <div className="text-text flex items-center justify-between">
                      <span className="text-xs font-medium">{t('explory.info.longitude')}</span>
                      <span className="font-mono text-sm tabular-nums">{bounds.maxLng.toFixed(6)}°</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </m.div>
      </div>
    </m.div>
  )
}
