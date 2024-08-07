'use client'

import { useForm } from 'react-hook-form'
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '../ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import AuthCard from './AuthCard'
import { LoginSchema } from '@/types/loginSchema'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { emailSigninAction } from '@/server/actions/emailSigninAction'
import { useAction } from 'next-safe-action/hooks'
import { useState } from 'react'
import FormSuccess from './FormSuccess'
import FormError from './FormError'
import { useRouter, useSearchParams } from 'next/navigation'
import { newPasswordSchema } from '@/types/newPasswordSchema'
import { newPasswordAction } from '@/server/actions/newPasswordAction'

const NewPasswordForm = () => {
	// const router = useRouter()

	const form = useForm({
		resolver: zodResolver(newPasswordSchema),
		defaultValues: {
			password: ''
			// token: ''
		}
	})
	const searchParams = useSearchParams()
	const token = searchParams.get('token')

	const { execute, status, result } = useAction(newPasswordAction, {
		onSuccess: ({ data, input }) => {
			if (data?.error) {
				setError(data.error)
			}
			if (data?.success) {
				setSuccess(data.success)
				// window.location.href='/'
				// router.push('/')
			}
		},
		onError: ({ error, input }) => {
			// Handle error action
			setError(error.message)
		}
	})
	const [error, setError] = useState('')
	const [success, setSuccess] = useState('')

	const onSubmit = (values) => {
		execute({ password: values.password, token })
	}

	return (
		<AuthCard
			cardTitle='Enter your new password!'
			backButtonHref='/auth/login'
			backButtonLabel='Back to login'
			showSocials
		>
			<div>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<div>
							<FormField
								control={form.control}
								name='password'
								render={({ field }) => (
									<FormItem>
										<FormLabel>New password</FormLabel>
										<FormControl>
											<Input
												{...field}
												placeholder='********'
												type='password'
												disabled={status === 'executing'}
												autoComplete='current-password'
											/>
										</FormControl>
										<FormDescription />
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormSuccess successMessage={success} />
							<FormError errorMessage={error} />
						</div>
						<Button
							type='submit'
							className={cn(
								'w-full my-2',
								status === 'executing'
									? 'animate-pulse cursor-not-allowed pointer-events-none'
									: ''
							)}
						>
							{'Reset password'}
						</Button>
					</form>
				</Form>
			</div>
		</AuthCard>
	)
}

export default NewPasswordForm
