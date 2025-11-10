import { readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const fileToBuffer = (filePath: string) => {
  const buffer = readFileSync(filePath)
  const u8Array = new Uint8Array(buffer.buffer)

  return u8Array
}

const __dirname = fileURLToPath(new URL('.', import.meta.url))

writeFileSync(
  path.resolve(__dirname, 'SF-Pro-Display-Regular.ttf'),
  `export default Buffer.from([${Array.from(fileToBuffer(path.resolve(__dirname, 'SF-Pro-Display-Regular.ttf')))}]);`,
)
