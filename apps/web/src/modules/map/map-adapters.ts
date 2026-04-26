import { siteConfig } from '~/config'

import { createMapLibreAdapter } from './MapLibreAdapter'

const maplibreAdapter = createMapLibreAdapter()

const ADAPTERS = [
  {
    name: 'maplibre',
    adapter: maplibreAdapter,
    component: maplibreAdapter.MapComponent,
  },
]

export const getPreferredAdapter = () => {
  const mapConfig = siteConfig.map

  if (!mapConfig) {
    const adapter = ADAPTERS.find((a) => a.adapter.isAvailable) || null
    if (adapter) {
      console.info(`Map: Selected default adapter: ${adapter.name}`)
    }
    return adapter
  }

  if (typeof mapConfig === 'string') {
    const adapter = ADAPTERS.find((a) => a.name === mapConfig && a.adapter.isAvailable)
    if (adapter) {
      console.info(`Map: Selected specified adapter: ${adapter.name}`)
      return adapter
    }

    const fallbackAdapter = ADAPTERS.find((a) => a.adapter.isAvailable) || null
    if (fallbackAdapter) {
      console.info(`Map: Specified adapter '${mapConfig}' not available, using fallback: ${fallbackAdapter.name}`)
    }
    return fallbackAdapter
  }

  if (Array.isArray(mapConfig)) {
    for (const providerName of mapConfig) {
      const adapter = ADAPTERS.find((a) => a.name === providerName && a.adapter.isAvailable)
      if (adapter) {
        console.info(`Map: Selected adapter from priority list: ${adapter.name}`)
        return adapter
      }
    }

    const fallbackAdapter = ADAPTERS.find((a) => a.adapter.isAvailable) || null
    if (fallbackAdapter) {
      console.info(`Map: None of the priority providers available, using fallback: ${fallbackAdapter.name}`)
    }
    return fallbackAdapter
  }

  const adapter = ADAPTERS.find((a) => a.adapter.isAvailable) || null
  if (adapter) {
    console.info(`Map: Selected default adapter: ${adapter.name}`)
  } else {
    console.warn('Map: No adapters are available')
  }
  return adapter
}

export const getMapAdapterInfo = () => {
  return ADAPTERS.map((adapter) => ({
    name: adapter.name,
    isAvailable: adapter.adapter.isAvailable,
    adapterName: adapter.adapter.name,
  }))
}

export const getMapConfig = () => siteConfig.map
