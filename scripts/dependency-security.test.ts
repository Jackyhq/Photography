// @vitest-environment node
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { runInNewContext } from 'node:vm'

import fg from 'fast-glob'
import { describe, expect, it } from 'vitest'

interface BraceNode {
  type: string
  value?: string
  nodes?: BraceNode[]
  parent?: BraceNode
}

interface BraceOptions {
  maxDepth?: number
  escapeInvalid?: boolean
}

interface Braces {
  parse: (input: string, options?: BraceOptions) => BraceNode
  compile: (input: string | BraceNode, options?: BraceOptions) => string
  expand: (input: string | BraceNode, options?: BraceOptions) => string[]
  stringify: (input: string | BraceNode, options?: BraceOptions) => string
}

// Resolve the same patched dependency that fast-glob consumes through micromatch.
const requireFromRoot = createRequire(import.meta.url)
const requireFromGlob = createRequire(requireFromRoot.resolve('fast-glob'))
const requireFromMicromatch = createRequire(requireFromGlob.resolve('micromatch'))
const braces = requireFromMicromatch('braces') as Braces

const nestedPattern = (open: string, close: string, depth: number) => `${open.repeat(depth)}a${close.repeat(depth)}`

const nestedAst = (depth: number, root = true): BraceNode => {
  let node: BraceNode = { type: 'text', value: 'a' }
  for (let i = 0; i < depth; i++) node = { type: 'brace', nodes: [node] }
  return root ? { type: 'root', nodes: [node] } : node
}

describe('braces security backport (GHSA-vfj7-8cjw-p6xm)', () => {
  it.each(['parse', 'compile', 'expand', 'stringify'] as const)(
    '%s rejects excessive nesting before recursion',
    (entry) => {
      for (const pattern of [
        nestedPattern('{', '}', 3000),
        nestedPattern('(', ')', 3000),
        nestedPattern('{(', ')}', 51),
        '{'.repeat(101),
        '('.repeat(101),
      ]) {
        expect(() => braces[entry](pattern)).toThrow(/Input depth .* exceeds max depth \(100\)/)
      }
    },
  )

  it.each(['{', '('])('accepts 100 levels and rejects 101 levels of %s', (open) => {
    const close = open === '{' ? '}' : ')'
    const allowed = nestedPattern(open, close, 100)
    expect(braces.compile(allowed)).toBe(allowed)
    expect(braces.expand(allowed)).toEqual([allowed])
    expect(braces.stringify(allowed)).toBe(allowed)
    expect(() => braces.parse(nestedPattern(open, close, 101))).toThrow(/exceeds max depth/)
  })

  it.each([101, 10_000, Number.POSITIVE_INFINITY, Number.NaN])('caps maxDepth=%s at the safe limit', (maxDepth) => {
    expect(() => braces.compile(nestedPattern('{', '}', 101), { maxDepth })).toThrow(/exceeds max depth \(100\)/)
  })

  it('supports stricter and fractional depth limits', () => {
    expect(braces.expand('{a,b}', { maxDepth: 1.5 })).toEqual(['a', 'b'])
    expect(() => braces.parse('{{a,b},c}', { maxDepth: 1.5 })).toThrow(/exceeds max depth \(1.5\)/)
    expect(() => braces.parse('((a))', { maxDepth: 1 })).toThrow(/exceeds max depth \(1\)/)
  })

  it.each(['compile', 'expand', 'stringify'] as const)('%s guards caller-supplied ASTs and subtrees', (entry) => {
    for (const root of [true, false]) {
      expect(() => braces[entry](nestedAst(101, root))).toThrow(/AST depth .* exceeds max depth \(100\)/)
    }
  })

  it.each([false, true])('rejects cyclic AST parent links (multiple nodes: %s)', (multiple) => {
    const ast: BraceNode = { type: 'paren', nodes: [{ type: 'text', value: 'a' }] }
    if (multiple) {
      ast.parent = { type: 'paren', parent: ast }
    } else {
      ast.parent = ast
    }
    expect(() => runInNewContext('expand(ast)', { expand: braces.expand, ast }, { timeout: 250 })).toThrow(
      /AST parent chain contains a cycle/,
    )
  })

  it('preserves ordinary nested alternatives, ranges, parentheses and literal syntax', () => {
    expect(braces.expand('photo-{a,{b,c}}-{01..02}.jpg')).toEqual([
      'photo-a-01.jpg',
      'photo-a-02.jpg',
      'photo-b-01.jpg',
      'photo-b-02.jpg',
      'photo-c-01.jpg',
      'photo-c-02.jpg',
    ])
    expect(braces.expand('foo/({a,b})')).toEqual(['foo/(a)', 'foo/(b)'])
    expect(braces.expand(`\${a,b}`)).toEqual([`\${a,b}`])
    expect(braces.expand('photo-\\{a,b\\}.jpg')).toEqual(['photo-{a,b}.jpg'])
    expect(braces.expand('"{a,b}"')).toEqual(['{a,b}'])
    expect(braces.expand('photo-{a,b')).toEqual(['photo-{a,b'])
    for (const pattern of ['{{a}}', '{a,{b}}', '{{x}y}', '{a,{b,{c}}', '{}{a}']) {
      expect(braces.stringify(pattern, { escapeInvalid: true })).toBe(pattern)
    }
    expect(braces.stringify(nestedPattern('\\{', '\\}', 101))).toBe(nestedPattern('{', '}', 101))
    expect(braces.stringify(`"${nestedPattern('{', '}', 101)}"`)).toBe(nestedPattern('{', '}', 101))
  })

  it('preserves fast-glob matching for the photo pipeline', () => {
    const directory = mkdtempSync(path.join(tmpdir(), 'photography-glob-'))
    try {
      mkdirSync(path.join(directory, 'photos'))
      for (const filename of ['one.jpg', 'two.png', 'three.txt']) {
        writeFileSync(path.join(directory, 'photos', filename), '')
      }
      expect(fg.sync('photos/*.{jpg,png}', { cwd: directory }).sort()).toEqual(['photos/one.jpg', 'photos/two.png'])
    } finally {
      rmSync(directory, { recursive: true, force: true })
    }
  })
})
