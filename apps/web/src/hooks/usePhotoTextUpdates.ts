import { createContext, use } from 'react'

export const PhotoTextRevisionContext = createContext<number | undefined>(undefined)

export const usePhotoTextUpdates = (): number => {
  const revision = use(PhotoTextRevisionContext)
  if (revision === undefined) throw new Error('Photo text updates provider is missing')
  return revision
}
