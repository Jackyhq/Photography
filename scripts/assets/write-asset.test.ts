import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

import { afterEach, describe, expect, it } from 'vitest'

import { writeAssetIfChanged } from './write-asset.js'

const temporaryDirectories: string[] = []

afterEach(() => {
  for (const directory of temporaryDirectories.splice(0)) {
    fs.rmSync(directory, { recursive: true, force: true })
  }
})

describe('writeAssetIfChanged', () => {
  it('does not rewrite an identical generated asset', () => {
    const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'afilmory-asset-'))
    temporaryDirectories.push(directory)
    const outputPath = path.join(directory, 'favicon.png')
    const contents = Buffer.from('same bytes')

    expect(writeAssetIfChanged(outputPath, contents)).toBe(true)
    const initialModifiedAt = new Date('2026-01-01T00:00:00.000Z')
    fs.utimesSync(outputPath, initialModifiedAt, initialModifiedAt)

    expect(writeAssetIfChanged(outputPath, contents)).toBe(false)
    expect(fs.statSync(outputPath).mtimeMs).toBe(initialModifiedAt.getTime())
  })

  it('replaces an asset whose bytes changed', () => {
    const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'afilmory-asset-'))
    temporaryDirectories.push(directory)
    const outputPath = path.join(directory, 'favicon.png')
    fs.writeFileSync(outputPath, 'old bytes')

    expect(writeAssetIfChanged(outputPath, Buffer.from('new bytes'))).toBe(true)
    expect(fs.readFileSync(outputPath, 'utf8')).toBe('new bytes')
  })
})
