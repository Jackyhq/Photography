import { execSync } from 'node:child_process'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { codeInspectorPlugin } from 'code-inspector-plugin'
import { cyan, dim, green } from 'kolorist'
import type { PluginOption, ViteDevServer } from 'vite'
import { defineConfig } from 'vite'
import { analyzer } from 'vite-bundle-analyzer'
import { checker } from 'vite-plugin-checker'
import { createHtmlPlugin } from 'vite-plugin-html'
import { VitePWA } from 'vite-plugin-pwa'
import tsconfigPaths from 'vite-tsconfig-paths'

import PKG from '../../package.json'
import { siteConfig } from '../../site.config'
import { astPlugin } from './plugins/vite/ast'
import { createDependencyChunksPlugin } from './plugins/vite/deps'
import { featuredPhotosPlugin } from './plugins/vite/featured-photos'
import { createFeedSitemapPlugin } from './plugins/vite/feed-sitemap'
import { localesJsonPlugin } from './plugins/vite/locales-json'
import { manifestInjectPlugin } from './plugins/vite/manifest-inject'
import { ogImagePlugin } from './plugins/vite/og-image-plugin'
import { createPhotoPageMetaPlugin } from './plugins/vite/photo-page-meta'
import {
  createOptionalCodeRuntimeCaching,
  createPhotoRuntimeCaching,
  OPTIONAL_CODE_PRECACHE_GLOBS,
} from './plugins/vite/photo-runtime-cache'
import { photosStaticPlugin } from './plugins/vite/photos-static'
import { pruneJpegThumbnailsPlugin } from './plugins/vite/prune-jpeg-thumbnails'
import { siteConfigInjectPlugin } from './plugins/vite/site-config-inject'

const devPrint = (): PluginOption => ({
  name: 'dev-print',
  configureServer(server: ViteDevServer) {
    server.printUrls = () => {
      console.info(`  ${green('➜')}  ${dim('Web')}: ${cyan('http://localhost:13333')}`)
    }
  },
})

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const productionRouterPlugin = (enabled: boolean): PluginOption => ({
  name: 'production-router',
  enforce: 'pre',
  transform(code, id) {
    if (!enabled || !id.includes('/src/main.tsx')) {
      return null
    }

    return {
      code: code.replace("from './router'", "from './router.prod'"),
      map: null,
    }
  },
})

const ReactCompilerConfig = {
  /* ... */
}

const BUILD_FOR_SERVER_SERVE = process.env.BUILD_FOR_SERVER_SERVE === '1'

const bundleAnalyzerPlugin =
  process.env.analyzer === 'json'
    ? analyzer({
        analyzerMode: 'json',
        defaultSizes: 'gzip',
        fileName: process.env.ANALYZER_FILE || 'stats',
      })
    : process.env.analyzer
      ? analyzer()
      : null

const escapedSiteUrlJson = JSON.stringify(siteConfig.url)
  .replaceAll('<', '\\u003C')
  .replaceAll('\u2028', '\\u2028')
  .replaceAll('\u2029', '\\u2029')

const staticWebBuildPlugins: PluginOption[] = [
  manifestInjectPlugin(),
  siteConfigInjectPlugin(),
  photosStaticPlugin(),
  featuredPhotosPlugin(siteConfig),

  VitePWA({
    base: '/',
    scope: '/',
    injectRegister: false,
    registerType: 'prompt',
    includeAssets: [
      'favicon.ico',
      'favicon-16x16.png',
      'favicon-32x32.png',
      'favicon-48x48.png',
      'apple-touch-icon.png',
      'android-chrome-192x192.png',
      'android-chrome-512x512.png',
      'android-chrome-maskable-512x512.png',
      'feed.xml',
      'sitemap.xml',
    ],
    manifest: {
      name: siteConfig.title,
      short_name: siteConfig.name,
      description: siteConfig.description,
      theme_color: '#1c1c1e',
      background_color: '#1c1c1e',
      display: 'standalone',
      scope: '/',
      start_url: '/',
      icons: [
        {
          src: 'android-chrome-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: 'android-chrome-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any',
        },
        {
          src: 'android-chrome-maskable-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'maskable',
        },
        {
          src: 'apple-touch-icon.png',
          sizes: '180x180',
          type: 'image/png',
        },
      ],
    },
    workbox: {
      maximumFileSizeToCacheInBytes: 10 * 1024 * 1024, // 10MB
      importScripts: ['pwa-cache-migration.js'],
      globPatterns: ['index.html', '**/*.{js,css,ico,svg}'],
      globIgnores: [
        'photos/**/*.html',
        'thumbnails/**/*',
        '**/*.{jpg,jpeg,png,webp,avif,gif,mp4,mov,webm}',
        ...OPTIONAL_CODE_PRECACHE_GLOBS,
      ],
      runtimeCaching: [...createPhotoRuntimeCaching(), ...createOptionalCodeRuntimeCaching()],
    },
    devOptions: {
      enabled: false, // 开发环境不启用 PWA
    },
  }),

  ogImagePlugin({
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
    siteUrl: siteConfig.url,
  }),
  createFeedSitemapPlugin(siteConfig),
  createPhotoPageMetaPlugin(siteConfig),
  createHtmlPlugin({
    minify: {
      collapseWhitespace: true,
      keepClosingSlash: true,
      removeComments: true,
      removeRedundantAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
      useShortDoctype: true,
      minifyCSS: true,
      minifyJS: true,
    },
    inject: {
      data: {
        title: siteConfig.title,
        description: siteConfig.description,
        siteUrlJson: escapedSiteUrlJson,
      },
    },
  }),
  pruneJpegThumbnailsPlugin(),
]

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  return {
    base: BUILD_FOR_SERVER_SERVE ? '/static/web/' : '/',
    plugins: [
      productionRouterPlugin(command === 'build'),
      codeInspectorPlugin({
        bundler: 'vite',
        hotKeys: ['altKey'],
      }),
      react({
        babel: {
          plugins: [['babel-plugin-react-compiler', ReactCompilerConfig]],
        },
      }),

      astPlugin,
      tsconfigPaths(),
      checker({
        typescript: true,
        enableBuild: true,
        root: __dirname,
      }),

      createDependencyChunksPlugin([
        { name: 'heic', dependencies: ['heic-to'] },
        { name: 'react', dependencies: ['react', 'react-dom'] },
        { name: 'i18n', dependencies: ['i18next', 'i18next-browser-languagedetector', 'react-i18next'] },
      ]),
      localesJsonPlugin(),
      tailwindcss(),
      ...(BUILD_FOR_SERVER_SERVE ? [] : staticWebBuildPlugins),
      bundleAnalyzerPlugin,

      devPrint(),
    ],
    server: {
      port: 13333,
    },
    build: {
      manifest: '.vite/manifest.json',
    },
    define: {
      APP_DEV_CWD: JSON.stringify(process.cwd()),
      APP_NAME: JSON.stringify(PKG.name),
      BUILT_DATE: JSON.stringify(new Date().toLocaleDateString()),
      GIT_COMMIT_HASH: JSON.stringify(getGitHash()),
    },
  }
})

function getGitHash() {
  try {
    return execSync('git rev-parse HEAD').toString().trim()
  } catch (e) {
    console.error('Failed to get git hash', e)
    return ''
  }
}
