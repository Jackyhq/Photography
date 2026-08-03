import { describe, expect, it } from 'vitest'

import { makeMapMarkerContainerNonInteractive } from './map-marker-a11y'

describe('makeMapMarkerContainerNonInteractive', () => {
  it('keeps the MapLibre container non-interactive while preserving its child button', () => {
    const container = document.createElement('div')
    const markerButton = document.createElement('button')
    container.setAttribute('role', 'button')
    container.setAttribute('aria-label', 'Map marker')
    container.append(markerButton)

    makeMapMarkerContainerNonInteractive(container)

    expect(container.getAttribute('role')).toBe('group')
    expect(container.getAttribute('aria-label')).toBe('')
    expect(container.querySelector('button')).toBe(markerButton)
    expect(markerButton.parentElement?.getAttribute('role')).not.toBe('button')
  })
})
