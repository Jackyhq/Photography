import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import type { Plugin } from 'vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.resolve(__dirname, '../../../..')

const MEDIA_MIME_TYPES: Readonly<Record<string, string>> = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.bmp': 'image/bmp',
  '.tiff': 'image/tiff',
  '.tif': 'image/tiff',
  '.heic': 'image/heic',
  '.heif': 'image/heif',
  '.hif': 'image/heif',
  '.avif': 'image/avif',
  '.m4v': 'video/mp4',
  '.mov': 'video/quicktime',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
}

type PhotoFileResolution =
  | {
      ok: true
      contentType: string
      filePath: string
      stats: fs.Stats
    }
  | {
      ok: false
      statusCode: 400 | 403 | 404
    }

export interface ByteRange {
  start: number
  end: number
}

export function resolvePhotoFileRequest(requestUrl: string, photosDirectory: string): PhotoFileResolution {
  const rawPath = requestUrl.split(/[?#]/u, 1)[0] ?? ''
  let decodedPath: string

  try {
    decodedPath = decodeURIComponent(rawPath)
  } catch {
    return { ok: false, statusCode: 400 }
  }

  if (hasUnsafePathCharacters(decodedPath) || /%(?:2e|2f|5c)/iu.test(decodedPath)) {
    return { ok: false, statusCode: 403 }
  }

  const relativeRequestPath = decodedPath.replaceAll(/^\/+|\/+$/gu, '')
  const pathSegments = relativeRequestPath.split('/')

  if (!relativeRequestPath || pathSegments.some((segment) => !segment || segment === '..' || segment.startsWith('.'))) {
    return { ok: false, statusCode: 403 }
  }

  const contentType = MEDIA_MIME_TYPES[path.extname(relativeRequestPath).toLowerCase()]
  if (!contentType) {
    return { ok: false, statusCode: 404 }
  }

  const resolvedPhotosDirectory = path.resolve(photosDirectory)
  const resolvedFilePath = path.resolve(resolvedPhotosDirectory, ...pathSegments)
  if (!isPathInside(resolvedPhotosDirectory, resolvedFilePath)) {
    return { ok: false, statusCode: 403 }
  }

  try {
    let currentPath = resolvedPhotosDirectory
    for (const segment of pathSegments) {
      currentPath = path.join(currentPath, segment)
      if (fs.lstatSync(currentPath).isSymbolicLink()) {
        return { ok: false, statusCode: 403 }
      }
    }

    const realPhotosDirectory = fs.realpathSync(resolvedPhotosDirectory)
    const realFilePath = fs.realpathSync(resolvedFilePath)
    if (!isPathInside(realPhotosDirectory, realFilePath)) {
      return { ok: false, statusCode: 403 }
    }

    const stats = fs.statSync(realFilePath)
    if (!stats.isFile()) {
      return { ok: false, statusCode: 404 }
    }

    return {
      ok: true,
      contentType,
      filePath: realFilePath,
      stats,
    }
  } catch (error) {
    if (isMissingFileError(error)) {
      return { ok: false, statusCode: 404 }
    }
    throw error
  }
}

export function parseByteRange(rangeHeader: string, fileSize: number): ByteRange | null {
  if (!Number.isSafeInteger(fileSize) || fileSize <= 0) return null

  const match = /^bytes=(\d*)-(\d*)$/u.exec(rangeHeader)
  if (!match || (!match[1] && !match[2])) return null

  if (!match[1]) {
    const suffixLength = Number.parseInt(match[2]!, 10)
    if (!Number.isSafeInteger(suffixLength) || suffixLength <= 0) return null

    return {
      start: Math.max(fileSize - suffixLength, 0),
      end: fileSize - 1,
    }
  }

  const start = Number.parseInt(match[1], 10)
  const requestedEnd = match[2] ? Number.parseInt(match[2], 10) : fileSize - 1
  if (
    !Number.isSafeInteger(start) ||
    !Number.isSafeInteger(requestedEnd) ||
    start < 0 ||
    start >= fileSize ||
    requestedEnd < start
  ) {
    return null
  }

  return {
    start,
    end: Math.min(requestedEnd, fileSize - 1),
  }
}

/**
 * Vite plugin that serves local photos in development without exposing other
 * files from the private photo repository.
 */
export function photosStaticPlugin(): Plugin {
  return {
    name: 'photos-static',
    configureServer(server) {
      const publicPhotosDirectory = path.resolve(projectRoot, './apps/web/public/photos')
      if (fs.existsSync(publicPhotosDirectory)) {
        server.config.logger.warn(
          "[photos-static] Detected 'apps/web/public/photos' directory. Skipping plugin to avoid conflict with Vite static serving.",
        )
        return
      }

      const photosDirectory = path.resolve(projectRoot, 'photos')

      server.middlewares.use('/photos', (req, res, next) => {
        if (!req.url) {
          next()
          return
        }

        if (req.method !== 'GET' && req.method !== 'HEAD') {
          res.statusCode = 405
          res.setHeader('Allow', 'GET, HEAD')
          res.end('Method Not Allowed')
          return
        }

        const resolution = resolvePhotoFileRequest(req.url, photosDirectory)
        if (!resolution.ok) {
          res.statusCode = resolution.statusCode
          res.end(getErrorMessage(resolution.statusCode))
          return
        }

        const { contentType, filePath, stats } = resolution
        const etag = `"${stats.mtime.getTime()}-${stats.size}"`

        res.setHeader('Content-Type', contentType)
        res.setHeader('X-Content-Type-Options', 'nosniff')
        res.setHeader('Accept-Ranges', 'bytes')
        res.setHeader('Cache-Control', 'private, no-cache')
        res.setHeader('ETag', etag)

        if (req.headers['if-none-match'] === etag) {
          res.statusCode = 304
          res.end()
          return
        }

        const rangeHeader = req.headers.range
        if (rangeHeader) {
          const range = parseByteRange(rangeHeader, stats.size)
          if (!range) {
            res.statusCode = 416
            res.setHeader('Content-Range', `bytes */${stats.size}`)
            res.end()
            return
          }

          res.statusCode = 206
          res.setHeader('Content-Range', `bytes ${range.start}-${range.end}/${stats.size}`)
          res.setHeader('Content-Length', range.end - range.start + 1)

          if (req.method === 'HEAD') {
            res.end()
            return
          }

          streamFile(filePath, res, range)
          return
        }

        res.setHeader('Content-Length', stats.size)
        if (req.method === 'HEAD') {
          res.end()
          return
        }

        streamFile(filePath, res)
      })
    },
  }
}

function streamFile(
  filePath: string,
  response: NodeJS.WritableStream & { destroy: (error?: Error) => void },
  range?: ByteRange,
) {
  const stream = fs.createReadStream(filePath, range)
  stream.on('error', (error) => {
    console.error('[photos-static] Error streaming photo file:', error)
    response.destroy(error)
  })
  stream.pipe(response)
}

function hasUnsafePathCharacters(value: string): boolean {
  for (const character of value) {
    const codePoint = character.codePointAt(0) ?? 0
    if (character === '\\' || codePoint <= 0x1f || codePoint === 0x7f) return true
  }
  return false
}

function isPathInside(parentPath: string, childPath: string): boolean {
  const relativePath = path.relative(parentPath, childPath)
  return (
    Boolean(relativePath) &&
    !relativePath.startsWith(`..${path.sep}`) &&
    relativePath !== '..' &&
    !path.isAbsolute(relativePath)
  )
}

function isMissingFileError(error: unknown): error is NodeJS.ErrnoException {
  return error instanceof Error && 'code' in error && (error.code === 'ENOENT' || error.code === 'ENOTDIR')
}

function getErrorMessage(statusCode: 400 | 403 | 404): string {
  if (statusCode === 400) return 'Bad Request'
  if (statusCode === 403) return 'Forbidden'
  return 'Not Found'
}
