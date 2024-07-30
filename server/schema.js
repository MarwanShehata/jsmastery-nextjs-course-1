import { drizzle } from 'drizzle-orm/neon-http'
import {
	pgTable,
	serial,
	text,
	boolean,
	timestamp,
	primaryKey,
	integer
} from 'drizzle-orm/pg-core'
import { Pool } from 'pg'


const pool = new Pool({
	connectionString: process.env.DATABASE_URL
})

export const users = pgTable('user', {
	id: text('id').primaryKey(),
	name: text('name'),
	email: text('email').notNull().unique(),
	emailVerified: timestamp('emailVerified', { mode: 'date' }),
	image: text('image')
})

export const accounts = pgTable(
	'account',
	{
		userId: text('userId')
			.notNull()
			.references(() => users.id, { onDelete: 'cascade' }),
		type: text('type').notNull(),
		provider: text('provider').notNull(),
		providerAccountId: text('providerAccountId').notNull(),
		refresh_token: text('refresh_token'),
		access_token: text('access_token'),
		expires_at: integer('expires_at'),
		token_type: text('token_type'),
		scope: text('scope'),
		id_token: text('id_token'),
		session_state: text('session_state')
	},
	(account) => ({
		compoundKey: primaryKey({
			columns: [account.provider, account.providerAccountId]
		})
	})
)

export const db = drizzle(pool)
