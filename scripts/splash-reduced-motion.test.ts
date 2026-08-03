// @vitest-environment node

import { readFileSync } from 'node:fs'
import path from 'node:path'

import { describe, expect, it } from 'vitest'

describe('splash screen motion preferences', () => {
  it('disables inline splash animations when reduced motion is requested', () => {
    const html = readFileSync(path.resolve(process.cwd(), 'apps/web/index.html'), 'utf8')

    expect(html).toMatch(/@media\s*\(prefers-reduced-motion:\s*reduce\)/)
    expect(html).toMatch(/#splash-screen\s+\[style\*=['"]animation:['"]\]\s*\{[^}]*animation:\s*none\s*!important/)
  })
})
