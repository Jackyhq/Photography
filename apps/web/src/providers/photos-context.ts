import { createContext } from 'react'

import type { PhotoManifest } from '~/types/photo'

export const PhotosContext = createContext<PhotoManifest[]>(null!)
