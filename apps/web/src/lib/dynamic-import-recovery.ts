export const DYNAMIC_IMPORT_RELOAD_STORAGE_KEY = 'afilmory:dynamic-import-reload-at'

const DYNAMIC_IMPORT_RELOAD_COOLDOWN_MS = 30_000
const DYNAMIC_IMPORT_ERROR_PATTERN =
  /failed to fetch dynamically imported module|error loading dynamically imported module|importing a module script failed/i

export const isDynamicImportError = (message: string): boolean => DYNAMIC_IMPORT_ERROR_PATTERN.test(message)

export const shouldReloadForDynamicImportError = ({
  message,
  lastReloadAt,
  now = Date.now(),
}: {
  message: string
  lastReloadAt: number | null
  now?: number
}): boolean => {
  if (!isDynamicImportError(message)) return false
  if (lastReloadAt === null || !Number.isFinite(lastReloadAt)) return true

  return now - lastReloadAt >= DYNAMIC_IMPORT_RELOAD_COOLDOWN_MS
}

interface ReloadTimestampStorage {
  getItem: (key: string) => string | null
  setItem: (key: string, value: string) => void
}

export const claimDynamicImportReload = ({
  message,
  getStorage,
  now = Date.now(),
}: {
  message: string
  getStorage: () => ReloadTimestampStorage
  now?: number
}): boolean => {
  if (!isDynamicImportError(message)) return false

  try {
    const storage = getStorage()
    const storedReloadAt = storage.getItem(DYNAMIC_IMPORT_RELOAD_STORAGE_KEY)
    const lastReloadAt = storedReloadAt === null ? null : Number(storedReloadAt)

    if (!shouldReloadForDynamicImportError({ message, lastReloadAt, now })) return false

    storage.setItem(DYNAMIC_IMPORT_RELOAD_STORAGE_KEY, String(now))
    return true
  } catch {
    // Without a persisted timestamp, reloading could trap the browser in a loop.
    return false
  }
}
