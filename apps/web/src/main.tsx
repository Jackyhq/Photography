import './styles/index.css'

import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'

import { router } from './router'

if (import.meta.env.DEV) {
  const { start } = await import('react-scan')
  start()
}

createRoot(document.querySelector('#root')!).render(<RouterProvider router={router} />)

// Service Worker update handling: if a new SW is installed, tell it to skipWaiting
// and reload the page when it takes control. Keep this behavior only in production.
if (typeof window !== 'undefined' && 'serviceWorker' in navigator && !import.meta.env.DEV) {
  window.addEventListener('load', () => {
    void (async () => {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js', { scope: '/' })

        const postSkip = (worker: ServiceWorker | null) => {
          try {
            worker?.postMessage?.({ type: 'SKIP_WAITING' })
          } catch {
            // best-effort
          }
        }

        if (registration.waiting) {
          postSkip(registration.waiting)
        }

        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing
          if (!newWorker) return
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              postSkip(newWorker)
            }
          })
        })

        let refreshing = false
        navigator.serviceWorker.addEventListener('controllerchange', () => {
          if (refreshing) return
          refreshing = true
          window.location.reload()
        })
      } catch (err) {
        // swallow errors - registration is best-effort

        console.error('SW registration failed', err)
      }
    })()
  })
}
