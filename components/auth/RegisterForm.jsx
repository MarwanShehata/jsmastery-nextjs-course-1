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
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useAction } from 'next-safe-action/hooks'
import { useState } from 'react'
import { RegisterSchema } from '@/types/registerSchema'
import { emailRegisterAction } from '@/server/actions/emailRegisterAction'
import FormSuccess from './FormSuccess'
import FormError from './FormError'

const RegisterForm = () => {
	const form = useForm({
		resolver: zodResolver(RegisterSchema),
		defaultValues: {
			email: '',
			password: '',
			name: ''
		}
	})
	const { execute, status, result } = useAction(emailRegisterAction, {
		onSuccess: ({ data, input }) => {
			// Handle successful action
			if (data.error) {
				setError(data.error)
			}
			if (data.success) {
				setSuccess(data.success)
			}
		},
	})
	const [error, setError] = useState('')
	const [success, setSuccess] = useState('')

	const onSubmit = (values) => {
		execute(values)
	}

	return (
		<AuthCard
			cardTitle='Create an account 🎉!'
			backButtonHref='/auth/login'
			backButtonLabel='Already have an account? Login here'
			showSocials
		>
			<div>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<div>
							<FormField
								control={form.control}
								name='name'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Username</FormLabel>
										<FormControl>
											<Input {...field} placeholder='kosomak' type='text' />
										</FormControl>
										<FormDescription />
										<FormMessage />
									</FormItem>
								)}
							/>

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
						<Button type='submit' className={cn('w-full my-2')}>
							{'Register'}
						</Button>
					</form>
				</Form>
			</div>
		</AuthCard>
	)
}

export default RegisterForm
