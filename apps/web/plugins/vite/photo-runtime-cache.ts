import type { RuntimeCaching } from 'workbox-build'

export const ACTIVE_PHOTO_RUNTIME_CACHES = {
  originals: 'photo-originals-v3',
  thumbnails: 'photo-thumbnails-v3',
} as const

export const OPTIONAL_CODE_RUNTIME_CACHE = 'optional-code-v1'

export const OPTIONAL_CODE_PRECACHE_GLOBS = ['vendor/0-*.js', 'assets/maplibre-gl-*.js'] as const

export function createPhotoRuntimeCaching(): RuntimeCaching[] {
  return [
    {
      urlPattern: /^https?:\/\/[^/]+\/thumbnails\/.*\.(?:jpe?g|webp)(?:\?.*)?$/i,
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: ACTIVE_PHOTO_RUNTIME_CACHES.thumbnails,
        cacheableResponse: {
          statuses: [0, 200],
        },
        expiration: {
          maxEntries: 240,
          maxAgeSeconds: 60 * 60 * 24 * 3,
          purgeOnQuotaError: true,
        },
      },
    },
    {
      urlPattern: /^https?:\/\/[^/]+\/photos\/.*\.(?:avif|gif|heic|heif|jpe?g|png|tif|tiff|webp)(?:\?.*)?$/i,
      handler: 'NetworkFirst',
      options: {
        cacheName: ACTIVE_PHOTO_RUNTIME_CACHES.originals,
        networkTimeoutSeconds: 4,
        cacheableResponse: {
          statuses: [0, 200],
        },
        expiration: {
          maxEntries: 12,
          maxAgeSeconds: 60 * 60 * 3,
          purgeOnQuotaError: true,
        },
      },
    },
  ]
}

export function createOptionalCodeRuntimeCaching(): RuntimeCaching[] {
  return [
    {
      urlPattern: /\/(?:vendor\/0-|assets\/maplibre-gl-)[^/]+\.js$/,
      handler: 'CacheFirst',
      options: {
        cacheName: OPTIONAL_CODE_RUNTIME_CACHE,
        cacheableResponse: {
          statuses: [200],
        },
        expiration: {
          maxEntries: 4,
          maxAgeSeconds: 60 * 60 * 24 * 365,
          purgeOnQuotaError: true,
        },
      },
    },
  ]
}
