import { lazy, Suspense } from 'react'
import { Outlet, useLocation } from 'react-router'

import { useCanonical } from './hooks/useCanonical'
import { useCommandPaletteShortcut } from './hooks/useCommandPaletteShortcut'
import { RootProviders } from './providers/root-providers'

const CommandPalette = lazy(() =>
  import('./components/gallery/CommandPalette').then((module) => ({ default: module.CommandPalette })),
)

function App() {
  const { pathname } = useLocation()
  useCanonical(pathname)

  return (
    <RootProviders>
      <div className="overflow-hidden lg:h-svh">
        <Outlet />
        <CommandPaletteContainer />
      </div>
    </RootProviders>
  )
}

const CommandPaletteContainer = () => {
  const { isOpen, setIsOpen } = useCommandPaletteShortcut()
  if (!isOpen) return null

  return (
    <Suspense fallback={null}>
      <CommandPalette isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </Suspense>
  )
}
export default App
