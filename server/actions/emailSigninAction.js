'use server'

import { LoginSchema } from '@/types/loginSchema'
import { createSafeActionClient } from 'next-safe-action'
import { db } from '..'
import { eq } from 'drizzle-orm'
import { users } from '../schema'
import sendVerificationEmail from './sendVerificationEmail'
import { signIn } from '@/server/auth'
import { AuthError } from 'next-auth'

const actionClient = createSafeActionClient()

export const emailSigninAction = actionClient
	.schema(LoginSchema)
	.action(async ({ parsedInput }) => {
		try {
			// Check if the user is in the database
			const existingUser = await db.query.users.findFirst({
				where: eq(users.email, parsedInput.email)
			})
			// lots of checks
			if (existingUser?.email !== parsedInput.email) {
				return { error: 'Email not found' }
			}
			// we will add alot of email verifications later
			if (!existingUser.emailVerified) {
				const verificationToken = await generateEmailVerificationToken(
					existingUser.email
				)
				await sendVerificationEmail(
					verificationToken[0].email,
					verificationToken[0].token
				)
				return { success: 'Confirmation email sent' }
			}
			//TODO 2FA
			// 'credentials' means that we must have a credintials provider in auth.js [like google, github,...]
			
			await signIn('credentials', {
				email: parsedInput.email,
				password: parsedInput.password,
				// redirect: false // when we do it false, we have to more control, but we do the routing manually via react router in LoginForm
				redirectTo:'/'
			})
			

			return { success: parsedInput.email }
		} catch (error) {
			if (error instanceof AuthError) {
				switch (error.type) {
					case 'CredentialsSignin':
						return { error: error.message }
						break
					case 'AccessDenied':
						return { error: error.message }
						break
					case 'OAuthSignInError':
						return { error: error.message }
						break
					case 'OAuthAccountNotLinked':
						return { error: error.message }
					default:
						return { error: 'Something went wrong' }
				}
			}
			throw error
		}
	})
