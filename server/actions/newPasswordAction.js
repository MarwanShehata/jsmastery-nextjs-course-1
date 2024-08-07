'use server'

import { newPasswordSchema } from '@/types/newPasswordSchema'
import { db } from '..'
import { getPasswordResetTokenByToken } from './getPasswordResetTokenByToken'
import { eq } from 'drizzle-orm'
import { passwordResetTokens, users } from '../schema'
import bcrypt from 'bcrypt'
import { createSafeActionClient } from 'next-safe-action'
import { Pool } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-serverless'

const actionClient = createSafeActionClient()

export const newPasswordAction = actionClient
	.schema(newPasswordSchema)
	.action(async ({ parsedInput }) => {
		const pool = new Pool({
			connectionString: process.env.POSTGRES_DB_URL
		})
		const dbPool = drizzle(pool)

		console.log(`newPasswordAction`, parsedInput)
		const { password, token } = parsedInput
		// The most important thing is to check the token, if they don't have it then they can't change the password
		if (!token) {
			return { error: 'Missing token' }
		}
		const existingToken = await getPasswordResetTokenByToken(token)
		if (!existingToken) {
			return { error: 'Token not found' }
		}

		const hasExpired = new Date(existingToken.expires) < new Date()
		if (hasExpired) {
			return { error: 'Token has expired' }
		}

		const existingUser = await db.query.users.findFirst({
			where: eq(users.email, existingToken.email)
		})
		if (!existingUser) {
			return { error: 'User not found' }
		}

		const hashedPassword = await bcrypt.hash(password, 10)
		// Make a transaction : Delete the token and set the new password
		await dbPool.transaction(async (tx) => {
			// This is one action in the transaction which is to update the password
			await tx
				.update(users)
				.set({
					password: hashedPassword
				})
				.where(eq(users.id, existingUser.id))

			// This is another action in the transaction which is to delete the token
			await tx
				.delete(passwordResetTokens)
				.where(eq(passwordResetTokens.id, existingToken.id))
		})
		return {
			success: 'Password updated successfully'
		}
	})
