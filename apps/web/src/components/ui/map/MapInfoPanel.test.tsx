import { fireEvent, render, screen } from '@testing-library/react'
import * as React from 'react'
import { describe, expect, it, vi } from 'vitest'

import { MapInfoPanel } from './MapInfoPanel'

vi.mock('react-i18next', () => ({
  ['useTranslation']: () => ({ t: (key: string) => key }),
}))

vi.mock('motion/react', () => ({
  m: new Proxy(
    {},
    {
      get: (_target, tag: string) => tag,
    },
  ),
}))

const bounds = {
  minLat: 22.25,
  maxLat: 31.23,
  minLng: 114.17,
  maxLng: 121.47,
}

describe('MapInfoPanel', () => {
  it('keeps collapsed details out of the accessibility tree', () => {
    render(<MapInfoPanel markersCount={2} bounds={bounds} />)

    const toggle = screen.getByRole('button', { name: 'explory.info.expand' })
    const details = document.querySelector<HTMLElement>(`[id="${toggle.getAttribute('aria-controls')}"]`)
    if (!details) throw new Error('Map details region was not rendered')

    expect(toggle.getAttribute('aria-expanded')).toBe('false')
    expect(details.getAttribute('aria-hidden')).toBe('true')
    expect(details.hasAttribute('inert')).toBe(true)

    fireEvent.click(toggle)

    expect(screen.getByRole('button', { name: 'explory.info.collapse' }).getAttribute('aria-expanded')).toBe('true')
    expect(details.getAttribute('aria-hidden')).toBe('false')
    expect(details.hasAttribute('inert')).toBe(false)
  })

  it('does not present the inaccurate rectangular coverage metric', () => {
    render(<MapInfoPanel markersCount={2} bounds={bounds} />)

    expect(screen.queryByText(/Coverage|km²/i)).toBeNull()
  })
})
