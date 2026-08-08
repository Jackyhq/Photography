import { lazy, Suspense } from 'react'

import { useContextMenuValue } from '~/atoms/context-menu'

const LazyContextMenuHandler = lazy(async () => {
  const { ContextMenuHandler } = await import('./context-menu-handler')
  return { default: ContextMenuHandler }
})

export const ContextMenuProvider: Component = ({ children }) => {
  const contextMenuState = useContextMenuValue()

  return (
    <>
      {children}
      {contextMenuState.open && (
        <Suspense fallback={null}>
          <LazyContextMenuHandler />
        </Suspense>
      )}
    </>
  )
}
