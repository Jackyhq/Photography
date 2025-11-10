import { sql } from 'drizzle-orm'
import { index, pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core'

export const reactions = pgTable(
  'reactions',
  {
    id: text('id')
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    createdAt: timestamp('created_at').defaultNow(),
    refKey: varchar('ref_key', { length: 120 }).notNull(),
    reaction: varchar('reaction', { length: 20 }).notNull(),
  },
  (t) => [index('reaction_ref_key_idx').on(t.refKey)],
)
