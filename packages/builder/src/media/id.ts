import crypto from 'node:crypto'
import path from 'node:path'

export function generateMediaId(key: string, digestSuffixLength?: number): string {
  const baseName = path.basename(key, path.extname(key))
  if (!digestSuffixLength || digestSuffixLength <= 0) {
    return baseName
  }

  const sha256 = crypto.createHash('sha256').update(key).digest('hex')
  const digestSuffix = sha256.slice(0, digestSuffixLength)
  return `${baseName}_${digestSuffix}`
}
