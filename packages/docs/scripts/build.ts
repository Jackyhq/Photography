#!/usr/bin/env node

import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

import routes from '../src/routes.json'
import { writeDocsStaticOutput } from './static-output'

const docsRoot = fileURLToPath(new URL('..', import.meta.url))

async function build() {
  const staticModulePath = pathToFileURL(join(docsRoot, 'dist/static/main-static.js')).href
  const staticModule: unknown = await import(staticModulePath)
  if (
    !staticModule ||
    typeof staticModule !== 'object' ||
    !('render' in staticModule) ||
    typeof staticModule.render !== 'function'
  ) {
    throw new TypeError('The documentation SSR bundle must export render(path).')
  }
  const render = staticModule.render as (path: string) => { html: string }
  const outputDir = join(docsRoot, 'dist')
  const templateHtml = await readFile(join(outputDir, 'index.html'), 'utf-8')

  await writeDocsStaticOutput({ outputDir, templateHtml, routes, render })
  console.info(`Generated ${routes.length} documentation pages, 404.html, sitemap.xml and robots.txt.`)
}

build().catch((error: unknown) => {
  console.error('Documentation build failed:', error)
  process.exitCode = 1
})
