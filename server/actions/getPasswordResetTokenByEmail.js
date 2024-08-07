import { eq } from 'drizzle-orm'
import { db } from '..'
import { passwordResetTokens } from '../schema'

const getPasswordResetTokenByEmail = async (email) => {
	try {
		const passwordResetToken = await db.query.passwordResetTokens.findFirst({
			where: eq(passwordResetTokens.email, email)
		})
        return passwordResetToken
	} catch (error) {
		return null
	}
}

export default getPasswordResetTokenByEmail
