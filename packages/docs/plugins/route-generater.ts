import fs from 'node:fs/promises'
import path from 'node:path'
import { inspect } from 'node:util'

import { glob } from 'glob'
import type { Plugin } from 'vite'

import { formatGeneratedTypescript } from './format-generated'

interface RouteConfig {
  path: string
  component: string
  title?: string
  meta?: Record<string, unknown>
}

interface GenerateRoutesOptions {
  contentsDir?: string
  outputDir?: string
  outputFile?: string
  jsonFile?: string
  indexFile?: string
}

const defaultOptions: Required<GenerateRoutesOptions> = {
  contentsDir: 'contents',
  outputDir: 'src',
  outputFile: 'routes.ts',
  jsonFile: 'routes.json',
  indexFile: 'index',
}

/**
 * 约定式路由生成器插件
 *
 * 根据 contents 目录下的文件自动生成路由配置
 *
 * 约定规则：
 * - contents/index.md -> / (首页)
 * - contents/guide.md -> /guide
 * - contents/api/index.md -> /api (目录首页)
 * - contents/api/auth.md -> /api/auth
 * - contents/404.md -> /404 (404页面)
 */
export function routeGenerator(options: GenerateRoutesOptions = {}): Plugin {
  const opts = { ...defaultOptions, ...options }

  return {
    name: 'route-generator',
    enforce: 'pre',

    async buildStart() {
      await generateRoutes(opts)
    },

    async handleHotUpdate({ file, server }) {
      // 监听 contents 目录文件变化，重新生成路由
      if (file.includes(path.resolve(opts.contentsDir))) {
        await generateRoutes(opts)
        server.ws.send({
          type: 'full-reload',
        })
      }
    },

    configureServer(server) {
      // 开发模式下监听文件变化
      server.middlewares.use('/__generate-routes', async (_req, res) => {
        try {
          await generateRoutes(opts)
          res.end('Routes generated successfully')
        } catch (error) {
          res.statusCode = 500
          res.end(`Error generating routes: ${error}`)
        }
      })
    },
  }
}

async function generateRoutes(options: Required<GenerateRoutesOptions>) {
  const { contentsDir, outputDir, outputFile, jsonFile, indexFile } = options

  try {
    // 获取所有 markdown 文件
    const pattern = path.join(contentsDir, '**/*.{md,mdx}')
    const files = await glob(pattern, {
      ignore: ['**/node_modules/**'],
      absolute: false,
    })

    const routes: RouteConfig[] = []

    for (const file of files) {
      const route = await generateRouteFromFile(file, contentsDir, indexFile)
      if (route) {
        routes.push(route)
      }
    }

    // 按路径排序，确保首页在最前面
    routes.sort((a, b) => {
      if (a.path === '/') return -1
      if (b.path === '/') return 1
      return a.path.localeCompare(b.path)
    })

    // 确保输出目录存在
    await fs.mkdir(outputDir, { recursive: true })

    // 写入路由文件
    const outputPath = path.join(outputDir, outputFile)
    const routeFileContent = await formatGeneratedTypescript(generateRouteFileContent(routes), outputPath)
    await fs.writeFile(outputPath, routeFileContent, 'utf-8')

    // 生成 JSON 文件（不包含 component）
    const routesJson = generateRoutesJson(routes)
    const jsonPath = path.join(outputDir, jsonFile)
    await fs.writeFile(jsonPath, routesJson, 'utf-8')

    console.info(`✓ Generated ${routes.length} routes to ${outputPath}`)
    console.info(`✓ Generated routes JSON to ${jsonPath}`)
  } catch (error) {
    console.error('Error generating routes:', error)
    throw error
  }
}

async function generateRouteFromFile(
  file: string,
  contentsDir: string,
  indexFile: string,
): Promise<RouteConfig | null> {
  try {
    // 移除 contents 前缀和文件扩展名
    let routePath = file.replace(new RegExp(`^${contentsDir}/`), '').replace(/\.(md|mdx)$/, '')

    // 处理 index 文件
    if (routePath === indexFile) {
      routePath = '/'
    } else if (routePath.endsWith(`/${indexFile}`)) {
      const basePath = routePath.replace(`/${indexFile}`, '')
      routePath = basePath ? `/${basePath}` : '/'
    } else {
      routePath = `/${routePath}`
    }

    // 生成组件导入路径，保留文件后缀
    const componentPath = `../${file}`

    // 读取文件内容获取元数据
    const fileContent = await fs.readFile(file, 'utf-8')
    const meta = extractFrontmatter(fileContent)

    return {
      path: routePath,
      component: componentPath,
      title: (typeof meta.title === 'string' ? meta.title : undefined) || generateTitleFromPath(routePath),
      meta,
    }
  } catch (error) {
    console.warn(`Warning: Could not process file ${file}:`, error)
    return null
  }
}

function extractFrontmatter(content: string): Record<string, unknown> {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---(?:\n|$)/
  const match = content.match(frontmatterRegex)

  if (!match) {
    return {}
  }

  try {
    // 简单的 YAML 解析（仅支持基本的 key: value 格式）
    const yamlContent = match[1]
    const meta: Record<string, unknown> = {}

    yamlContent.split('\n').forEach((line) => {
      const colonIndex = line.indexOf(':')
      if (colonIndex > 0) {
        const key = line.slice(0, colonIndex).trim()
        const value = line
          .slice(colonIndex + 1)
          .trim()
          .replaceAll(/^["']|["']$/g, '')
        meta[key] = value
      }
    })

    return meta
  } catch (error) {
    console.warn('Failed to parse frontmatter:', error)
    return {}
  }
}

function generateTitleFromPath(path: string): string {
  if (path === '/') return 'Home'

  return path
    .split('/')
    .filter(Boolean)
    .map((segment) =>
      segment
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' '),
    )
    .join(' - ')
}

function generateRouteFileContent(routes: RouteConfig[]): string {
  const routeEntries = routes.map((route, index) => ({
    importName: `Route${index}`,
    route,
  }))
  const imports = [...routeEntries]
    .sort((a, b) => a.route.component.localeCompare(b.route.component))
    .map(({ importName, route }) => `import ${importName} from '${route.component}'`)
    .join('\n')
  const importNameByRoute = new Map(routeEntries.map(({ route, importName }) => [route, importName]))

  const routeObjects = routes
    .map((route) => {
      const importName = importNameByRoute.get(route)
      if (!importName) {
        throw new Error(`Missing generated import for route: ${route.path}`)
      }

      return `  {
    path: '${route.path}',
    component: ${importName},
    title: '${route.title}',
    meta: ${formatTsValue(route.meta, 4)},
  }`
    })
    .join(',\n')

  return `// Auto-generated route configuration
// This file is automatically generated by the route-generator plugin
// Do not edit manually - your changes will be overwritten

${imports}

export interface RouteConfig {
  path: string
  component: React.ComponentType
  title: string
  meta: Record<string, unknown>
}

export const routes: RouteConfig[] = [
${routeObjects}
]

export default routes
`
}

function generateRoutesJson(routes: RouteConfig[]): string {
  const routesData = routes.map((route) => ({
    path: route.path,
    title: route.title,
    meta: route.meta,
  }))

  return `${JSON.stringify(routesData, null, 2)}\n`
}

function formatTsValue(value: unknown, indentation: number): string {
  return inspect(value, {
    breakLength: 100,
    compact: false,
    depth: null,
    sorted: false,
  }).replaceAll('\n', `\n${' '.repeat(indentation)}`)
}

export default routeGenerator
