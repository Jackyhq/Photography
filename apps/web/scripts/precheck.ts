import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { $ } from 'execa'

export const precheck = async () => {
  if (process.env.AFILMORY_SKIP_MANIFEST_PRECHECK === 'true') {
    console.info('Skipping manifest precheck because AFILMORY_SKIP_MANIFEST_PRECHECK=true')
    return
  }

  const __dirname = path.dirname(fileURLToPath(import.meta.url))
  const workdir = path.resolve(__dirname, '../../..')

  await $({
    cwd: workdir,
    stdio: 'inherit',
  })`pnpm --filter @afilmory/builder cli`
}
