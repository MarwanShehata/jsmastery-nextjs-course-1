'use server'
import passwordResetEmailTemplate from '@/components/emails/passwordResetEmailTemplate'
import verificationEmailTemplate from '@/components/emails/verificationEmailTemplate'
import getBaseURL from '@/lib/baseURL'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API)
const domain = getBaseURL()

const sendPasswordResetEmail = async (email, token) => {
	const confirmLink = `${domain}/auth/newPassword?token=${token}` 
    //changed from /newVerification to /reset
	// AI told me to change it to /newPassowrd instead 🙄
	const { data, error } = await resend.emails.send({
		from: 'onboarding@resend.dev',
		to: email,
		subject: 'kosom el verification email',
		react: passwordResetEmailTemplate({ confirmLink })
	})
	if (error) return console.log(error)
	if (data) return data
}

export default sendPasswordResetEmail
