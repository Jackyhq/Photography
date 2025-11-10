import './globals.css'

import { RootProviders } from '~/providers'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <RootProviders>{children}</RootProviders>
      </body>
    </html>
  )
}
