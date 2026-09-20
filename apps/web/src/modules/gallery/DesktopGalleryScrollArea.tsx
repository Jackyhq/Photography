import { ScrollArea } from '@afilmory/ui/scroll-areas'
import type { PropsWithChildren } from 'react'

export const DesktopGalleryScrollArea = ({ children }: PropsWithChildren) => (
  <ScrollArea rootClassName="h-svh w-full" viewportClassName="size-full">
    {children}
  </ScrollArea>
)
