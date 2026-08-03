/* global caches, self */

const ACTIVE_PHOTO_RUNTIME_CACHES = new Set(['photo-thumbnails-v2', 'photo-originals-v2'])
const PHOTO_RUNTIME_CACHE_PREFIXES = ['photo-thumbnails-', 'photo-originals-']

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) =>
        Promise.all(
          cacheNames
            .filter(
              (cacheName) =>
                PHOTO_RUNTIME_CACHE_PREFIXES.some((prefix) => cacheName.startsWith(prefix)) &&
                !ACTIVE_PHOTO_RUNTIME_CACHES.has(cacheName),
            )
            .map((cacheName) => caches.delete(cacheName)),
        ),
      ),
  )
})
