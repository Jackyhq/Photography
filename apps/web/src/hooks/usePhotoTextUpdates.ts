import { photoLoader } from '@afilmory/data'
import { useSyncExternalStore } from 'react'

export const usePhotoTextUpdates = (): void => {
  useSyncExternalStore(
    photoLoader.subscribePhotoTextChanges,
    photoLoader.getPhotoTextRevision,
    photoLoader.getPhotoTextRevision,
  )
}
