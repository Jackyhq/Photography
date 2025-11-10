import 'dotenv-expand/config'

import { createEnv } from '@t3-oss/env-core'
import { z } from 'zod'

export const env = createEnv({
  server: {
    S3_REGION: z.string().default('us-east-1'),
    S3_ACCESS_KEY_ID: z.string().min(1).optional(),
    S3_SECRET_ACCESS_KEY: z.string().min(1).optional(),
    S3_ENDPOINT: z
      .string()
      .default('https://s3.us-east-1.amazonaws.com')
      .optional(),
    S3_BUCKET_NAME: z.string().min(1).optional(),
    S3_PREFIX: z.string().default('').optional(),
    S3_CUSTOM_DOMAIN: z.string().default('').optional(),
    S3_EXCLUDE_REGEX: z.string().optional(),

    PG_CONNECTION_STRING: z.string().min(1).optional(),

    // Git token for uploading updated manifest to remote repository
    GIT_TOKEN: z.string().optional(),
  },
  runtimeEnv: process.env,
  isServer: typeof window === 'undefined',
})
