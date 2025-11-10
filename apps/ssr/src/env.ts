import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  server: {
    PG_CONNECTION_STRING: z.string().min(1).optional(),
  },
  runtimeEnv: {
    PG_CONNECTION_STRING: process.env.PG_CONNECTION_STRING,
  },
})
