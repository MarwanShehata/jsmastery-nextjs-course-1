import { auth } from '@/server/auth'
import UserButton from './UserButton'
import { Button, buttonVariants } from '../ui/button'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { LogIn } from 'lucide-react'
import Logo from './Logo'

const NavBar = async () => {
	const disabled = true
	const session = await auth()

	return (
		<header className='py-4'>
			<nav>
				<ul className='flex justify-between'>
					<li>
						<Link href={'/'}>
							<Logo />
						</Link>
					</li>
					{!session ? (
						<li>
							<Button asChild>
								<Link
									aria-label='sign in'
									className='flex gap-2'
									href={'/auth/login'}
								>
									<LogIn size={16} />
									<span>Login</span>
								</Link>
							</Button>
						</li>
					) : (
						<li>
							<UserButton user={session?.user} expires={session?.expires} />
						</li>
					)}
				</ul>
			</nav>
		</header>
	)
}

export default NavBar
