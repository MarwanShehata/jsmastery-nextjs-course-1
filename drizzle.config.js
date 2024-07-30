import { defineConfig } from 'drizzle-kit'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

export default defineConfig({
	schema: './server/schema.js',
	out: './server/migrations',
	dialect: 'postgresql', // 'postgresql' | 'mysql' | 'sqlite'
	dbCredentials: {
		url: process.env.POSTGRES_DB_URL
	}
})
