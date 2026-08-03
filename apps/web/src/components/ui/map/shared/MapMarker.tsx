import type { Marker as MapLibreMarker } from 'maplibre-gl'
import type { ComponentProps } from 'react'
import { useCallback } from 'react'
import { Marker } from 'react-map-gl/maplibre'

import { makeMapMarkerContainerNonInteractive } from './map-marker-a11y'

type MapMarkerProps = Omit<ComponentProps<typeof Marker>, 'ref'>

export const MapMarker = (props: MapMarkerProps) => {
  const handleMarkerRef = useCallback((marker: MapLibreMarker | null) => {
    if (!marker) return
    makeMapMarkerContainerNonInteractive(marker.getElement())
  }, [])

  return <Marker {...props} ref={handleMarkerRef} />
}
