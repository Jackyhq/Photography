import { createContext, use } from 'react'

import type { MapAdapter } from './MapLibreAdapter'

interface MapContextType {
  adapter: MapAdapter | null
}

export const MapContext = createContext<MapContextType | null>(null)

export const useMapAdapter = () => {
  const context = use(MapContext)
  if (!context) {
    throw new Error('useMapAdapter must be used within a MapProvider')
  }
  return context.adapter
}
