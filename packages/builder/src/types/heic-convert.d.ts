declare module 'heic-convert' {
  import type { Buffer } from 'node:buffer'

  interface ConversionOptions {
    buffer: Uint8Array
    format: 'JPEG' | 'PNG'
    quality?: number
  }

  interface Converter {
    (options: ConversionOptions): Promise<Buffer>
    all: (options: ConversionOptions) => Promise<Array<{ convert: () => Promise<Buffer> }>>
  }

  const convert: Converter
  export default convert
}
