import type { RuntimeCaching } from 'workbox-build'

export const ACTIVE_PHOTO_RUNTIME_CACHES = {
  originals: 'photo-originals-v2',
  thumbnails: 'photo-thumbnails-v2',
} as const

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
          maxAgeSeconds: 60 * 60 * 24 * 30,
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
          maxAgeSeconds: 60 * 60 * 24 * 7,
          purgeOnQuotaError: true,
        },
      },
    },
  ]
}
