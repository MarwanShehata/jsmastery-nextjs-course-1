'use server'

import { eq } from 'drizzle-orm'
import { db } from '..'
import { passwordResetTokens } from '../schema'
import getPasswordResetTokenByEmail from './getPasswordResetTokenByEmail'

const generatePasswordResetToken = async (email) => {
	try {
		const token = crypto.randomUUID()
		// Hour Expiry
		const expires = new Date(new Date().getTime() + 1 * 60 * 60 * 1000)
		const existingToken = await getPasswordResetTokenByEmail(email)
		if (existingToken) {
			await db
				.delete(passwordResetTokens)
				.where(eq(passwordResetTokens.id, existingToken.id))
		}
		const passwordResetToken = await db
			.insert(passwordResetTokens)
			.values({
				email,
				token,
				expires
			})
			.returning() 
			// when you do .returning() the output is usually an array of objects
		return passwordResetToken
	} catch (error) {
		console.log('Error generating password reset token:', error)
		return null
	}
}

export default generatePasswordResetToken
