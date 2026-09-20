// @vitest-environment node

import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'

import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { getManifest } from 'workbox-build'

import { HASHED_PRECACHE_URL_PATTERN } from './pwa-precache'

const HASHED_VENDOR_FILES = ['vendor/react-Cbh89ZlP.js', 'vendor/i18n-Abc_12-3.js']
const UNVERSIONED_FILES = ['index.html', 'pwa-cache-migration.js', 'vendor/react.js', 'vendor/plain-helper.js']
const FIXTURE_FILES = [
  ...HASHED_VENDOR_FILES,
  ...UNVERSIONED_FILES,
  'assets/index-AbCd1234.js',
  'assets/index.abcdef.css',
  'assets/photos-index.1234567890.js',
  'vendor/react-1234567.js',
  'other/vendor/react-AbCd1234.js',
]

describe('PWA precache revisions', () => {
  let directory: string

  const readManifest = (dontCacheBustURLsMatching: RegExp) =>
    getManifest({
      globDirectory: directory,
      globPatterns: ['index.html', '**/*.{js,css}'],
      dontCacheBustURLsMatching,
    })

  beforeEach(() => {
    directory = mkdtempSync(path.join(tmpdir(), 'afilmory-pwa-precache-'))
    for (const file of FIXTURE_FILES) {
      const filePath = path.join(directory, file)
      mkdirSync(path.dirname(filePath), { recursive: true })
      writeFileSync(filePath, `Original contents of ${file}`)
    }
  })

  afterEach(() => {
    rmSync(directory, { recursive: true, force: true })
  })

  it('only removes redundant vendor revisions without changing the precache URL set', async () => {
    const before = await readManifest(/^assets\//)
    const after = await readManifest(HASHED_PRECACHE_URL_PATTERN)
    const beforeEntries = new Map(before.manifestEntries.map((entry) => [entry.url, entry]))

    expect(after.warnings).toEqual([])
    expect(after.count).toBe(FIXTURE_FILES.length)
    expect(after.count).toBe(before.count)
    expect(after.size).toBe(before.size)
    expect(after.manifestEntries.map((entry) => entry.url).sort()).toEqual(
      before.manifestEntries.map((entry) => entry.url).sort(),
    )

    for (const entry of after.manifestEntries) {
      if (HASHED_VENDOR_FILES.includes(entry.url)) {
        expect(beforeEntries.get(entry.url)?.revision).toBeTypeOf('string')
        expect(entry.revision).toBeNull()
      } else {
        expect(entry).toEqual(beforeEntries.get(entry.url))
      }
    }
  })

  it('keeps content revisions for unversioned files so their replacements still update', async () => {
    const before = await readManifest(HASHED_PRECACHE_URL_PATTERN)
    for (const file of UNVERSIONED_FILES) {
      writeFileSync(path.join(directory, file), `Updated contents of ${file}`)
    }
    const after = await readManifest(HASHED_PRECACHE_URL_PATTERN)

    for (const file of UNVERSIONED_FILES) {
      const beforeRevision = before.manifestEntries.find((entry) => entry.url === file)?.revision
      const afterRevision = after.manifestEntries.find((entry) => entry.url === file)?.revision
      expect(beforeRevision).toBeTypeOf('string')
      expect(afterRevision).toBeTypeOf('string')
      expect(afterRevision).not.toBe(beforeRevision)
    }
  })
})
