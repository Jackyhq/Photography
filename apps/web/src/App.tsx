import { lazy, Suspense, useEffect, useState } from 'react'
import { Outlet } from 'react-router'

import { NotFound } from './components/common/NotFound'
import { useCommandPaletteShortcut } from './hooks/useCommandPaletteShortcut'
import { useRoutePageMeta } from './hooks/useRoutePageMeta'
import { RootProviders } from './providers/root-providers'

const CommandPalette = lazy(() =>
  import('./components/gallery/CommandPalette').then((module) => ({ default: module.CommandPalette })),
)

function App() {
  return (
    <RootProviders>
      <RouteContent />
    </RootProviders>
  )
}

const RouteContent = () => {
  const isNotFound = useRoutePageMeta()
  if (isNotFound) return <NotFound />

  return (
    <div className="overflow-hidden lg:h-svh">
      <Outlet />
      <CommandPaletteContainer />
    </div>
  )
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
