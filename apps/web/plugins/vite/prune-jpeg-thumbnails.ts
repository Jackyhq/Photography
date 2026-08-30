import { readdir, stat, unlink } from 'node:fs/promises'
import path from 'node:path'

import type { Plugin, ResolvedConfig } from 'vite'

export interface PrunedJpegThumbnails {
  deletedBytes: number
  deletedCount: number
}

export async function pruneJpegThumbnails(outputDirectory: string): Promise<PrunedJpegThumbnails> {
  const thumbnailDirectory = path.resolve(outputDirectory, 'thumbnails')
  let entries

  try {
    entries = await readdir(thumbnailDirectory, { withFileTypes: true })
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return { deletedBytes: 0, deletedCount: 0 }
    }
    throw error
  }

  let deletedBytes = 0
  let deletedCount = 0

  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.endsWith('.jpg')) continue

    const filePath = path.join(thumbnailDirectory, entry.name)
    const fileStats = await stat(filePath)
    await unlink(filePath)
    deletedBytes += fileStats.size
    deletedCount += 1
  }

  return { deletedBytes, deletedCount }
}

export function pruneJpegThumbnailsPlugin(): Plugin {
  let resolvedConfig: ResolvedConfig | undefined

  return {
    name: 'prune-jpeg-thumbnails',
    apply: 'build',
    enforce: 'post',
    configResolved(config) {
      resolvedConfig = config
    },
    async writeBundle(options) {
      const root = resolvedConfig?.root ?? process.cwd()
      const outputDirectory = path.resolve(root, options.dir ?? resolvedConfig?.build.outDir ?? 'dist')
      const result = await pruneJpegThumbnails(outputDirectory)
      const bytes = new Intl.NumberFormat('en-US').format(result.deletedBytes)
      const message = `[prune-jpeg-thumbnails] Removed ${result.deletedCount} JPEG thumbnails (${bytes} bytes) from the production output`

      if (resolvedConfig) {
        resolvedConfig.logger.info(message)
      } else {
        console.info(message)
      }
    },
  }
}
