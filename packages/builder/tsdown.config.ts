import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: ['./src/index.ts', './src/photo-types.ts'],
  outDir: './dist',
  format: 'esm',
  clean: true,
  dts: true,
})
