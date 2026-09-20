import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@afilmory/ui/dropdown-menu'
import type { ReactNode, RefObject } from 'react'
import { useLayoutEffect, useRef } from 'react'

import { ActionButton } from './ActionButtonBase'

export interface DesktopActionButtonProps {
  icon: string
  title: string
  badge?: number | string
  children: ReactNode
  contentClassName?: string
  open: boolean
  onOpenChange: (open: boolean) => void
  restoreFocusRef: RefObject<boolean>
}

export const DesktopActionButton = ({
  icon,
  title,
  badge,
  children,
  contentClassName,
  open,
  onOpenChange,
  restoreFocusRef,
}: DesktopActionButtonProps) => {
  const triggerRef = useRef<HTMLButtonElement>(null)

  useLayoutEffect(() => {
    // Loading replaces the fallback button. Keep keyboard focus unless the user left it;
    // an opening Radix menu manages its own focus instead.
    if (restoreFocusRef.current && !open && document.activeElement === document.body) {
      triggerRef.current?.focus()
    }
    restoreFocusRef.current = false
  }, [open, restoreFocusRef])

  return (
    <DropdownMenu open={open} onOpenChange={onOpenChange}>
      <DropdownMenuTrigger asChild>
        <ActionButton ref={triggerRef} icon={icon} title={title} badge={badge} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" className={contentClassName}>
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
