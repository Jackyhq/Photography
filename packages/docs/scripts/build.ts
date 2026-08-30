#!/usr/bin/env node

import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

import type { RouteConfig } from '../src/routes'
import routes from '../src/routes.json'
import { docsSite, getDocsUrl } from '../src/site'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const docsRoot = join(__dirname, '..')

async function build() {
  try {
    // Import the static module using file URL to handle path resolution
    const staticModulePath = pathToFileURL(join(docsRoot, 'dist/static/main-static.js')).href
    const staticModule = await import(staticModulePath)

    // Read the base HTML template
    const templatePath = join(docsRoot, 'dist/index.html')
    const templateHtml = await readFile(templatePath, 'utf-8')

    // Generate HTML for each route
    for (const route of routes) {
      const { html } = staticModule.render(route.path)

      // Replace placeholders in template
      const pageHtml = templateHtml
        .replace('<!--app-html-->', html)
        .replace('<!--app-title-->', generatePageTitle(route))
        .replace('<!--app-head-->', generateMetaTags(route))

      // Determine output path
      const outputPath = getOutputPath(route.path)

      // Ensure directory exists
      await mkdir(dirname(outputPath), { recursive: true })

      // Write the HTML file
      await writeFile(outputPath, pageHtml, 'utf-8')

      console.info(`✅ Generated: ${route.path} -> ${outputPath}`)
    }

    console.info('✅ Successfully built all static HTML files')
  } catch (error) {
    console.error('❌ Build failed:', error)
    process.exit(1)
  }
}

function generateMetaTags(route: Omit<RouteConfig, 'component'>): string {
  const meta = route.meta || {}
  const tags: string[] = []

  const description = (meta.description as string) || docsSite.description
  const pageTitle = generatePageTitle(route)
  const routeTitle = (meta.title as string) || route.title || docsSite.name
  const canonicalUrl = getDocsUrl(route.path)
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: pageTitle,
    headline: routeTitle,
    description,
    url: canonicalUrl,
    isPartOf: {
      '@type': 'WebSite',
      name: docsSite.name,
      url: `${docsSite.url}/`,
    },
    about: {
      '@type': 'WebSite',
      name: "Jacky's Photography",
      url: docsSite.galleryUrl,
    },
    author: {
      '@type': 'Person',
      name: docsSite.authorName,
      url: docsSite.homepageUrl,
    },
  }

  if (description) {
    tags.push(
      `<meta name="description" content="${escapeHtml(description)}">`,
      `<meta property="og:description" content="${escapeHtml(description)}">`,
      `<meta name="twitter:description" content="${escapeHtml(description)}">`,
    )
  }

  tags.push(
    '<meta name="robots" content="index, follow">',
    `<meta name="author" content="${escapeHtml(docsSite.authorName)}">`,
    `<link rel="canonical" href="${escapeHtml(canonicalUrl)}">`,
    `<meta property="og:type" content="website">`,
    `<meta property="og:site_name" content="${escapeHtml(docsSite.name)}">`,
    `<meta property="og:url" content="${escapeHtml(canonicalUrl)}">`,
    `<meta property="og:title" content="${escapeHtml(pageTitle)}">`,
    `<meta property="og:locale" content="en_US">`,
    `<meta name="twitter:card" content="summary">`,
    `<meta name="twitter:title" content="${escapeHtml(pageTitle)}">`,
    `<script type="application/ld+json">${JSON.stringify(structuredData).replaceAll('<', '\\u003c')}</script>`,
  )

  return tags.join('\n    ')
}

function generatePageTitle(route: Omit<RouteConfig, 'component'>): string {
  const title = (route.meta?.title as string) || route.title
  return title ? `${title} | ${docsSite.name}` : docsSite.name
}

function escapeHtml(value: string): string {
  return value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
}

function getOutputPath(routePath: string): string {
  const distDir = join(docsRoot, 'dist')

  if (routePath === '/') {
    return join(distDir, 'index.html')
  }

  // Remove leading slash and create directory structure
  const cleanPath = routePath.replace(/^\//, '')
  return join(distDir, cleanPath, 'index.html')
}

build()
