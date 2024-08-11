'use client'
import { signOut } from 'next-auth/react'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Image from 'next/image'
import { LogOut, Moon, Settings, Sun, Truck } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useState } from 'react'

const UserButton = ({ user }) => {
	// console.log(user.image) // If you didn't add the image hostnames in the next.config.mjs file you will get `undefined`
	// console.log(user.name)
	// console.log(user.email)
	const { theme, setTheme } = useTheme()
	const [check, setCheck] = useState(false)
	const handleThemeSwitch = () => {
		switch (theme) {
			case 'dark':
				return setCheck(true)
				break
			case 'light':
				return setCheck(false)
				break
			case 'system':
				return setCheck(false)
				break
			default:
				return setCheck(false)
				break
		}
	}

	if (user) {
		return (
			<>
				<DropdownMenu modal={false}>
					<DropdownMenuTrigger>
						<Avatar className='w-7 h-7'>
							{user.image && (
								<AvatarImage src={user.image} alt={user.name} fill='true' />
							)}
							{!user.image && (
								<AvatarFallback className='bg-primary/25'>
									<div className='font-bold'>
										{user.name?.charAt(0).toUpperCase()}
									</div>
								</AvatarFallback>
							)}
						</Avatar>
					</DropdownMenuTrigger>
					<DropdownMenuContent className='w-64 p-6' align='end'>
						<div className='mb-4 p-4 flex flex-col gap-1 items-center rounded-lg  bg-primary/10'>
							{user.image && (
								<Image
									src={user.image}
									alt={user.name}
									className='rounded-full'
									width={36}
									height={36}
								/>
							)}
							<p className='font-bold text-xs'>{user.name}</p>
							<span className='text-xs font-medium text-secondary-foreground'>
								{user.email}
							</span>
						</div>

						<DropdownMenuSeparator />
						<DropdownMenuItem className='group py-2 font-medium cursor-pointer transition-all duration-200 hover:bg-primary/10'>
							<Truck
								size={14}
								className='mr-2 group-hover:translate-x-1 transition-all duration-300 ease-in-out'
							/>
							My Orders
						</DropdownMenuItem>
						<DropdownMenuItem className='group py-2 font-medium cursor-pointer transition-all duration-200 hover:bg-primary/10'>
							<Settings
								size={14}
								className='mr-2 group-hover:rotate-180 transition-all duration-300 ease-in-out'
							/>{' '}
							Settings
						</DropdownMenuItem>
						<DropdownMenuItem className='py-2 font-medium cursor-pointer transition-all duration-200 hover:bg-primary/10'>
							<div className='relative flex mr-3'>
								<div className='group flex items-center'>
									<Sun
										size={14}
										className='group-hover:text-yellow-600  absolute group-hover:rotate-180  dark:scale-0 dark:-rotate-90 transition-all duration-750 ease-in-out'
									/>
									<Moon
										size={14}
										className='group-hover:text-blue-400  scale-0 rotate-90 dark:rotate-0  dark:scale-100 transition-all ease-in-out duration-750'
									/>
								</div>
								<p>
									Theme<span>theme</span>
								</p>
							</div>
						</DropdownMenuItem>
						<DropdownMenuItem
							onClick={() => signOut()}
							className='py-2 group focus:bg-destructive/30 font-medium cursor-pointer '
						>
							<LogOut
								size={14}
								className='mr-2 group-hover:scale-75 transition-all duration-300 ease-in-out'
							/>
							Sign Out
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</>
		)
	}
}

export default UserButton
