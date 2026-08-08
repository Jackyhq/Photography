import { lazy, Suspense, useEffect, useState } from 'react'

const TOASTER_IDLE_TIMEOUT_MS = 2_000

interface OptionalIdleCallbacks {
  requestIdleCallback?: (callback: IdleRequestCallback, options?: IdleRequestOptions) => number
  cancelIdleCallback?: (handle: number) => void
}

const LazyToaster = lazy(async () => {
  const { Toaster } = await import('@afilmory/ui/sonner')
  return { default: Toaster }
})

export const DeferredToaster = () => {
  const [shouldRender, setShouldRender] = useState(false)

  useEffect(() => {
    const renderToaster = () => setShouldRender(true)

    window.addEventListener('pointerdown', renderToaster, { once: true, passive: true })
    window.addEventListener('keydown', renderToaster, { once: true })

    const idleCallbacks = window as unknown as OptionalIdleCallbacks
    let cancelScheduledRender: () => void
    if (idleCallbacks.requestIdleCallback && idleCallbacks.cancelIdleCallback) {
      const idleCallbackId = idleCallbacks.requestIdleCallback(renderToaster, { timeout: TOASTER_IDLE_TIMEOUT_MS })
      cancelScheduledRender = () => idleCallbacks.cancelIdleCallback?.(idleCallbackId)
    } else {
      const timeoutId = globalThis.setTimeout(renderToaster, TOASTER_IDLE_TIMEOUT_MS)
      cancelScheduledRender = () => globalThis.clearTimeout(timeoutId)
    }

    return () => {
      cancelScheduledRender()
      window.removeEventListener('pointerdown', renderToaster)
      window.removeEventListener('keydown', renderToaster)
    }
  }, [])

  if (!shouldRender) return null

  return (
    <Suspense fallback={null}>
      <LazyToaster />
    </Suspense>
  )
}
