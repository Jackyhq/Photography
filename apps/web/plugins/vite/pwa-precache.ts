// Static hosts redirect /index.html to /. A precache miss must fetch the
// canonical URL: a redirected response cannot satisfy a navigation request.
export const APP_SHELL_PRECACHE_OPTIONS = {
  modifyURLPrefix: { 'index.html': '/' },
  navigateFallback: '/',
} as const

// Preserve Vite's assets/ behavior and recognize the default eight-character
// Rollup hashes in vendor chunks. Unversioned files still need Workbox revisions.
export const HASHED_PRECACHE_URL_PATTERN = /^(?:assets\/|vendor\/[^/]+-[\w-]{8}\.js$)/
