import { describe, expect, it, vi } from 'vitest'

import { createGalleryFilterCommands } from './command-palette-commands'

describe('createGalleryFilterCommands', () => {
  it('builds tag, camera and lens commands with active state and searchable metadata', () => {
    const commands = createGalleryFilterCommands({
      tags: ['street'],
      cameras: [{ make: 'Fujifilm', model: 'X-T5', displayName: 'Fujifilm X-T5' }],
      lenses: [{ make: 'Fujifilm', model: 'XF 23mm', displayName: 'Fujifilm XF 23mm' }],
      selectedTags: ['street'],
      selectedCameras: [],
      selectedLenses: ['Fujifilm XF 23mm'],
      labels: { tag: 'Tag', camera: 'Camera', lens: 'Lens' },
      lensIcon: 'lens-icon',
      onToggle: vi.fn(),
    })

    expect(commands.map(({ id, active }) => ({ id, active }))).toEqual([
      { id: 'tag-street', active: true },
      { id: 'camera-Fujifilm X-T5', active: false },
      { id: 'lens-Fujifilm XF 23mm', active: true },
    ])
    expect(commands[1]?.keywords).toEqual(['camera', 'filter', 'Fujifilm X-T5', 'Fujifilm', 'X-T5'])
  })

  it('delegates filter changes without capturing stale selected state', () => {
    const onToggle = vi.fn()
    const [command] = createGalleryFilterCommands({
      tags: ['portrait'],
      cameras: [],
      lenses: [],
      selectedTags: [],
      selectedCameras: [],
      selectedLenses: [],
      labels: { tag: 'Tag', camera: 'Camera', lens: 'Lens' },
      lensIcon: null,
      onToggle,
    })

    command?.action()

    expect(onToggle).toHaveBeenCalledWith('selectedTags', 'portrait')
  })
})
