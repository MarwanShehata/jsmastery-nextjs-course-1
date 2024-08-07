import * as z from 'zod'

export const newPasswordSchema = z.object({
	password: z.string().min(6, 'The password must be at least 6 characters'),
	token: z.string().nullable().optional()
})
