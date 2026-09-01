import { photoLoader } from '@afilmory/data'
import { lazy, Suspense, useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router'

import { useCanonical } from './hooks/useCanonical'
import { useCommandPaletteShortcut } from './hooks/useCommandPaletteShortcut'
import { RootProviders } from './providers/root-providers'

const CommandPalette = lazy(() =>
  import('./components/gallery/CommandPalette').then((module) => ({ default: module.CommandPalette })),
)

function App() {
  const { pathname } = useLocation()
  useCanonical(getIndexableCanonicalPath(pathname))

  return (
    <RootProviders>
      <div className="overflow-hidden lg:h-svh">
        <Outlet />
        <CommandPaletteContainer />
      </div>
    </RootProviders>
  )
}

function getIndexableCanonicalPath(pathname: string): string | undefined {
  if (pathname === '/' || /^\/explory\/?$/u.test(pathname)) return pathname

  const photoPathMatch = pathname.match(/^\/photos\/([^/]+)\/?$/u)
  if (!photoPathMatch) return undefined

  try {
    const photoId = decodeURIComponent(photoPathMatch[1])
    return photoLoader.getPhoto(photoId) ? pathname : undefined
  } catch {
    return undefined
  }
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
