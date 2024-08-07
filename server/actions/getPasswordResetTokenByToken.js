'use server'

import { eq } from 'drizzle-orm'
import { db } from '..'
import { passwordResetTokens } from '../schema'

export const getPasswordResetTokenByToken = async (token) => {
	try {
		const passwordResetToken = await db.query.passwordResetTokens.findFirst({
			where: eq(passwordResetTokens.token, token)
		})
		return passwordResetToken
	} catch (error) {
		return {
			error: 'Token not found'
		}
	}
}
