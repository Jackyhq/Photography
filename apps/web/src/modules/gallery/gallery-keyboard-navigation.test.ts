import { afterEach, describe, expect, it, vi } from 'vitest'

import { handleGalleryArrowNavigation } from './gallery-keyboard-navigation'

const createGallery = () => {
  const container = document.createElement('div')
  container.innerHTML = `
    <div data-gallery-keyboard-group="social">
      <a href="#home">Home</a>
      <a href="#instagram">Instagram</a>
      <a href="#github">GitHub</a>
    </div>
    <div data-gallery-keyboard-group="actions">
      <button type="button">Search</button>
      <button type="button">Map</button>
      <button type="button">View</button>
      <button type="button">Language</button>
    </div>
    <button type="button" data-photo-id="photo-1">Photo</button>
  `
  document.body.append(container)

  const photo = container.querySelector<HTMLElement>('[data-photo-id]')!
  const focusFirstPhoto = vi.fn(() => {
    photo.focus()
    return true
  })

  const press = (key: string, target: Element = document.activeElement ?? document.body) => {
    const event = new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true })
    target.dispatchEvent(event)
    handleGalleryArrowNavigation({ event, container, focusFirstPhoto })
    return event
  }

  return { container, focusFirstPhoto, photo, press }
}

afterEach(() => {
  document.body.replaceChildren()
})

describe('handleGalleryArrowNavigation', () => {
  it('enters keyboard navigation when an arrow key is pressed without a focused control', () => {
    const { container, press } = createGallery()

    const event = press('ArrowDown', document.body)

    expect(document.activeElement).toBe(container.querySelector('a'))
    expect(event.defaultPrevented).toBe(true)
  })

  it('moves horizontally within social and action groups', () => {
    const { container, press } = createGallery()
    const socialLinks = container.querySelectorAll<HTMLElement>('[data-gallery-keyboard-group="social"] a')
    const actionButtons = container.querySelectorAll<HTMLElement>('[data-gallery-keyboard-group="actions"] button')

    socialLinks[1].focus()
    press('ArrowRight', socialLinks[1])
    expect(document.activeElement).toBe(socialLinks[2])

    actionButtons[0].focus()
    press('ArrowLeft', actionButtons[0])
    expect(document.activeElement).toBe(actionButtons[3])
  })

  it('moves vertically between social links, actions, and photos', () => {
    const { container, focusFirstPhoto, photo, press } = createGallery()
    const socialLinks = container.querySelectorAll<HTMLElement>('[data-gallery-keyboard-group="social"] a')
    const actionButtons = container.querySelectorAll<HTMLElement>('[data-gallery-keyboard-group="actions"] button')

    socialLinks[1].focus()
    press('ArrowDown', socialLinks[1])
    expect(document.activeElement).toBe(actionButtons[1])

    press('ArrowUp', actionButtons[1])
    expect(document.activeElement).toBe(socialLinks[1])

    actionButtons[1].focus()
    press('ArrowDown', actionButtons[1])
    expect(focusFirstPhoto).toHaveBeenCalledOnce()
    expect(document.activeElement).toBe(photo)

    press('ArrowUp', photo)
    expect(document.activeElement).toBe(actionButtons[0])
  })

  it('does not take over editable fields or content hidden behind a modal', () => {
    const { container, focusFirstPhoto, press } = createGallery()
    const input = document.createElement('input')
    container.prepend(input)
    input.focus()

    expect(press('ArrowRight', input).defaultPrevented).toBe(false)
    expect(document.activeElement).toBe(input)

    container.setAttribute('inert', '')
    document.body.focus()
    expect(press('ArrowDown', document.body).defaultPrevented).toBe(false)
    expect(focusFirstPhoto).not.toHaveBeenCalled()
  })
})
