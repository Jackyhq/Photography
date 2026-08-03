export type GalleryKeyboardGroup = 'social' | 'actions'

const ARROW_KEYS = new Set(['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'])
const FOCUSABLE_CONTROL_SELECTOR =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"]), input:not([disabled]), select:not([disabled]), textarea:not([disabled])'

const getGroupControls = (container: HTMLElement, group: GalleryKeyboardGroup) => {
  const groupElement = container.querySelector<HTMLElement>(`[data-gallery-keyboard-group="${group}"]`)
  if (!groupElement) return []

  return Array.from(groupElement.querySelectorAll<HTMLElement>(FOCUSABLE_CONTROL_SELECTOR)).filter(
    (control) => !control.hidden && control.getAttribute('aria-hidden') !== 'true',
  )
}

const focusControl = (control: HTMLElement | undefined) => {
  if (!control) return false

  control.focus({ preventScroll: true })
  control.scrollIntoView?.({ block: 'nearest', inline: 'nearest' })
  return true
}

const focusAlignedControl = (controls: HTMLElement[], currentIndex: number) => {
  if (controls.length === 0) return false
  return focusControl(controls[Math.min(Math.max(currentIndex, 0), controls.length - 1)])
}

const isEditableTarget = (target: Element | null) => {
  if (!(target instanceof HTMLElement)) return false
  if (target.isContentEditable) return true
  return target.matches('input, textarea, select')
}

export const handleGalleryArrowNavigation = ({
  event,
  container,
  focusFirstPhoto,
}: {
  event: KeyboardEvent
  container: HTMLElement
  focusFirstPhoto: () => boolean
}) => {
  if (
    event.defaultPrevented ||
    event.altKey ||
    event.ctrlKey ||
    event.metaKey ||
    !ARROW_KEYS.has(event.key) ||
    container.closest('[inert], [aria-hidden="true"]')
  ) {
    return false
  }

  const { activeElement } = document
  const eventTarget = event.target instanceof Element ? event.target : activeElement

  if (
    isEditableTarget(eventTarget) ||
    eventTarget?.closest('[role="dialog"], [role="menu"], [role="listbox"], [data-gallery-keyboard-ignore]')
  ) {
    return false
  }

  const socialControls = getGroupControls(container, 'social')
  const actionControls = getGroupControls(container, 'actions')
  const isDocumentFocused = activeElement === document.body || activeElement === document.documentElement

  if (!container.contains(activeElement)) {
    if (!isDocumentFocused) return false

    const moved = focusControl(socialControls[0] ?? actionControls[0]) || focusFirstPhoto()
    if (moved) event.preventDefault()
    return moved
  }

  if (!(activeElement instanceof HTMLElement)) return false

  const groupElement = activeElement.closest<HTMLElement>('[data-gallery-keyboard-group]')
  if (groupElement) {
    const group = groupElement.dataset.galleryKeyboardGroup as GalleryKeyboardGroup | undefined
    const controls = group === 'social' ? socialControls : group === 'actions' ? actionControls : []
    const currentIndex = controls.findIndex((control) => control === activeElement || control.contains(activeElement))
    if (currentIndex === -1) return false

    let moved = false
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      const offset = event.key === 'ArrowLeft' ? -1 : 1
      const nextIndex = (currentIndex + offset + controls.length) % controls.length
      moved = focusControl(controls[nextIndex])
    } else if (group === 'social' && event.key === 'ArrowDown') {
      moved = focusAlignedControl(actionControls, currentIndex)
    } else if (group === 'actions' && event.key === 'ArrowUp') {
      moved = focusAlignedControl(socialControls, currentIndex)
    } else if (group === 'actions' && event.key === 'ArrowDown') {
      moved = focusFirstPhoto()
    }

    if (moved) event.preventDefault()
    return moved
  }

  if (activeElement.closest('[data-photo-id]') && event.key === 'ArrowUp') {
    const moved = focusControl(actionControls[0] ?? socialControls[0])
    if (moved) event.preventDefault()
    return moved
  }

  return false
}
