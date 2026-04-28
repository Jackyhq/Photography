import type { PropsWithChildren } from 'react'
import { createContext, useCallback, useEffect, useMemo, useRef, useState } from 'react'

interface AppUpdateContextValue {
  needRefresh: boolean
  updateApp: () => void
}

const UPDATE_CHECK_THROTTLE_MS = 60_000

const AppUpdateContext = createContext<AppUpdateContextValue>({
  needRefresh: false,
  updateApp: () => {},
})

export const AppUpdateProvider = ({ children }: PropsWithChildren) => {
  const registrationRef = useRef<ServiceWorkerRegistration | undefined>(undefined)
  const waitingWorkerRef = useRef<ServiceWorker | undefined>(undefined)
  const refreshingRef = useRef(false)
  const lastUpdateCheckRef = useRef(0)
  const [needRefresh, setNeedRefresh] = useState(false)

  const checkForUpdate = useCallback(async (force = false) => {
    if (import.meta.env.DEV) return

    const registration = registrationRef.current
    if (!registration) return

    const now = Date.now()
    if (!force && now - lastUpdateCheckRef.current < UPDATE_CHECK_THROTTLE_MS) return

    lastUpdateCheckRef.current = now

    try {
      await registration.update()
    } catch (error) {
      console.error('Service worker update check failed', error)
    }
  }, [])

  const markUpdateReady = useCallback((worker: ServiceWorker) => {
    waitingWorkerRef.current = worker
    setNeedRefresh(true)
  }, [])

  useEffect(() => {
    if (import.meta.env.DEV || !('serviceWorker' in navigator)) return

    let cancelled = false
    let registration: ServiceWorkerRegistration | undefined

    const watchInstallingWorker = (worker: ServiceWorker) => {
      worker.addEventListener('statechange', () => {
        if (worker.state === 'installed' && navigator.serviceWorker.controller) {
          markUpdateReady(worker)
        }
      })
    }

    const handleUpdateFound = () => {
      const worker = registration?.installing
      if (worker) {
        watchInstallingWorker(worker)
      }
    }

    const registerServiceWorker = async () => {
      try {
        registration = await navigator.serviceWorker.register('/sw.js', { scope: '/' })
        if (cancelled) return

        registrationRef.current = registration

        if (registration.waiting && navigator.serviceWorker.controller) {
          markUpdateReady(registration.waiting)
        }

        registration.addEventListener('updatefound', handleUpdateFound)
        void checkForUpdate(true)
      } catch (error) {
        console.error('SW registration failed', error)
      }
    }

    const handleLoad = () => {
      void registerServiceWorker()
    }

    const handleControllerChange = () => {
      if (refreshingRef.current) return
      refreshingRef.current = true
      window.location.reload()
    }

    if (document.readyState === 'complete') {
      void registerServiceWorker()
    } else {
      window.addEventListener('load', handleLoad, { once: true })
    }

    navigator.serviceWorker.addEventListener('controllerchange', handleControllerChange)

    return () => {
      cancelled = true
      window.removeEventListener('load', handleLoad)
      navigator.serviceWorker.removeEventListener('controllerchange', handleControllerChange)
      registration?.removeEventListener('updatefound', handleUpdateFound)
    }
  }, [checkForUpdate, markUpdateReady])

  useEffect(() => {
    if (import.meta.env.DEV) return

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        void checkForUpdate()
      }
    }

    const handleFocus = () => {
      void checkForUpdate()
    }

    const handleOnline = () => {
      void checkForUpdate(true)
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    window.addEventListener('focus', handleFocus)
    window.addEventListener('online', handleOnline)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('focus', handleFocus)
      window.removeEventListener('online', handleOnline)
    }
  }, [checkForUpdate])

  const updateApp = useCallback(() => {
    const worker = waitingWorkerRef.current ?? registrationRef.current?.waiting
    if (!worker) {
      void checkForUpdate(true)
      return
    }

    setNeedRefresh(false)
    worker.postMessage({ type: 'SKIP_WAITING' })
  }, [checkForUpdate])

  const value = useMemo(
    () => ({
      needRefresh,
      updateApp,
    }),
    [needRefresh, updateApp],
  )

  return <AppUpdateContext value={value}>{children}</AppUpdateContext>
}

export const useAppUpdate = () => use(AppUpdateContext)
