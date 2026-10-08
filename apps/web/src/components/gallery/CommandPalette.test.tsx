import { cleanup, createEvent, fireEvent, render, screen } from '@testing-library/react'
import { createStore, Provider } from 'jotai'
import * as React from 'react'
import { MemoryRouter } from 'react-router'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { gallerySettingAtom } from '~/atoms/app'

import { CommandPalette } from './CommandPalette'

vi.mock('@afilmory/data', () => ({
  photoLoader: {
    getAllTags: () => ['street', 'portrait'],
    getAllCameras: () => [],
    getAllLenses: () => [],
    loadPhotoText: () => Promise.resolve(),
  },
}))

vi.mock('react-i18next', () => ({
  ['useTranslation']: () => ({ t: (key: string) => key, i18n: { language: 'en' } }),
}))

vi.mock('~/hooks/usePhotoTextUpdates', () => ({ ['usePhotoTextUpdates']: () => 0 }))
vi.mock('~/hooks/usePhotoViewer', () => ({ ['useOpenPhotoViewer']: () => ({ openViewerByPhotoId: vi.fn() }) }))

const originalScrollIntoView = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'scrollIntoView')

beforeEach(() => {
  Object.defineProperty(HTMLElement.prototype, 'scrollIntoView', { configurable: true, value: vi.fn() })
})

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
  if (originalScrollIntoView) Object.defineProperty(HTMLElement.prototype, 'scrollIntoView', originalScrollIntoView)
  else Reflect.deleteProperty(HTMLElement.prototype, 'scrollIntoView')
})

function renderPalette() {
  const store = createStore()
  const onClose = vi.fn()

  render(
    <Provider store={store}>
      <MemoryRouter>
        <CommandPalette isOpen onClose={onClose} />
      </MemoryRouter>
    </Provider>,
  )

  return { input: screen.getByRole('textbox'), onClose, store }
}

describe('CommandPalette IME keyboard handling', () => {
  it.each([
    { name: 'composition events', compositionEvents: true, keyboardInit: {} },
    { name: 'native composition flag', compositionEvents: false, keyboardInit: { isComposing: true } },
    { name: 'Safari key code', compositionEvents: false, keyboardInit: { keyCode: 229 } },
  ])('leaves Enter and arrows to the IME during $name', ({ compositionEvents, keyboardInit }) => {
    const { input, store } = renderPalette()
    const [firstOption, secondOption] = screen.getAllByRole('option')

    if (compositionEvents) fireEvent.compositionStart(input)

    for (const key of ['ArrowDown', 'Enter']) {
      const event = createEvent.keyDown(input, { key, ...keyboardInit })
      fireEvent(input, event)

      expect(event.defaultPrevented).toBe(false)
      expect(input).toHaveAttribute('aria-activedescendant', firstOption.id)
      expect(store.get(gallerySettingAtom).selectedTags).toEqual([])
    }

    fireEvent.mouseEnter(secondOption)
    const arrowUp = createEvent.keyDown(input, { key: 'ArrowUp', ...keyboardInit })
    fireEvent(input, arrowUp)
    expect(arrowUp.defaultPrevented).toBe(false)
    expect(input).toHaveAttribute('aria-activedescendant', secondOption.id)

    if (compositionEvents) fireEvent.compositionEnd(input)

    fireEvent.keyDown(input, { key: 'ArrowUp' })
    expect(input).toHaveAttribute('aria-activedescendant', firstOption.id)
    fireEvent.keyDown(input, { key: 'ArrowDown' })
    expect(input).toHaveAttribute('aria-activedescendant', secondOption.id)
    fireEvent.keyDown(input, { key: 'Enter' })
    expect(store.get(gallerySettingAtom).selectedTags).toEqual(['portrait'])
  })

  it('resumes command selection after an unfinished composition loses focus', () => {
    const { input, store } = renderPalette()

    fireEvent.compositionStart(input)
    fireEvent.blur(input)
    fireEvent.focus(input)
    fireEvent.keyDown(input, { key: 'Enter' })

    expect(store.get(gallerySettingAtom).selectedTags).toEqual(['street'])
  })

  it('preserves ordinary Escape dismissal without blurring the search input', () => {
    const { input, onClose } = renderPalette()

    expect(input).toHaveFocus()
    fireEvent.keyDown(input, { key: 'Escape' })

    expect(onClose).toHaveBeenCalledOnce()
    expect(input).toHaveFocus()
  })
})
