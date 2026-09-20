// Preserve Vite's assets/ behavior and recognize the default eight-character
// Rollup hashes in vendor chunks. Unversioned files still need Workbox revisions.
export const HASHED_PRECACHE_URL_PATTERN = /^(?:assets\/|vendor\/[^/]+-[\w-]{8}\.js$)/
