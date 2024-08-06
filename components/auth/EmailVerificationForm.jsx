'use client'

import newVerifications from '@/server/actions/newVerifications'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import AuthCard from './AuthCard'
import FormSuccess from './FormSuccess'
import FormError from './FormError'

const EmailVerificationForm = () => {
	const usedToken = useSearchParams().get('token')
	const router = useRouter()
	const [success, setSuccess] = useState('')
	const [error, setError] = useState('')

	const handleVerification = useCallback(() => {
		if (success || error) return
		if (!usedToken) {
			setError('Invalid token')
			return
		}
		newVerifications(usedToken).then((data) => {
			if (data.error) {
				setError(data.error)
			}
			if (data.success) {
				setSuccess(data.success)
				router.push('/auth/login')
			}
		})
	}, [])
	useEffect(() => {
		handleVerification()
	}, [])

	return (
		<AuthCard
			backButtonHref={'/auth/login'}
			backButtonLabel={'Back to Login'}
			cardTitle='Verify your email'
			showSocials={false}
		>
			<p className='flex items-center flex-col w-full justify-center '>
				{!success && !error ? 'Verifying email...' : null}
			</p>
			<FormSuccess successMessage={success} />
			<FormError errorMessage={error} />
		</AuthCard>
	)
}

export default EmailVerificationForm
