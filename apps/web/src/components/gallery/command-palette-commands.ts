import type { CameraInfo, LensInfo } from '@afilmory/builder'
import type { ReactNode } from 'react'

export type CommandType = 'search' | 'filter' | 'action' | 'photo'

export interface Command {
  id: string
  type: CommandType
  title: string
  subtitle?: string
  icon: ReactNode
  action: () => void
  keywords?: string[]
  badge?: string | number
  active?: boolean
}

export type GalleryFilterField = 'selectedTags' | 'selectedCameras' | 'selectedLenses'

interface ToggleFilterSource<T> {
  field: GalleryFilterField
  idPrefix: string
  items: readonly T[]
  selectedValues: readonly string[]
  subtitle: string
  icon: ReactNode
  getValue: (item: T) => string
  getKeywords: (item: T) => string[]
}

interface GalleryFilterCommandOptions {
  tags: readonly string[]
  cameras: readonly CameraInfo[]
  lenses: readonly LensInfo[]
  selectedTags: readonly string[]
  selectedCameras: readonly string[]
  selectedLenses: readonly string[]
  labels: {
    tag: string
    camera: string
    lens: string
  }
  lensIcon: ReactNode
  onToggle: (field: GalleryFilterField, value: string) => void
}

function createToggleFilterCommands<T>(
  source: ToggleFilterSource<T>,
  onToggle: GalleryFilterCommandOptions['onToggle'],
) {
  return source.items.map((item): Command => {
    const value = source.getValue(item)

    return {
      id: `${source.idPrefix}-${value}`,
      type: 'filter',
      title: value,
      subtitle: source.subtitle,
      icon: source.icon,
      active: source.selectedValues.includes(value),
      action: () => onToggle(source.field, value),
      keywords: source.getKeywords(item),
    }
  })
}

export function createGalleryFilterCommands({
  tags,
  cameras,
  lenses,
  selectedTags,
  selectedCameras,
  selectedLenses,
  labels,
  lensIcon,
  onToggle,
}: GalleryFilterCommandOptions): Command[] {
  return [
    ...createToggleFilterCommands(
      {
        field: 'selectedTags',
        idPrefix: 'tag',
        items: tags,
        selectedValues: selectedTags,
        subtitle: labels.tag,
        icon: 'i-mingcute-tag-line',
        getValue: (tag) => tag,
        getKeywords: (tag) => ['tag', 'filter', tag],
      },
      onToggle,
    ),
    ...createToggleFilterCommands(
      {
        field: 'selectedCameras',
        idPrefix: 'camera',
        items: cameras,
        selectedValues: selectedCameras,
        subtitle: labels.camera,
        icon: 'i-mingcute-camera-line',
        getValue: (camera) => camera.displayName,
        getKeywords: (camera) => ['camera', 'filter', camera.displayName, camera.make, camera.model],
      },
      onToggle,
    ),
    ...createToggleFilterCommands(
      {
        field: 'selectedLenses',
        idPrefix: 'lens',
        items: lenses,
        selectedValues: selectedLenses,
        subtitle: labels.lens,
        icon: lensIcon,
        getValue: (lens) => lens.displayName,
        getKeywords: (lens) => ['lens', 'filter', lens.displayName],
      },
      onToggle,
    ),
  ]
}
