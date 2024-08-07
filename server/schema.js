import { createId } from '@paralleldrive/cuid2'
import { drizzle } from 'drizzle-orm/neon-http'
import {
	pgTable,
	serial,
	text,
	boolean,
	timestamp,
	primaryKey,
	integer,
	pgEnum,
	unique
} from 'drizzle-orm/pg-core'
import { Pool } from 'pg'

// If you changed any thing here, you must run `npm run db:generate` then `npm run db:push`

const pool = new Pool({
	connectionString: process.env.DATABASE_URL
})

export const RoleEnum = pgEnum('roles', ['user', 'admin']) // the values would be like a dropdown menu of two roles: user or admin

export const users = pgTable('user', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => createId()),
	name: text('name'),
	email: text('email').notNull().unique(),
	emailVerified: timestamp('emailVerified', { mode: 'date' }),
	image: text('image'),
	password: text('password'),
	twoFactorEnabled: boolean('twoFactorEnabled').default(false),
	role: RoleEnum('roles').default('user')
})

export const accounts = pgTable('account',{
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
export const verificationTokens = pgTable('emailVerificationToken',{
		id: text('id')
			.notNull()
			.$defaultFn(() => createId()),
		token: text('token').notNull(),
		expires: timestamp('expires', { mode: 'date' }).notNull(),
		email: text('email').notNull()
	},
	(verificationToken) => ({
		compositePk: primaryKey({
			columns: [verificationToken.id, verificationToken.token]
		})
	})
)

export const passwordResetTokens = pgTable(
	'passwordResetToken',
	{
		id: text('id')
			.notNull()
			.$defaultFn(() => createId()),
		token: text('token').notNull(),
		expires: timestamp('expires', { mode: 'date' }).notNull(),
		email: text('email').notNull()
	},
	(verificationToken) => ({
		compositePk: primaryKey({
			columns: [verificationToken.id, verificationToken.token]
		})
	})
)



export const twoFactorTokens = pgTable(
	'twoFactorToken',
	{
		id: text('id')
			.notNull()
			.$defaultFn(() => createId()),
		token: text('token').notNull(),
		expires: timestamp('expires', { mode: 'date' }).notNull(),
		email: text('email').notNull()
	},
	(verificationToken) => ({
		compositePk: primaryKey({
			columns: [verificationToken.id, verificationToken.token]
		})
	})
)



export const db = drizzle(pool) // db http
0
