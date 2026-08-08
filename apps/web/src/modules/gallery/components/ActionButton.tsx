import { Button } from '@afilmory/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@afilmory/ui/dropdown-menu'
import { clsxm } from '@afilmory/utils'
import { useSetAtom } from 'jotai'
import { lazy, Suspense, useState } from 'react'

import { gallerySettingAtom } from '~/atoms/app'
import { useMobile } from '~/hooks/useMobile'

const LazyMobileActionDrawer = lazy(async () => {
  const { MobileActionDrawer } = await import('./MobileActionDrawer')
  return { default: MobileActionDrawer }
})

// 通用的操作按钮组件
export const ActionButton = ({
  icon,
  title,
  badge,
  onClick,
  ref,
  ...props
}: {
  icon: string
  title: string
  badge?: number | string
  onClick: () => void
  ref?: React.RefObject<HTMLButtonElement>
}) => {
  return (
    <Button
      variant="ghost"
      size="sm"
      className="relative h-10 w-10 rounded-full border-0 bg-gray-100 transition-all duration-200 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
      title={title}
      aria-label={title}
      onClick={onClick}
      ref={ref}
      {...props}
    >
      <i className={clsxm(icon, 'text-base text-gray-600 dark:text-gray-300')} />
      {badge && (
        <span className="bg-accent absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full text-xs font-medium text-white shadow-sm">
          {badge}
        </span>
      )}
    </Button>
  )
}

// 桌面端的下拉菜单按钮
export const DesktopActionButton = ({
  icon,
  title,
  badge,
  children,
  contentClassName,
  open,
  onOpenChange,
}: {
  icon: string
  title: string
  badge?: number | string
  children: React.ReactNode
  contentClassName?: string
  open?: boolean
  onOpenChange?: (open: boolean, setGallerySetting: (setting: any) => void) => void
}) => {
  const setGallerySetting = useSetAtom(gallerySettingAtom)
  return (
    <DropdownMenu
      defaultOpen={open}
      onOpenChange={(open) => {
        onOpenChange?.(open, setGallerySetting)
      }}
    >
      <DropdownMenuTrigger asChild>
        <ActionButton icon={icon} title={title} badge={badge} onClick={() => {}} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" className={contentClassName}>
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

// 响应式操作按钮组件
export const ResponsiveActionButton = ({
  icon,
  title,
  badge,
  children,
  contentClassName,
  globalOpen,
  onGlobalOpenChange,
}: {
  icon: string
  title: string
  badge?: number | string
  children: React.ReactNode
  contentClassName?: string
  globalOpen?: boolean
  onGlobalOpenChange?: (open: boolean, setGallerySetting: (setting: any) => void) => void
}) => {
  const isMobile = useMobile()
  const [open, setOpen] = useState(false)

  if (isMobile) {
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

  return (
    <DesktopActionButton
      icon={icon}
      title={title}
      badge={badge}
      contentClassName={contentClassName}
      open={globalOpen}
      onOpenChange={onGlobalOpenChange}
    >
      {children}
    </DesktopActionButton>
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
