import { render, screen } from '@testing-library/react'
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

describe('MapInfoPanel', () => {
  it('renders the compact map summary', () => {
    render(<MapInfoPanel markersCount={2} />)

    expect(screen.getByRole('heading', { name: 'explory.explore.map' })).toBeDefined()
    expect(screen.getByText('explory.found.locations')).toBeDefined()
  })

  it('does not expose the removed range details or toggle', () => {
    render(<MapInfoPanel markersCount={2} />)

    expect(screen.queryByRole('button')).toBeNull()
    expect(screen.queryByText('explory.shooting.range')).toBeNull()
    expect(screen.queryByText('explory.info.latitude')).toBeNull()
    expect(screen.queryByText('explory.info.longitude')).toBeNull()
  })
})
