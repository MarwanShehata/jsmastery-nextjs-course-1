import NextAuth from 'next-auth'
import { DrizzleAdapter } from '@auth/drizzle-adapter'
import { db } from '@/server/index'
import Google from 'next-auth/providers/google'
import Github from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'
import { LoginSchema } from '@/types/loginSchema'
import { eq } from 'drizzle-orm'
import { users } from './schema'
import bcrypt from 'bcrypt'

export const { handlers, auth, signIn, signOut } = NextAuth({
	adapter: DrizzleAdapter(db),
	trustHost: true, // Allow NextAuth to trust the host Mesh 3aref dh sa7 walla 8alat
	secret: process.env.AUTH_SECRET,
	session: {
		strategy: 'jwt'
	},
	providers: [
		Google({
			clientId: process.env.GOOGLE_ID,
			clientSecret: process.env.GOOGLE_SECRET,
			allowDangerousEmailAccountLinking: true
		}),
		Github({
			clientId: process.env.GITHUB_ID,
			clientSecret: process.env.GITHUB_SECRET,
			allowDangerousEmailAccountLinking: true
		}),
		CredentialsProvider({
			name: 'Credentials',
			async authorize(credentials, req) {
				const validatedFields = LoginSchema.safeParse(credentials)

				if (validatedFields.success) {
					const { email, password, code } = validatedFields.data
					const user = await db.query.users.findFirst({
						where: eq(users.email, email)
					})
					if (!user || !user.password) {
						return null
					}
					const passwordMatch = await bcrypt.compare(password, user.password)
					if (passwordMatch) {
						return user
					}
				}
				return null
			}
		})
	]
})
