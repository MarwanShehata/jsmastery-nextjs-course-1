'use server'

import { eq } from 'drizzle-orm'
import { db } from '..'
import { verificationTokens } from '../schema'

export const getVerificationTokenByEmail = async (email) => {
	try {
		const verificationToken = await db.query.verificationTokens.findFirst({
			where: eq(verificationTokens.token, email)
		})
		return verificationToken
	} catch (error) {
		return null
	}
}
export const generateEmailVerificationToken = async (email) => {
	const token = crypto.randomUUID()
	// token should be expired in 1 hour
	const expires = new Date(new Date().getTime() + 60 * 60 * 1000)
	const existingToken = await getVerificationTokenByEmail(email)

	if (existingToken) {
		await db
			.delete(verificationTokens)
			.where(eq(verificationTokens.id, existingToken.id))
	}

	const verificationToken = await db
		.insert(verificationTokens)
		.values({
			email,
			token,
			expires
		})
		.returning()
	console.log(`verificationToken`)
	console.log(verificationToken)
	return verificationToken
}
