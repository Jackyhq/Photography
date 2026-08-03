import { readFileSync, writeFileSync } from 'node:fs'

function isMissingFile(error: unknown): boolean {
  return error instanceof Error && 'code' in error && error.code === 'ENOENT'
}

/** Write a generated asset only when its bytes have actually changed. */
export function writeAssetIfChanged(outputPath: string, contents: Buffer): boolean {
  try {
    if (readFileSync(outputPath).equals(contents)) return false
  } catch (error) {
    if (!isMissingFile(error)) throw error
  }

  writeFileSync(outputPath, contents)
  return true
}
