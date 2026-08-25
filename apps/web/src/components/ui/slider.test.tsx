import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import * as React from 'react'
import { useState } from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { Slider } from './slider'

const { translationMock } = vi.hoisted(() => ({
  translationMock: () => ({
    t: (key: string, options?: { count?: number }) =>
      key === 'slider.columns' ? `${options?.count ?? ''} columns` : 'Auto',
  }),
}))

vi.mock('react-i18next', () => ({
  useTranslation: translationMock,
}))

const SliderHarness = ({
  initialValue,
  onValueCommit,
}: {
  initialValue: number | 'auto'
  onValueCommit?: (value: number | 'auto') => void
}) => {
  const [value, setValue] = useState<number | 'auto'>(initialValue)

  return (
    <>
      <Slider
        value={value}
        onChange={setValue}
        onValueCommit={onValueCommit}
        min={3}
        max={8}
        ariaLabel="Gallery columns"
      />
      <output data-testid="slider-value">{value}</output>
    </>
  )
}

describe('Slider', () => {
  afterEach(() => {
    cleanup()
    vi.restoreAllMocks()
  })

  it('supports returning to the initial value during one pointer drag', () => {
    const onValueCommit = vi.fn()
    render(<SliderHarness initialValue={5} onValueCommit={onValueCommit} />)

    const slider = screen.getByRole('slider', { name: 'Gallery columns' })
    vi.spyOn(slider, 'getBoundingClientRect').mockReturnValue({
      bottom: 24,
      height: 24,
      left: 0,
      right: 100,
      top: 0,
      width: 100,
      x: 0,
      y: 0,
      toJSON: () => ({}),
    })

    fireEvent.pointerDown(slider, { clientX: 66, pointerId: 1 })
    expect(screen.getByTestId('slider-value').textContent).toBe('6')

    fireEvent.pointerMove(slider, { clientX: 49, pointerId: 1 })
    expect(screen.getByTestId('slider-value').textContent).toBe('5')

    fireEvent.pointerUp(slider, { clientX: 49, pointerId: 1 })
    expect(onValueCommit).toHaveBeenLastCalledWith(5)
  })

  it('exposes slider semantics and supports keyboard changes', () => {
    const onValueCommit = vi.fn()
    render(<SliderHarness initialValue="auto" onValueCommit={onValueCommit} />)

    const slider = screen.getByRole('slider', { name: 'Gallery columns' })
    expect(slider.getAttribute('aria-valuenow')).toBe('2')
    expect(slider.getAttribute('aria-valuetext')).toBe('Auto')

    fireEvent.keyDown(slider, { key: 'ArrowRight' })
    expect(screen.getByTestId('slider-value').textContent).toBe('3')
    expect(onValueCommit).toHaveBeenLastCalledWith(3)

    fireEvent.keyDown(slider, { key: 'ArrowLeft' })
    expect(screen.getByTestId('slider-value').textContent).toBe('auto')
    expect(slider.getAttribute('aria-valuetext')).toBe('Auto')

    fireEvent.keyDown(slider, { key: 'End' })
    expect(screen.getByTestId('slider-value').textContent).toBe('8')

    fireEvent.keyDown(slider, { key: 'Home' })
    expect(screen.getByTestId('slider-value').textContent).toBe('auto')
  })

  it('commits the latest value when the pointer interaction is cancelled', () => {
    const onValueCommit = vi.fn()
    render(<SliderHarness initialValue={5} onValueCommit={onValueCommit} />)

    const slider = screen.getByRole('slider', { name: 'Gallery columns' })
    vi.spyOn(slider, 'getBoundingClientRect').mockReturnValue({
      bottom: 24,
      height: 24,
      left: 0,
      right: 100,
      top: 0,
      width: 100,
      x: 0,
      y: 0,
      toJSON: () => ({}),
    })

    fireEvent.pointerDown(slider, { clientX: 66, pointerId: 1 })
    fireEvent.pointerCancel(slider, { pointerId: 1 })

    expect(onValueCommit).toHaveBeenLastCalledWith(6)
  })

  it('normalizes an out-of-range controlled value when its bounds shrink', () => {
    const onChange = vi.fn()
    const onValueCommit = vi.fn()
    render(
      <Slider
        value={8}
        onChange={onChange}
        onValueCommit={onValueCommit}
        min={3}
        max={5}
        ariaLabel="Gallery columns"
      />,
    )

    const slider = screen.getByRole('slider', { name: 'Gallery columns' })
    expect(slider.getAttribute('aria-valuenow')).toBe('5')
    expect(slider.getAttribute('aria-valuetext')).toBe('5')
    expect(screen.getByText('5 columns')).toBeTruthy()

    fireEvent.keyDown(slider, { key: 'ArrowLeft' })
    expect(onChange).toHaveBeenLastCalledWith(4)
    expect(onValueCommit).toHaveBeenLastCalledWith(4)
  })
})
