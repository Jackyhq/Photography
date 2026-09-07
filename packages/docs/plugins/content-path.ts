import path from 'node:path'

export function getDocumentRoutePath(file: string, contentsDir: string, indexFile: string): string {
  const routePath = path
    .relative(contentsDir, file)
    .split(path.sep)
    .join('/')
    .replace(/\.(md|mdx)$/, '')
  if (routePath === indexFile) return '/'
  if (routePath.endsWith(`/${indexFile}`)) return `/${routePath.slice(0, -(indexFile.length + 1))}`
  return `/${routePath}`
}
