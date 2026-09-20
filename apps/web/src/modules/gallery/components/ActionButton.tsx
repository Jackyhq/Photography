import type { ExtractAtomValue } from 'jotai'
import { useSetAtom } from 'jotai'
import type { ReactNode, SetStateAction } from 'react'
import { lazy, Suspense, useRef, useState } from 'react'

import { gallerySettingAtom } from '~/atoms/app'
import { useMobile } from '~/hooks/useMobile'

import { ActionButton } from './ActionButtonBase'

const loadDesktopActionButton = () =>
  import('./DesktopActionButton').then((module) => ({ default: module.DesktopActionButton }))
const LazyDesktopActionButton = lazy(loadDesktopActionButton)
const LazyMobileActionDrawer = lazy(async () => {
  const { MobileActionDrawer } = await import('./MobileActionDrawer')
  return { default: MobileActionDrawer }
})

type SetGallerySetting = (setting: SetStateAction<ExtractAtomValue<typeof gallerySettingAtom>>) => void

interface ResponsiveActionButtonProps {
  icon: string
  title: string
  badge?: number | string
  children: ReactNode
  contentClassName?: string
  globalOpen?: boolean
  onGlobalOpenChange?: (open: boolean, setGallerySetting: SetGallerySetting) => void
}

export const ResponsiveActionButton = (props: ResponsiveActionButtonProps) => {
  const isMobile = useMobile()

  // Separate owners also reset the open menu/drawer when crossing the breakpoint.
  return isMobile ? <MobileActionButton {...props} /> : <DeferredDesktopActionButton {...props} />
}

const MobileActionButton = ({ icon, title, badge, children }: ResponsiveActionButtonProps) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <ActionButton icon={icon} title={title} badge={badge} onClick={() => setOpen(true)} />
      {open && (
        <Suspense fallback={<MobileActionDrawerFallback />}>
          <LazyMobileActionDrawer open={open} onOpenChange={setOpen}>
            {children}
          </LazyMobileActionDrawer>
        </Suspense>
      )}
    </>
  )
}

const DeferredDesktopActionButton = ({
  icon,
  title,
  badge,
  children,
  contentClassName,
  globalOpen,
  onGlobalOpenChange,
}: ResponsiveActionButtonProps) => {
  const [open, setOpen] = useState(globalOpen ?? false)
  const setGallerySetting = useSetAtom(gallerySettingAtom)
  const restoreFocusRef = useRef(false)
  const onOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen)
    onGlobalOpenChange?.(nextOpen, setGallerySetting)
  }

  return (
    <Suspense
      fallback={
        <ActionButton
          icon={icon}
          title={title}
          badge={badge}
          aria-haspopup="menu"
          aria-expanded={open}
          onClick={(event) => {
            if (event.button === 0 && !event.ctrlKey) onOpenChange(!open)
          }}
          onKeyDown={(event) => {
            if (['Enter', ' '].includes(event.key)) {
              event.preventDefault()
              onOpenChange(!open)
            } else if (event.key === 'ArrowDown') {
              event.preventDefault()
              onOpenChange(true)
            } else if (event.key === 'Escape' && open) {
              event.preventDefault()
              onOpenChange(false)
            }
          }}
          onFocus={() => {
            restoreFocusRef.current = true
          }}
          onBlur={() => {
            restoreFocusRef.current = false
            if (open) onOpenChange(false)
          }}
        />
      }
    >
      <LazyDesktopActionButton
        icon={icon}
        title={title}
        badge={badge}
        contentClassName={contentClassName}
        open={open}
        onOpenChange={onOpenChange}
        restoreFocusRef={restoreFocusRef}
      >
        {children}
      </LazyDesktopActionButton>
    </Suspense>
  )
}

const MobileActionDrawerFallback = () => (
  <div
    className="fixed inset-0 z-40 flex items-end bg-black/20 backdrop-blur-sm"
    role="status"
    aria-label="Loading view settings"
  >
    <div className="flex min-h-32 w-full items-center justify-center rounded-t-2xl border-t border-zinc-200 bg-white/80 p-4 dark:border-zinc-800 dark:bg-black/80">
      <i className="i-mingcute-loading-line animate-spin text-lg" />
    </div>
  </div>
)
