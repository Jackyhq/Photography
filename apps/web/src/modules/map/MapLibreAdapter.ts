import type { FC } from 'react'

import type { BaseMapProps } from '~/types/map'

import { MapLibreMapComponent } from './MapLibreMapComponent'

export interface MapAdapter {
  name: string
  isAvailable: boolean
  initialize: () => Promise<void>
  cleanup?: () => void

  MapComponent: FC<BaseMapProps>
}

/**
 * MapLibre map adapter implementation.
 * This adapts MapLibre to work with the generic map provider system.
 */
export class MapLibreMapAdapter implements MapAdapter {
  name = 'maplibre'

  readonly isAvailable: boolean = true

  MapComponent = MapLibreMapComponent

  async initialize(): Promise<void> {
    // MapLibre doesn't require additional async initialization.
  }

  cleanup(): void {
    // No cleanup needed for MapLibre.
  }
}

export const createMapLibreAdapter = (): MapAdapter => {
  return new MapLibreMapAdapter()
}
