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
