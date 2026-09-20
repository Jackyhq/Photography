const ANALYTICS_SCRIPT_ID = 'google-analytics-script'
const ANALYTICS_IDLE_TIMEOUT_MS = 3000

/** Call after the app commits so analytics cannot compete with its initial render. */
export function scheduleDeferredAnalytics(): () => void {
  const measurementId = document.querySelector<HTMLElement>('#analytics-bootstrap')?.dataset.measurementId
  if (!measurementId || document.querySelector(`#${ANALYTICS_SCRIPT_ID}`)) return () => {}

  let cancelled = false
  let scheduled = false
  let idleCallbackId: number | undefined
  let timeoutId: number | undefined

  const loadAnalytics = () => {
    if (cancelled || document.querySelector(`#${ANALYTICS_SCRIPT_ID}`)) return

    const script = document.createElement('script')
    script.id = ANALYTICS_SCRIPT_ID
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`
    document.head.append(script)
  }

  const scheduleWhenIdle = () => {
    if (cancelled || scheduled) return
    scheduled = true

    if (typeof window.requestIdleCallback === 'function') {
      idleCallbackId = window.requestIdleCallback(loadAnalytics, { timeout: ANALYTICS_IDLE_TIMEOUT_MS })
    } else {
      timeoutId = window.setTimeout(loadAnalytics, ANALYTICS_IDLE_TIMEOUT_MS)
    }
  }

  if (document.readyState === 'complete') {
    scheduleWhenIdle()
  } else {
    window.addEventListener('load', scheduleWhenIdle, { once: true })
  }

  return () => {
    cancelled = true
    window.removeEventListener('load', scheduleWhenIdle)
    if (idleCallbackId !== undefined) window.cancelIdleCallback?.(idleCallbackId)
    if (timeoutId !== undefined) window.clearTimeout(timeoutId)
  }
}
