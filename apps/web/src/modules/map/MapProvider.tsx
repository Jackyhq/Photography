import type { FC, ReactNode } from 'react'
import { useMemo } from 'react'

import { getPreferredAdapter } from './map-adapters'
import { MapContext } from './MapContext'

export const MapProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const adapter = useMemo(() => {
    const preferredAdapter = getPreferredAdapter()
    if (preferredAdapter) {
      return {
        ...preferredAdapter.adapter,
        MapComponent: preferredAdapter.component,
      }
    }
    return null
  }, [])

  const value = useMemo(() => ({ adapter }), [adapter])

  return <MapContext value={value}>{children}</MapContext>
}
