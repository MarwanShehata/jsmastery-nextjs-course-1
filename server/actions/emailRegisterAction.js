'use server'

import { createSafeActionClient } from 'next-safe-action'
import { db } from '..'
import { eq } from 'drizzle-orm'
import { users } from '../schema'
import { RegisterSchema } from '@/types/registerSchema'
import bcrypt from 'bcrypt'
import { generateEmailVerificationToken } from './generateEmailVerificationToken'
import sendVerificationEmail from './sendVerificationEmail'

const actionClient = createSafeActionClient()

export const emailRegisterAction = actionClient
	.schema(RegisterSchema)
	.action(async ({ parsedInput }) => {
		const hashedPassword = await bcrypt.hash(parsedInput.password, 10)
		console.log(hashedPassword)

		// Check if the user is in the database
		const existingUser = await db.query.users.findFirst({
			where: eq(users.email, parsedInput.email)
		})
		// lots of checks
		if (existingUser) {
			if (!existingUser.emailVerified) {
				const verificationToken = await generateEmailVerificationToken(
					parsedInput.email
				)
				console.log(`verificationToken`, verificationToken)
				await sendVerificationEmail(
					verificationToken[0].email,
					verificationToken[0].token
				)
				return {
					success: `Email verification resent to ${parsedInput.email}`
				}
			}
			return { error: 'Email already exists' }
		}
		// Logic for when the user is not registered
		await db.insert(users).values({
			email: parsedInput.email,
			name: parsedInput.name,
			password: hashedPassword
		})
		const verificationToken = await generateEmailVerificationToken(
			parsedInput.email
		)
		await sendVerificationEmail(
			verificationToken[0].email,
			verificationToken[0].token
		)
		// if (existingUser?.email !== parsedInput.email) {
		// 	return { error: 'Email not found' }
		// }

		// we will add alot of email verifications later
		// if (!existingUser.emailVerified) {
		// }

		return { success: `yaaay ${parsedInput.email} has logged in` }
	})
