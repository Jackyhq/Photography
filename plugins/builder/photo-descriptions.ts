import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import type { BuilderPlugin, PhotoManifestItem } from '@afilmory/builder'

export interface PhotoDescriptionsPluginOptions {
  file?: string
}

interface PhotoDescriptionEntry {
  key: string
  title?: unknown
  descriptions?: unknown
  tags?: unknown
}

interface PhotoDescriptionsFile {
  version?: unknown
  photos?: unknown
}

const DEFAULT_DESCRIPTIONS_FILE = 'photo-descriptions.json'
const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')

export function createPhotoDescriptionsPlugin(options: PhotoDescriptionsPluginOptions = {}): BuilderPlugin {
  const filePath = path.isAbsolute(options.file ?? '')
    ? options.file!
    : path.resolve(REPO_ROOT, options.file ?? DEFAULT_DESCRIPTIONS_FILE)

  return {
    name: 'jacky:photo-descriptions',
    hooks: {
      beforeSaveManifest: async ({ logger, payload }) => {
        const descriptions = await loadDescriptions(filePath)
        if (!descriptions) {
          logger.main.info(`[photo-descriptions] 未找到 ${path.relative(REPO_ROOT, filePath)}，跳过人工描述合并`)
          return
        }

        const entriesByKey = new Map<string, PhotoDescriptionEntry>()
        for (const entry of descriptions.photos) {
          const key = normalizeStorageKey(entry.key)
          if (!key) continue
          entriesByKey.set(key, entry)
        }

        let changedCount = 0
        let matchedCount = 0

        for (const item of payload.manifest) {
          const entry = entriesByKey.get(normalizeStorageKey(item.s3Key))
          if (!entry) continue

          matchedCount++
          if (applyDescriptionEntry(item, entry)) {
            changedCount++
          }
        }

        logger.main.info(`[photo-descriptions] 已匹配 ${matchedCount} 条人工描述，更新 ${changedCount} 个 manifest 项`)
      },
    },
  }
}

export default createPhotoDescriptionsPlugin

async function loadDescriptions(filePath: string): Promise<{ photos: PhotoDescriptionEntry[] } | null> {
  let raw: string
  try {
    raw = await fs.readFile(filePath, 'utf-8')
  } catch (error) {
    if (isNodeError(error) && error.code === 'ENOENT') {
      return null
    }
    throw error
  }

  const parsed = JSON.parse(raw) as PhotoDescriptionsFile
  if (!parsed || !Array.isArray(parsed.photos)) {
    throw new Error(`Invalid photo descriptions file: expected "photos" to be an array in ${filePath}`)
  }

  return {
    photos: parsed.photos.filter(isPhotoDescriptionEntry),
  }
}

function applyDescriptionEntry(item: PhotoManifestItem, entry: PhotoDescriptionEntry): boolean {
  let changed = false
  const title = readNonEmptyString(entry.title)
  const descriptions = readDescriptions(entry.descriptions)
  const tags = readTags(entry.tags)

  if (title && item.title !== title) {
    item.title = title
    changed = true
  }

  if (descriptions && !areDescriptionMapsEqual(item.descriptions, descriptions)) {
    item.descriptions = descriptions
    changed = true
  }

  const fallbackDescription = descriptions?.['zh-CN'] || descriptions?.en
  if (fallbackDescription && item.description !== fallbackDescription) {
    item.description = fallbackDescription
    changed = true
  }

  if (tags.length > 0) {
    const mergedTags = mergeTags(item.tags, tags)
    if (!areStringArraysEqual(item.tags, mergedTags)) {
      item.tags = mergedTags
      changed = true
    }
  }

  return changed
}

function normalizeStorageKey(key: string): string {
  return key
    .replaceAll('\\', '/')
    .replace(/^\/+/, '')
    .replace(/^photos\//, '')
    .trim()
}

function readNonEmptyString(value: unknown): string | null {
  if (typeof value !== 'string') return null

  const trimmed = value.trim()
  return trimmed.length > 0 ? trimmed : null
}

function readTags(value: unknown): string[] {
  if (!Array.isArray(value)) return []

  return value.map((tag) => (typeof tag === 'string' ? tag.trim() : '')).filter((tag): tag is string => tag.length > 0)
}

function readDescriptions(value: unknown): Record<string, string> | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null

  const descriptions = Object.fromEntries(
    Object.entries(value)
      .map(([language, description]) => [language.trim(), readNonEmptyString(description)] as const)
      .filter((entry): entry is [string, string] => entry[0].length > 0 && entry[1] !== null),
  )

  return Object.keys(descriptions).length > 0 ? descriptions : null
}

function mergeTags(existing: string[], additions: string[]): string[] {
  const seen = new Set<string>()
  const merged: string[] = []

  for (const tag of [...existing, ...additions]) {
    if (seen.has(tag)) continue
    seen.add(tag)
    merged.push(tag)
  }

  return merged
}

function areStringArraysEqual(left: string[], right: string[]): boolean {
  return left.length === right.length && left.every((value, index) => value === right[index])
}

function areDescriptionMapsEqual(left: Record<string, string> | undefined, right: Record<string, string>): boolean {
  if (!left) return false

  const leftEntries = Object.entries(left)
  const rightEntries = Object.entries(right)
  return (
    leftEntries.length === rightEntries.length &&
    rightEntries.every(([language, description]) => left[language] === description)
  )
}

function isPhotoDescriptionEntry(value: unknown): value is PhotoDescriptionEntry {
  return Boolean(value && typeof value === 'object' && typeof (value as PhotoDescriptionEntry).key === 'string')
}

function isNodeError(error: unknown): error is NodeJS.ErrnoException {
  return error instanceof Error && 'code' in error
}
