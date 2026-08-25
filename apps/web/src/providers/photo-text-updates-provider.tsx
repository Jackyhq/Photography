import { photoLoader } from '@afilmory/data'
import type { PropsWithChildren } from 'react'
import { createElement, useSyncExternalStore } from 'react'

import { PhotoTextRevisionContext } from '~/hooks/usePhotoTextUpdates'

export const PhotoTextUpdatesProvider = ({ children }: PropsWithChildren) => {
  const revision = useSyncExternalStore(
    photoLoader.subscribePhotoTextChanges,
    photoLoader.getPhotoTextRevision,
    photoLoader.getPhotoTextRevision,
  )

  return createElement(PhotoTextRevisionContext, { value: revision }, children)
}
