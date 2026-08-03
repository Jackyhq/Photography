import fs from 'node:fs/promises'
import path, { basename } from 'node:path'

import { workdir } from '@afilmory/builder/path.js'
import type { _Object } from '@aws-sdk/client-s3'

import { atomicWriteFile } from '../fs/atomic-write.js'
import { getThumbnailDirectory } from '../image/thumbnail-paths.js'
import { logger } from '../logger/index.js'
import type { AfilmoryManifest, CameraInfo, LensInfo } from '../types/manifest.js'
import type { PhotoManifestItem } from '../types/photo.js'
import { migrateManifestFileIfNeeded } from './migrate.js'
import { CURRENT_MANIFEST_VERSION } from './version.js'

const manifestPath = path.join(workdir, 'src/data/photos-manifest.json')
const manifestBackupPath = `${manifestPath}.bak`

function emptyManifest(): AfilmoryManifest {
  return {
    version: CURRENT_MANIFEST_VERSION,
    data: [],
    cameras: [],
    lenses: [],
  }
}

function parseManifest(content: string, sourcePath: string): AfilmoryManifest {
  const parsed = JSON.parse(content) as Partial<AfilmoryManifest> | null
  if (!parsed || typeof parsed !== 'object' || typeof parsed.version !== 'string' || !Array.isArray(parsed.data)) {
    throw new Error(`Manifest 结构无效：${sourcePath}`)
  }

  return {
    ...parsed,
    cameras: Array.isArray(parsed.cameras) ? parsed.cameras : [],
    lenses: Array.isArray(parsed.lenses) ? parsed.lenses : [],
  } as AfilmoryManifest
}

async function readManifest(sourcePath: string): Promise<AfilmoryManifest> {
  return parseManifest(await fs.readFile(sourcePath, 'utf-8'), sourcePath)
}

function isMissingFile(error: unknown): boolean {
  return error instanceof Error && 'code' in error && error.code === 'ENOENT'
}

export async function loadExistingManifest(): Promise<AfilmoryManifest> {
  let manifest: AfilmoryManifest
  try {
    manifest = await readManifest(manifestPath)
  } catch (primaryError) {
    try {
      manifest = await readManifest(manifestBackupPath)
      await atomicWriteFile(manifestPath, JSON.stringify(manifest, null, 2), {
        validate: async (temporaryPath) => {
          await readManifest(temporaryPath)
        },
      })
      logger.fs.warn(`⚠️ Manifest 主文件不可用，已从最近备份恢复：${manifestBackupPath}`)
    } catch (backupError) {
      if (isMissingFile(primaryError) && isMissingFile(backupError)) {
        logger.fs.info('🔍 未找到 manifest 文件，将创建新的 manifest')
        return emptyManifest()
      }

      throw new AggregateError([primaryError, backupError], 'Manifest 主文件和最近备份均无法读取')
    }
  }

  if (manifest.version !== CURRENT_MANIFEST_VERSION) {
    const migrated = await migrateManifestFileIfNeeded(manifest)
    if (migrated) return migrated
  }

  return manifest
}

// 检查照片是否需要更新（基于最后修改时间）
export function needsUpdate(existingItem: PhotoManifestItem | undefined, s3Object: _Object): boolean {
  if (!existingItem) return true
  if (!s3Object.LastModified) return true

  const existingModified = new Date(existingItem.lastModified)
  const s3Modified = s3Object.LastModified

  return s3Modified > existingModified
}

// 保存 manifest
export async function saveManifest(
  items: PhotoManifestItem[],
  cameras: CameraInfo[] = [],
  lenses: LensInfo[] = [],
): Promise<void> {
  // 按日期排序（最新的在前）
  const sortedManifest = [...items].sort((a, b) => new Date(b.dateTaken).getTime() - new Date(a.dateTaken).getTime())

  const serializedManifest = JSON.stringify(
    {
      version: CURRENT_MANIFEST_VERSION,
      data: sortedManifest,
      cameras,
      lenses,
    } as AfilmoryManifest,
    null,
    2,
  )

  await atomicWriteFile(manifestPath, serializedManifest, {
    backup: true,
    validate: async (temporaryPath) => {
      const validated = await readManifest(temporaryPath)
      if (validated.version !== CURRENT_MANIFEST_VERSION) {
        throw new Error(`Manifest 版本无效：${validated.version}`)
      }
    },
  })

  logger.fs.info(`📁 Manifest 保存至： ${manifestPath}`)
  logger.fs.info(`📷 包含 ${cameras.length} 个相机，🔍 ${lenses.length} 个镜头`)
}

// 检测并处理已删除的图片
export async function handleDeletedPhotos(items: PhotoManifestItem[]): Promise<number> {
  logger.main.info('🔍 检查已删除的图片...')
  const thumbnailsDir = getThumbnailDirectory()
  if (items.length === 0) {
    // Clear all thumbnails
    await fs.rm(thumbnailsDir, { recursive: true, force: true })
    logger.main.info('🔍 没有图片，清空缩略图...')
    return 0
  }

  let deletedCount = 0
  let allThumbnails: string[]
  try {
    allThumbnails = await fs.readdir(thumbnailsDir)
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      await fs.mkdir(thumbnailsDir, { recursive: true })
      return 0
    }

    throw error
  }

  const expectedThumbnailFileSet = new Set(
    items.flatMap((item) => [`${item.id}.jpg`, `${item.id}-360.webp`, `${item.id}-640.webp`]),
  )

  for (const thumbnail of allThumbnails) {
    if (!expectedThumbnailFileSet.has(basename(thumbnail))) {
      await fs.unlink(path.join(thumbnailsDir, thumbnail))
      deletedCount++
    }
  }

  return deletedCount
}
