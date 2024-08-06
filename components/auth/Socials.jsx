'use client'
import Image from 'next/image'
import { Button } from '../ui/button'
import { signIn } from 'next-auth/react'
// import { signIn } from '@/server/auth'
// import { Google } from 'lucide-react'
const Socials = () => {
	return (
		<div className='flex flex-col items-center w-full gap-4'>
			<Button
				className='flex gap-4 w-full'
				onClick={() =>
					signIn('google', {
						redirect: false,
						callbackUrl: '/'
					})
				}
				variant='outline'
			>
				<p>Sign in with Google</p>
				{/* import svg element */}
				<Image
					src={'/google.svg'}
					alt='google logo'
					width={20}
					height={20}
				/>
			</Button>
			<Button
				className='flex gap-4 w-full'
				onClick={() =>
					signIn('github', {
						redirect: false,
						callbackUrl: '/'
					})
				}
				variant='outline'
			>
				<p>Sign in with Github</p>
				<Image
					src={'/github.svg'}
					alt='google logo'
					width={20}
					height={20}
				/>
			</Button>
		</div>
	)
}

export default Socials
