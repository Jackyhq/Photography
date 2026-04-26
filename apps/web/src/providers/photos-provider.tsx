import type { PhotoManifest } from '~/types/photo'

import { PhotosContext } from './photos-context'

export const PhotosProvider = ({ children, photos }: { children: React.ReactNode; photos: PhotoManifest[] }) => {
  return <PhotosContext value={photos}>{children}</PhotosContext>
}
