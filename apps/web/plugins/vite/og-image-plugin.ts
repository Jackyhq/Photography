import type { Plugin } from 'vite'

import { cleanupOldOGImages } from '../../../../scripts/assets/cleanup-og-images.js'
import { generateFavicons } from '../../../../scripts/assets/generate-favicon.js'
import { generateOGImage } from '../../../../scripts/assets/generate-og-image.js'

interface OGImagePluginOptions {
  title?: string
  description?: string
  siteName?: string
  siteUrl?: string
  authorName?: string
  locale?: string
  alternateLocales?: string[]
}

export function ogImagePlugin(options: OGImagePluginOptions = {}): Plugin {
  const {
    title = 'Afilmory',
    description = 'Capturing beautiful moments in life, documenting daily warmth and emotions through my lens.',
    siteName = 'Afilmory',
    siteUrl = '',
    authorName = siteName,
    locale = 'en_US',
    alternateLocales = [],
  } = options

  let ogImagePath = ''

  return {
    name: 'og-image-plugin',
    apply: 'build',
    async buildStart() {
      // 在构建开始时生成 OG 图片
      const timestamp = Date.now()
      const fileName = `og-image-${timestamp}.png`

      try {
        // 生成 favicon
        await generateFavicons()

        // 生成 OG 图片
        await generateOGImage({
          title,
          description,
          outputPath: fileName,
          includePhotos: true,
          photoCount: 4,
        })
        ogImagePath = `/${fileName}`
        console.info(`🖼️  OG image generated: ${ogImagePath}`)

        // 清理旧的 OG 图片
        await cleanupOldOGImages(3)
      } catch (error) {
        console.error('Failed to generate OG image:', error)
      }
    },
    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        if (!ogImagePath) {
          console.warn('⚠️  No OG image path available')
          return html
        }

        const alternateLocaleTags = alternateLocales
          .filter((alternateLocale) => alternateLocale !== locale)
          .map((alternateLocale) => `    <meta property="og:locale:alternate" content="${alternateLocale}" />`)
          .join('\n')

        // 生成 meta 标签
        const metaTags = `
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${siteUrl}" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:image" content="${siteUrl}${ogImagePath}" />
    <meta property="og:image:alt" content="${title}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:site_name" content="${siteName}" />
    <meta property="og:locale" content="${locale}" />
${alternateLocaleTags}

    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content="${siteUrl}" />
    <meta property="twitter:title" content="${title}" />
    <meta property="twitter:description" content="${description}" />
    <meta property="twitter:image" content="${siteUrl}${ogImagePath}" />
    <meta property="twitter:image:alt" content="${title}" />

    <!-- Additional meta tags -->
    <meta name="author" content="${authorName}" />
    <meta name="generator" content="Vite + React" />
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
    <meta name="theme-color" content="#0a0a0a" />
    <meta name="msapplication-TileColor" content="#0a0a0a" />
    
    <!-- Favicon and app icons -->
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
    <link rel="shortcut icon" href="/favicon.ico" />
        `

        // 在 </head> 标签前插入 meta 标签
        return html.replace('</head>', `${metaTags}\n  </head>`)
      },
    },
  }
}
