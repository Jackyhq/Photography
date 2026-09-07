// @vitest-environment node
import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'

import ts from 'typescript'
import { afterEach, describe, expect, it } from 'vitest'

import { parseFrontmatterValue } from './frontmatter-value'
import { generateRoutes } from './route-generater'

const directories: string[] = []

afterEach(async () => {
  await Promise.all(directories.splice(0).map((directory) => rm(directory, { recursive: true, force: true })))
})

describe('documentation route generation', () => {
  it.each([
    ['Jacky\'s "Guide"', 'Jacky\'s "Guide"'],
    ['"Jacky\'s \\"Guide\\""', 'Jacky\'s "Guide"'],
    ["'Jacky''s Guide'", "Jacky's Guide"],
  ])('preserves the intended title for %s', (source, expected) => {
    expect(parseFrontmatterValue(source)).toBe(expected)
  })

  it('keeps apostrophes, quotes and backslashes in titles without generating invalid TypeScript', async () => {
    const directory = await mkdtemp(join(tmpdir(), 'photography-doc-routes-'))
    directories.push(directory)
    const contentsDir = join(directory, 'contents')
    const outputDir = join(directory, 'src')
    await mkdir(join(contentsDir, 'guides'), { recursive: true })
    const title = 'Jacky\'s "Guide" \\ Notes'
    await writeFile(join(contentsDir, 'guides', 'index.mdx'), `---\ntitle: ${title}\n---\n# Guide\n`)

    await generateRoutes({ contentsDir, outputDir })

    const routes = JSON.parse(await readFile(join(outputDir, 'routes.json'), 'utf-8'))
    expect(routes).toEqual([expect.objectContaining({ path: '/guides', title })])
    const source = await readFile(join(outputDir, 'routes.ts'), 'utf-8')
    const parsedSource = ts.createSourceFile('routes.ts', source, ts.ScriptTarget.Latest, true)
    const imports = parsedSource.statements.filter(ts.isImportDeclaration).map((declaration) => {
      expect(ts.isStringLiteral(declaration.moduleSpecifier)).toBe(true)
      return (declaration.moduleSpecifier as ts.StringLiteral).text
    })
    expect(imports).toHaveLength(1)
    expect(resolve(outputDir, imports[0])).toBe(join(contentsDir, 'guides', 'index.mdx'))
    const compiled = ts.transpileModule(source, {
      compilerOptions: { module: ts.ModuleKind.ESNext },
      reportDiagnostics: true,
    })
    expect(compiled.diagnostics).toEqual([])
  })
})
