import { defineBuilderConfig } from '@afilmory/builder'

export default defineBuilderConfig(() => ({
  storage: {
    provider: 'local',
    basePath: './photos',
    baseUrl: 'https://photos3.jackyw.cn/photos/',
    excludeRegex: '^incoming($|/.*)',
  },
  plugins: [new URL('plugins/builder/photo-descriptions.ts', import.meta.url).href],
}))
