import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router'

import { CommandPalette } from './components/gallery/CommandPalette'
import { useCanonical } from './hooks/useCanonical'
import { useCommandPaletteShortcut } from './hooks/useCommandPaletteShortcut'
import { RootProviders } from './providers/root-providers'

// prefetch preview page route
function App() {
  const { pathname } = useLocation()
  useCanonical(pathname)

  useEffect(() => {
    import('~/pages/(main)/photos/[photoId]/index')
  }, [])

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
  return <CommandPalette isOpen={isOpen} onClose={() => setIsOpen(false)} />
}
export default App
