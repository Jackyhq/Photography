import './styles/index.css'

import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'

import { i18nReady } from './i18n'
import { router } from './router'

if (import.meta.env.DEV) {
  const { start } = await import('react-scan')
  start()
}

await i18nReady

createRoot(document.querySelector('#root')!).render(<RouterProvider router={router} />)
