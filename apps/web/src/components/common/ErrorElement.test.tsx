import { render, screen } from '@testing-library/react'
import * as React from 'react'
import { describe, expect, it, vi } from 'vitest'

import { ErrorElement } from './ErrorElement'

const mocks = vi.hoisted(() => ({
  error: new Error('Route failed'),
  claimDynamicImportReload: vi.fn(() => false),
}))

vi.mock('@pkg', () => ({ repository: { url: 'https://github.com/example/gallery' } }))
vi.mock('react-router', () => ({
  isRouteErrorResponse: () => false,
  ['useRouteError']: () => mocks.error,
}))
vi.mock('~/lib/dev', () => ({ attachOpenInEditor: (stack: string) => stack }))
vi.mock('~/lib/dynamic-import-recovery', () => ({
  claimDynamicImportReload: mocks.claimDynamicImportReload,
}))
vi.mock('./FallbackButton', () => ({
  FallbackButton: (props: React.ComponentPropsWithoutRef<'button'>) => <button type="button" {...props} />,
}))

describe('ErrorElement', () => {
  it('renders a route error and only reloads when recovery claims the attempt', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {})
    render(<ErrorElement />)

    expect(screen.getByRole('heading', { name: 'Something went wrong' })).toBeTruthy()
    expect(screen.getByText('Route failed')).toBeTruthy()
    expect(mocks.claimDynamicImportReload).toHaveBeenCalledWith(
      expect.objectContaining({ message: 'Route failed', getStorage: expect.any(Function) }),
    )
    expect(screen.getByRole('link', { name: 'Report on GitHub' }).getAttribute('href')).toContain(
      'https://github.com/example/gallery/issues/new',
    )
  })
})
