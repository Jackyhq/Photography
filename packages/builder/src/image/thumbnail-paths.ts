import path from 'node:path'

import { workdir } from '../path.js'

const DEFAULT_DIRECTORY = 'thumbnails'
const FIXTURE_DIRECTORY = '__fixtures/thumbnails'

export function getThumbnailDirectory(fixtureMode = process.env.AFILMORY_E2E_FIXTURE === 'true'): string {
  return path.join(workdir, 'public', fixtureMode ? FIXTURE_DIRECTORY : DEFAULT_DIRECTORY)
}

export function getThumbnailUrlPrefix(fixtureMode = process.env.AFILMORY_E2E_FIXTURE === 'true'): string {
  return fixtureMode ? `/${FIXTURE_DIRECTORY}` : `/${DEFAULT_DIRECTORY}`
}
