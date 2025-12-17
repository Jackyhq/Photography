
import { defineBuilderConfig } from '@afilmory/builder'


export default defineBuilderConfig(() => ({
  storage: {
    provider: 'local',
    basePath: './photos',
    baseUrl: 'https://photo.jackyw.uk/photos/',
  },
}))
