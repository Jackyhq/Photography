export function makeMapMarkerContainerNonInteractive(element: HTMLElement): void {
  element.setAttribute('role', 'group')
  element.setAttribute('aria-label', '')
}
