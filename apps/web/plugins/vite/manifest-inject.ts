import { readFileSync } from 'node:fs'

import type { Plugin } from 'vite'

import { MANIFEST_PATH } from './__internal__/constants'

interface PreloadManifestItem {
  thumbnailUrl?: string
  thumbnailWebpSrcSet?: string
}

const PRELOAD_THUMBNAIL_COUNT = 2

function resolveEmbedPreference(_command: 'serve' | 'build'): boolean {
  const flag = process.env.AFILMORY_EMBED_MANIFEST?.trim().toLowerCase()
  if (flag === 'true') return true
  if (flag === 'false') return false
  return true
}

function escapeAttribute(value: string): string {
  return value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
}

function getFirstSrcFromSrcSet(srcSet: string): string {
  return srcSet.split(',')[0]?.trim().split(/\s+/)[0] ?? ''
}

function createThumbnailPreloadLinks(manifestContent: string): string {
  try {
    const manifest = JSON.parse(manifestContent) as { data?: PreloadManifestItem[] }
    const items = manifest.data?.slice(0, PRELOAD_THUMBNAIL_COUNT) ?? []

    return items
      .map((item, index) => {
        const webpSrcSet = item.thumbnailWebpSrcSet?.trim()
        const href = webpSrcSet ? getFirstSrcFromSrcSet(webpSrcSet) : item.thumbnailUrl
        if (!href) return ''

        const attributes = [
          'rel="preload"',
          'as="image"',
          `href="${escapeAttribute(href)}"`,
          'imagesizes="(max-width: 640px) 50vw, 350px"',
        ]

        if (index === 0) {
          attributes.push('fetchpriority="high"')
        }

        if (webpSrcSet) {
          attributes.push('type="image/webp"', `imagesrcset="${escapeAttribute(webpSrcSet)}"`)
        }

        return `<link ${attributes.join(' ')}>`
      })
      .filter(Boolean)
      .join('')
  } catch (error) {
    console.warn('Failed to create thumbnail preload links:', error)
    return ''
  }
}

export function manifestInjectPlugin(): Plugin {
  let embedManifest: boolean | undefined

  function getManifestContent(): string {
    try {
      const content = readFileSync(MANIFEST_PATH, 'utf-8')
      return content
    } catch (error) {
      console.warn('Failed to read manifest file:', error)
      return '{}'
    }
  }

  return {
    name: 'manifest-inject',

    configResolved(config) {
      embedManifest = resolveEmbedPreference(config.command as 'serve' | 'build')
    },

    configureServer(server) {
      const shouldEmbed = embedManifest ?? resolveEmbedPreference(server.config.command as 'serve')
      if (!shouldEmbed) {
        return
      }

      // 监听 manifest 文件变化
      server.watcher.add(MANIFEST_PATH)

      server.watcher.on('change', (file) => {
        if (file === MANIFEST_PATH) {
          console.info('[manifest-inject] Manifest file changed, triggering HMR...')
          // 触发页面重新加载
          server.ws.send({
            type: 'full-reload',
          })
        }
      })
    },

    transformIndexHtml(html, ctx) {
      const command: 'serve' | 'build' = ctx?.server ? 'serve' : 'build'
      const shouldEmbed = embedManifest ?? resolveEmbedPreference(command)
      embedManifest = shouldEmbed
      if (!shouldEmbed) {
        return html
      }

      const manifestContent = getManifestContent()

      // 将 manifest 内容注入到 script#manifest 标签中
      const scriptContent = `window.__MANIFEST__ = ${manifestContent};`
      const preloadLinks = createThumbnailPreloadLinks(manifestContent)

      return html.replace(
        '<script id="manifest"></script>',
        `${preloadLinks}<script id="manifest">${scriptContent}</script>`,
      )
    },
  }
}
