import { lazy, Suspense, useEffect, useState } from 'react'
import { Outlet } from 'react-router'

import { useCommandPaletteShortcut } from './hooks/useCommandPaletteShortcut'
import { useRoutePageMeta } from './hooks/useRoutePageMeta'
import { RootProviders } from './providers/root-providers'

const CommandPalette = lazy(() =>
  import('./components/gallery/CommandPalette').then((module) => ({ default: module.CommandPalette })),
)

function App() {
  return (
    <RootProviders>
      <RoutePageMeta />
      <div className="overflow-hidden lg:h-svh">
        <Outlet />
        <CommandPaletteContainer />
      </div>
    </RootProviders>
  )
}

const RoutePageMeta = () => {
  useRoutePageMeta()
  return null
}

const CommandPaletteContainer = () => {
  const { isOpen, setIsOpen } = useCommandPaletteShortcut()
  const [hasOpened, setHasOpened] = useState(false)

  useEffect(() => {
    if (isOpen) setHasOpened(true)
  }, [isOpen])

  if (!isOpen && !hasOpened) return null

  return (
    <Suspense fallback={null}>
      <CommandPalette isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </Suspense>
  )
}
export default App
