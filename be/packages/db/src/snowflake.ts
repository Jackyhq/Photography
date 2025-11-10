import type { SnowflakeOpts } from 'nodejs-snowflake'
import { Snowflake } from 'nodejs-snowflake'
import { z } from 'zod'

function hashSeed(seed: string): number {
  let hash = 0
  if (seed.length === 0) {
    return hash
  }
  for (let i = 0; i < seed.length; i++) {
    const char = seed.codePointAt(i)!
    hash = (hash << 5) - hash + char
    hash = Math.trunc(hash)
  }
  return hash
}

export function randomNumber(seed: string, max: number): number {
  let hseed = hashSeed(seed)
  const x = Math.sin(hseed++) * 10_000
  return Math.floor((x - Math.floor(x)) * max)
}

const snowflakeRegex = /^\d{1,20}$/

export const snowflakeSchema = z.string().regex(snowflakeRegex, {
  message: 'Invalid Snowflake ID',
})

const snowflakeConfig: SnowflakeOpts = {
  instance_id:
    randomNumber(process.env.HOSTNAME || 'localhost', 4096) || Number.parseInt(process.env.SNOWFLAKE_INSTANCE_ID!) || 1,
  custom_epoch: 1759572127,
}

console.info('Snowflake used instance_id:', snowflakeConfig.instance_id)
export const snowflake = new Snowflake(snowflakeConfig)

export function generateId(): string {
  return String(snowflake.getUniqueID())
}
