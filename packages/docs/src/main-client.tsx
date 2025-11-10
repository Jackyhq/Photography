import './styles/index.css'

import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'

import App from './App.tsx'
import { Providers } from './providers.tsx'

const url_path = window.location.pathname

if (import.meta.env.DEV) {
  createRoot(document.querySelector('#root')!).render(
    <StrictMode>
      <Providers>
        <App url={url_path} />
      </Providers>
    </StrictMode>,
  )
} else {
  hydrateRoot(
    document.querySelector('#root')!,
    <StrictMode>
      <Providers>
        <App url={url_path} />
      </Providers>
    </StrictMode>,
  )
}
