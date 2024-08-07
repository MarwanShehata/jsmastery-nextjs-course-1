'use server'

import { eq } from 'drizzle-orm'
import { db } from '..'
import { users } from '../schema'
import { generateEmailVerificationToken } from './generateEmailVerificationToken'
import sendPasswordResetEmail from './sendPasswordResetEmail'
import generatePasswordResetToken from './generatePasswordResetToken'
import { createSafeActionClient } from 'next-safe-action'
import { resetSchema } from '@/types/resetSchema'

const actionClient = createSafeActionClient()
export const passwordResetAction = actionClient
	.schema(resetSchema)
	.action(async ({ parsedInput }) => {
		const { email } = parsedInput
		const existingUser = await db.query.users.findFirst({
			where: eq(users.email, email)
		})
		if (!existingUser) {
			return { error: "This user doesn't exist" }
		}

		const passwordResetToken = await generatePasswordResetToken(email)
		if (!passwordResetToken) {
			return {
				error: 'Failed to generate reset token'
			}
		}

		await sendPasswordResetEmail(
			passwordResetToken[0].email,
			passwordResetToken[0].token
		)
		return {
			success: 'Password reset email sent'
		}
	})
