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
import { useRouter } from 'next/navigation'

const LoginForm = () => {
	// const router = useRouter()

	const form = useForm({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: '',
			password: ''
		}
	})

	const { execute, status, result } = useAction(emailSigninAction, {
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
		console.log(values)
		execute(values)
	}

	return (
		<AuthCard
			cardTitle='Welcome back!'
			backButtonHref='/auth/register'
			backButtonLabel='Create a new account'
			showSocials
		>
			<div>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<div>
							<FormField
								control={form.control}
								name='email'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input
												{...field}
												placeholder='kosomak@zeby.com'
												type='email'
												autoComplete='email'
											/>
										</FormControl>
										<FormDescription />
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='password'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Password</FormLabel>
										<FormControl>
											<Input
												{...field}
												placeholder='********'
												type='password'
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
							<Button variant='link' size='sm' asChild>
								<Link href={'/auth/reset'}>Forgot your password?</Link>
							</Button>
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
							{'Login'}
						</Button>
					</form>
				</Form>
			</div>
		</AuthCard>
	)
}

export default LoginForm
