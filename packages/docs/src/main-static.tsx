import './styles/index.css'

import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'

import App from './App'
import { Providers } from './providers'

export function render(url: string) {
  const html = renderToString(
    <StrictMode>
      <Providers>
        <App url={url} />
      </Providers>
    </StrictMode>,
  )
  return { html }
}
