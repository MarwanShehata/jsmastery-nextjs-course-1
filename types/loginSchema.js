import * as z from 'zod'

export const LoginSchema = z.object({
	email: z
		.string({
			required_error: 'Email is required'
		})
		.email({
			message: 'Invalid email address'
		}),
	password: z
		.string()
		.min(8, {
			message: 'Password must be at least 8 characters'
		})
		.max(50, {
			message: 'Password must be between 8 and 50 characters'
		})
		.refine((password) => !password.match(/^[0-9]+$/), {
			message: 'Password cannot be too simple'
		}),
	code: z.optional(z.string())
})
