import 'dotenv/config'

import { createEnv } from '@t3-oss/env-core'
import { defineConfig } from 'drizzle-kit'
import z from 'zod'

const env = createEnv({
  server: {
    DATABASE_URL: z.string(),
  },
  runtimeEnv: process.env,
})
export default defineConfig({
  schema: './src/schema.ts',
  out: './migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: env.DATABASE_URL,
  },
})
