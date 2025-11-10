import 'dotenv-expand/config'

import { env } from '@env'
import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  dialect: 'postgresql',
  dbCredentials: {
    url: env.PG_CONNECTION_STRING,
  },
  schema: './src/schemas',
  out: './drizzle',
})
