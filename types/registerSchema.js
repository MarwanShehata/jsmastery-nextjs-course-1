import * as z from 'zod'

export const RegisterSchema = z.object({
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
	name: z
		.string()
		.min(3, {
			message: 'Name must be at least 3 characters'
		})
		.max(50, {
			message: 'Name must be between 3 and 50 characters'
		}),
})
