import { act, cleanup, fireEvent, render, screen } from '@testing-library/react'
import type { ComponentProps, ReactNode } from 'react'
import * as React from 'react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

const state = vi.hoisted(() => ({ mobile: true, setGallerySetting: vi.fn() }))
vi.mock('~/hooks/useMobile', () => ({ useMobile: vi.fn(() => state.mobile) }))
vi.mock('jotai', () => ({ atom: vi.fn(), useSetAtom: vi.fn(() => state.setGallerySetting) }))
vi.mock('@afilmory/ui/button', () => ({
  Button: ({
    variant: _variant,
    size: _size,
    ...props
  }: ComponentProps<'button'> & { variant?: string; size?: string }) => <button type="button" {...props} />,
}))

const desktopImported = vi.fn()
const mobileImported = vi.fn()
let releaseDesktop: () => void
let desktopReady: Promise<void>

const setMobile = (mobile: boolean) => {
  state.mobile = mobile
  vi.stubGlobal('innerWidth', mobile ? 390 : 1280)
}

beforeEach(() => {
  vi.resetModules()
  vi.stubGlobal('React', React)
  setMobile(true)
  desktopReady = new Promise<void>((resolve) => {
    releaseDesktop = resolve
  })
  vi.doMock('./DesktopActionButton', async () => {
    desktopImported()
    await desktopReady
    return vi.importActual('./DesktopActionButton')
  })
  vi.doMock('./MobileActionDrawer', () => {
    mobileImported()
    return {
      MobileActionDrawer: ({ open, children }: { open: boolean; children: ReactNode }) =>
        open ? <div role="dialog">{children}</div> : null,
    }
  })
})

afterEach(() => {
  cleanup()
  releaseDesktop()
  vi.doUnmock('./DesktopActionButton')
  vi.doUnmock('./MobileActionDrawer')
  vi.clearAllMocks()
  vi.unstubAllGlobals()
})

const finishDesktopImport = async () => {
  await act(async () => {
    releaseDesktop()
    await import('./DesktopActionButton')
  })
}

const props = { icon: 'i-mingcute-layout-grid-line', title: 'View' }
const content = (
  <button type="button" role="menuitem">
    Settings
  </button>
)

describe('responsive action dependencies and interaction', () => {
  it('does not import desktop controls on mobile, including when opening its drawer', async () => {
    const { ResponsiveActionButton } = await import('./ActionButton')
    render(<ResponsiveActionButton {...props}>{content}</ResponsiveActionButton>)
    expect(desktopImported).not.toHaveBeenCalled()
    expect(mobileImported).not.toHaveBeenCalled()

    fireEvent.click(screen.getByRole('button', { name: 'View' }))
    expect(await screen.findByRole('dialog')).toHaveTextContent('Settings')
    expect(mobileImported).toHaveBeenCalledOnce()
    expect(desktopImported).not.toHaveBeenCalled()
  })

  it('retains the first click while the desktop module is still loading', async () => {
    setMobile(false)
    const { ResponsiveActionButton } = await import('./ActionButton')
    const onOpenChange = vi.fn()
    render(
      <ResponsiveActionButton {...props} onGlobalOpenChange={onOpenChange}>
        {content}
      </ResponsiveActionButton>,
    )
    fireEvent.click(screen.getByRole('button', { name: 'View' }))
    expect(screen.getByRole('button', { name: 'View' })).toHaveAttribute('aria-expanded', 'true')

    await finishDesktopImport()

    expect(await screen.findByRole('menu')).toHaveTextContent('Settings')
    expect(onOpenChange).toHaveBeenCalledExactlyOnceWith(true, state.setGallerySetting)
    expect(mobileImported).not.toHaveBeenCalled()
  })

  it.each(['Enter', ' ', 'ArrowDown'])('preserves %s activation while the desktop module loads', async (key) => {
    setMobile(false)
    const { ResponsiveActionButton } = await import('./ActionButton')
    render(<ResponsiveActionButton {...props}>{content}</ResponsiveActionButton>)
    const trigger = screen.getByRole('button', { name: 'View' })
    act(() => trigger.focus())
    expect(fireEvent.keyDown(trigger, { key })).toBe(false)

    await finishDesktopImport()

    expect(await screen.findByRole('menu')).toBeInTheDocument()
  })

  it('cancels a pending open when Escape is pressed before loading finishes', async () => {
    setMobile(false)
    const { ResponsiveActionButton } = await import('./ActionButton')
    render(<ResponsiveActionButton {...props}>{content}</ResponsiveActionButton>)
    const trigger = screen.getByRole('button', { name: 'View' })
    act(() => trigger.focus())
    fireEvent.keyDown(trigger, { key: 'ArrowDown' })
    fireEvent.keyDown(trigger, { key: 'Escape' })

    await finishDesktopImport()

    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'View' })).toHaveFocus()
  })

  it('preserves a focused trigger when replacing the loading button', async () => {
    setMobile(false)
    const { ResponsiveActionButton } = await import('./ActionButton')
    render(<ResponsiveActionButton {...props}>{content}</ResponsiveActionButton>)
    const trigger = screen.getByRole('button', { name: 'View' })
    act(() => trigger.focus())

    await finishDesktopImport()

    expect(screen.getByRole('button', { name: 'View' })).not.toBe(trigger)
    expect(screen.getByRole('button', { name: 'View' })).toHaveFocus()
    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
  })

  it('does not open a menu or steal focus after the user leaves the loading button', async () => {
    setMobile(false)
    const { ResponsiveActionButton } = await import('./ActionButton')
    render(
      <>
        <ResponsiveActionButton {...props}>{content}</ResponsiveActionButton>
        <button type="button">Next control</button>
      </>,
    )
    const trigger = screen.getByRole('button', { name: 'View' })
    act(() => trigger.focus())
    fireEvent.keyDown(trigger, { key: 'ArrowDown' })
    act(() => screen.getByRole('button', { name: 'Next control' }).focus())

    await finishDesktopImport()

    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Next control' })).toHaveFocus()
  })

  it('resets device-specific open state when crossing the breakpoint during a pending load', async () => {
    const { ResponsiveActionButton } = await import('./ActionButton')
    const { rerender } = render(<ResponsiveActionButton {...props}>{content}</ResponsiveActionButton>)
    fireEvent.click(screen.getByRole('button', { name: 'View' }))
    expect(await screen.findByRole('dialog')).toBeInTheDocument()

    setMobile(false)
    rerender(<ResponsiveActionButton {...props}>{content}</ResponsiveActionButton>)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'View' }))

    setMobile(true)
    rerender(<ResponsiveActionButton {...props}>{content}</ResponsiveActionButton>)
    await finishDesktopImport()
    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()

    setMobile(false)
    rerender(<ResponsiveActionButton {...props}>{content}</ResponsiveActionButton>)
    expect(screen.getByRole('button', { name: 'View' })).toHaveAttribute('aria-expanded', 'false')
  })
})
