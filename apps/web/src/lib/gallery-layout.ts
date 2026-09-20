// Keep the initial HTML image hints and the default masonry layout in agreement.
export const GALLERY_MOBILE_BREAKPOINT = 1024
export const GALLERY_COLUMN_GUTTER = 4
export const GALLERY_MOBILE_PADDING = 8
export const GALLERY_MAX_COLUMNS = 8
export const GALLERY_DEFAULT_COLUMN_WIDTH = { mobile: 150, desktop: 250 } as const

export function getDefaultGalleryImageSizes(): string {
  const rules: string[] = []

  for (const mobile of [false, true]) {
    const padding = mobile ? GALLERY_MOBILE_PADDING : 0
    const minimumWidth = mobile ? GALLERY_DEFAULT_COLUMN_WIDTH.mobile : GALLERY_DEFAULT_COLUMN_WIDTH.desktop

    for (let columns = GALLERY_MAX_COLUMNS; columns >= 1; columns--) {
      const minimumViewport = columns * (minimumWidth + GALLERY_COLUMN_GUTTER) - GALLERY_COLUMN_GUTTER + padding
      const nextViewport = minimumViewport + minimumWidth + GALLERY_COLUMN_GUTTER

      if (mobile && minimumViewport >= GALLERY_MOBILE_BREAKPOINT) continue
      if (!mobile && nextViewport <= GALLERY_MOBILE_BREAKPOINT) continue

      const occupiedWidth = padding + (columns - 1) * GALLERY_COLUMN_GUTTER
      const size = `calc((100vw - ${occupiedWidth}px) / ${columns})`
      if (mobile && columns === 1) {
        rules.push(size)
      } else {
        const breakpoint = mobile ? minimumViewport : Math.max(minimumViewport, GALLERY_MOBILE_BREAKPOINT)
        rules.push(`(min-width: ${breakpoint}px) ${size}`)
      }
    }
  }

  return rules.join(', ')
}
