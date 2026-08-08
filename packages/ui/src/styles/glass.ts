import type { CSSProperties } from 'react'

export const glassSurfaceBackgroundImage =
  'linear-gradient(to bottom right, color-mix(in srgb, var(--color-background) 98%, transparent), color-mix(in srgb, var(--color-background) 95%, transparent))'

export const glassSurfaceBoxShadow =
  '0 8px 32px color-mix(in srgb, var(--color-accent) 8%, transparent), 0 4px 16px color-mix(in srgb, var(--color-accent) 6%, transparent), 0 2px 8px rgba(0, 0, 0, 0.1)'

export const glassInnerGlowBackground =
  'linear-gradient(to bottom right, color-mix(in srgb, var(--color-accent) 5%, transparent), transparent, color-mix(in srgb, var(--color-accent) 5%, transparent))'

export const glassHighlightBackground =
  'linear-gradient(to right, color-mix(in srgb, var(--color-accent) 8%, transparent), color-mix(in srgb, var(--color-accent) 5%, transparent))'

export const glassSurfaceStyle = {
  backgroundImage: glassSurfaceBackgroundImage,
  boxShadow: glassSurfaceBoxShadow,
} satisfies CSSProperties

export const glassMenuItemStyle = {
  '--highlight-bg': glassHighlightBackground,
} as CSSProperties
