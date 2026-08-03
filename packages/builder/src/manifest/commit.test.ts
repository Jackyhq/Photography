// @vitest-environment node

import { describe, expect, it, vi } from 'vitest'

import { commitManifestThenCleanup } from './commit.js'

describe('commitManifestThenCleanup', () => {
  it('cleans obsolete thumbnails only after the manifest is committed', async () => {
    const events: string[] = []

    const deletedCount = await commitManifestThenCleanup(
      async () => {
        events.push('commit')
      },
      async () => {
        events.push('cleanup')
        return 3
      },
    )

    expect(events).toEqual(['commit', 'cleanup'])
    expect(deletedCount).toBe(3)
  })

  it('preserves thumbnails when the manifest commit fails', async () => {
    const cleanup = vi.fn(async () => 0)

    await expect(
      commitManifestThenCleanup(async () => {
        throw new Error('commit failed')
      }, cleanup),
    ).rejects.toThrow('commit failed')

    expect(cleanup).not.toHaveBeenCalled()
  })
})
