'use server'
import verificationEmailTemplate from '@/components/emails/verificationEmailTemplate'
import getBaseURL from '@/lib/baseURL'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API)
const domain = getBaseURL()

const sendVerificationEmail = async (email, token) => {
	const confirmLink = `${domain}/auth/newVerification?token=${token}`
	const { data, error } = await resend.emails.send({
		from: 'onboarding@resend.dev',
		to: email,
		subject: 'kosom el verification email',
		react: verificationEmailTemplate({ confirmLink })
	})
	if (error) return console.log(error)
	if (data) return data
}

export default sendVerificationEmail
