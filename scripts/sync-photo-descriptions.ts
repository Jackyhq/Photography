import fs from 'node:fs/promises'
import path from 'node:path'

interface ManifestFile {
  data?: ManifestPhoto[]
}

interface ManifestPhoto {
  title?: string
  description?: string
  dateTaken?: string
  tags?: string[]
  s3Key?: string
  exif?: {
    Make?: string
    Model?: string
    LensMake?: string
    LensModel?: string
  } | null
}

interface PhotoDescriptionsFile {
  version: 1
  photos: PhotoDescriptionEntry[]
}

interface PhotoDescriptionEntry {
  key: string
  title: string
  description: string
  descriptions: PhotoDescriptionTranslations
  tags: string[]
  aiContext: PhotoDescriptionAIContext
}

interface PhotoDescriptionTranslations {
  'zh-CN': string
  en: string
}

interface PhotoDescriptionAIContext {
  currentTitle: string
  dateTaken: string
  camera: string
  lens: string
  categoryTags: string[]
}

const DESCRIPTIONS_PATH = path.resolve(process.cwd(), 'photo-descriptions.json')
const MANIFEST_PATH = path.resolve(process.cwd(), 'apps/web/src/data/photos-manifest.json')

async function main() {
  const shouldPrune = process.argv.includes('--prune')
  const manifest = await readManifest()
  const existing = await readExistingDescriptions()
  const existingByKey = new Map(existing.photos.map((entry) => [normalizeStorageKey(entry.key), entry]))
  const activeKeys = new Set<string>()

  const activeEntries = manifest.data
    .filter((photo): photo is ManifestPhoto & { s3Key: string } => typeof photo.s3Key === 'string')
    .map((photo) => {
      const key = normalizeStorageKey(photo.s3Key)
      activeKeys.add(key)

      return mergeEntry(existingByKey.get(key), photo, key)
    })

  const staleEntries = shouldPrune
    ? []
    : existing.photos.filter((entry) => !activeKeys.has(normalizeStorageKey(entry.key)))

  const next: PhotoDescriptionsFile = {
    version: 1,
    photos: [...activeEntries, ...staleEntries],
  }

  await fs.writeFile(DESCRIPTIONS_PATH, `${JSON.stringify(next, null, 2)}\n`)

  const staleSummary = staleEntries.length > 0 ? ` and kept ${staleEntries.length} stale entries` : ''
  console.info(
    `Synced ${activeEntries.length} active photo description entries${staleSummary} -> ${path.relative(process.cwd(), DESCRIPTIONS_PATH)}`,
  )
}

async function readManifest(): Promise<{ data: ManifestPhoto[] }> {
  try {
    const raw = await fs.readFile(MANIFEST_PATH, 'utf-8')
    const parsed = JSON.parse(raw) as ManifestFile
    if (!Array.isArray(parsed.data)) {
      throw new TypeError('manifest "data" must be an array')
    }

    return { data: parsed.data }
  } catch (error) {
    console.error(`Failed to read ${path.relative(process.cwd(), MANIFEST_PATH)}.`)
    console.error('Run `pnpm run build:manifest` first, then run `pnpm photos:descriptions:sync`.')
    throw error
  }
}

async function readExistingDescriptions(): Promise<PhotoDescriptionsFile> {
  try {
    const raw = await fs.readFile(DESCRIPTIONS_PATH, 'utf-8')
    const parsed = JSON.parse(raw) as Partial<PhotoDescriptionsFile>

    return {
      version: 1,
      photos: Array.isArray(parsed.photos) ? parsed.photos.map(normalizeEntry).filter(isPresent) : [],
    }
  } catch (error) {
    if (isNodeError(error) && error.code === 'ENOENT') {
      return { version: 1, photos: [] }
    }

    throw error
  }
}

function mergeEntry(
  existing: PhotoDescriptionEntry | undefined,
  photo: ManifestPhoto & { s3Key: string },
  key: string,
): PhotoDescriptionEntry {
  return {
    key,
    title: existing?.title ?? '',
    description: existing?.description ?? '',
    descriptions: existing?.descriptions ?? createEmptyTranslations(existing?.description),
    tags: existing?.tags ?? [],
    aiContext: createAIContext(photo),
  }
}

function createAIContext(photo: ManifestPhoto): PhotoDescriptionAIContext {
  return {
    currentTitle: photo.title ?? '',
    dateTaken: photo.dateTaken ?? '',
    camera: formatCamera(photo),
    lens: formatLens(photo),
    categoryTags: Array.isArray(photo.tags) ? photo.tags : [],
  }
}

function normalizeEntry(entry: unknown): PhotoDescriptionEntry | null {
  if (!entry || typeof entry !== 'object') return null

  const candidate = entry as Partial<PhotoDescriptionEntry>
  const key = typeof candidate.key === 'string' ? normalizeStorageKey(candidate.key) : ''
  if (!key) return null

  return {
    key,
    title: typeof candidate.title === 'string' ? candidate.title : '',
    description: typeof candidate.description === 'string' ? candidate.description : '',
    descriptions: normalizeTranslations(candidate.descriptions, candidate.description),
    tags: Array.isArray(candidate.tags) ? candidate.tags.filter((tag): tag is string => typeof tag === 'string') : [],
    aiContext: {
      currentTitle: '',
      dateTaken: '',
      camera: '',
      lens: '',
      categoryTags: [],
    },
  }
}

function normalizeTranslations(value: unknown, legacyDescription: unknown): PhotoDescriptionTranslations {
  const fallback = typeof legacyDescription === 'string' ? legacyDescription : ''
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return createEmptyTranslations(fallback)
  }

  const candidate = value as Partial<Record<keyof PhotoDescriptionTranslations, unknown>>
  return {
    'zh-CN': typeof candidate['zh-CN'] === 'string' ? candidate['zh-CN'] : fallback,
    en: typeof candidate.en === 'string' ? candidate.en : '',
  }
}

function createEmptyTranslations(legacyDescription = ''): PhotoDescriptionTranslations {
  return {
    'zh-CN': legacyDescription,
    en: '',
  }
}

function formatCamera(photo: ManifestPhoto): string {
  const make = photo.exif?.Make?.trim()
  const model = photo.exif?.Model?.trim()
  return make && model ? `${make} ${model}` : ''
}

function formatLens(photo: ManifestPhoto): string {
  const lensMake = photo.exif?.LensMake?.trim()
  const lensModel = photo.exif?.LensModel?.trim()
  if (!lensModel) return ''

  return lensMake ? `${lensMake} ${lensModel}` : lensModel
}

function normalizeStorageKey(key: string): string {
  return key
    .replaceAll('\\', '/')
    .replace(/^\/+/, '')
    .replace(/^photos\//, '')
    .trim()
}

function isNodeError(error: unknown): error is NodeJS.ErrnoException {
  return error instanceof Error && 'code' in error
}

function isPresent<T>(value: T | null): value is T {
  return value !== null
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
