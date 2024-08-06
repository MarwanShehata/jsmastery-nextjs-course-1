'use server'

import { getVerificationTokenByEmail } from './generateEmailVerificationToken'
import { db } from '..'
import { eq } from 'drizzle-orm'
import { users, verificationTokens } from '../schema'

const newVerifications = async (token) => {
	const existingToken = await getVerificationTokenByEmail(token)
	console.log(existingToken)
	if (!existingToken) {
		return {
			error: 'Token not found'
		}
	}
	const hasExpired = new Date(existingToken.expires) < new Date()
	if (hasExpired) {
		return {
			error: 'Token has expired'
		}
	}
	const existingUser = await db.query.users.findFirst({
		where: eq(users.email, existingToken.email)
	})
	if (!existingUser) {
		return {
			error: "Email doesn't exist"
		}
	}
	await db.update(users).set({
		emailVerified: new Date(),
		email: existingToken.email
	})
	await db
		.delete(verificationTokens)
		.where(eq(verificationTokens.id, existingToken.id))
	return {
		success: 'Email verified'
	}
}

export default newVerifications
