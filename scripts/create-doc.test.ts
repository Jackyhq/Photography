import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

import { afterEach, describe, expect, it } from 'vitest'

import { generateTemplate, getCategories, validateDescription, validateFilename, validateTitle } from './create-doc'

const temporaryDirectories: string[] = []

afterEach(() => {
  for (const directory of temporaryDirectories.splice(0)) {
    rmSync(directory, { recursive: true, force: true })
  }
})

describe('create documentation helpers', () => {
  it('discovers real documentation categories in sorted order', () => {
    const contentsDirectory = mkdtempSync(join(tmpdir(), 'afilmory-doc-categories-'))
    temporaryDirectories.push(contentsDirectory)
    mkdirSync(join(contentsDirectory, 'storage'))
    mkdirSync(join(contentsDirectory, 'deployment'))
    writeFileSync(join(contentsDirectory, 'index.mdx'), '# Overview')

    expect(getCategories(contentsDirectory)).toEqual(['deployment', 'storage'])
  })

  it('does not invent categories when the contents directory is unavailable', () => {
    const temporaryDirectory = mkdtempSync(join(tmpdir(), 'afilmory-doc-missing-'))
    temporaryDirectories.push(temporaryDirectory)

    expect(getCategories(join(temporaryDirectory, 'missing'))).toEqual([])
  })

  it('requires single-line titles and descriptions', () => {
    expect(validateTitle('')).toBe('Title is required')
    expect(validateTitle('Title\nInjected field')).toBe('Title must be a single line')
    expect(validateTitle('Architecture')).toBeUndefined()

    expect(validateDescription('   ')).toBe('Description is required')
    expect(validateDescription('Summary\nInjected field')).toBe('Description must be a single line')
    expect(validateDescription('Workspace responsibilities and data flow.')).toBeUndefined()
  })

  it('validates route-safe filenames', () => {
    expect(validateFilename('../architecture')).toBe(
      'Filename can only contain lowercase letters, numbers, and hyphens',
    )
    expect(validateFilename('architecture')).toBeUndefined()
  })

  it('always writes required frontmatter and trims prompt values', () => {
    const content = generateTemplate({
      title: '  Architecture  ',
      description: '  Workspace responsibilities and data flow.  ',
      filename: 'architecture',
      template: 'basic',
    })

    expect(content).toContain('title: Architecture\ndescription: Workspace responsibilities and data flow.')
    expect(content).toContain('# Architecture')
  })
})
