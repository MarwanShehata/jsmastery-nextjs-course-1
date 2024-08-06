import React from 'react'
import Link from 'next/link'
import { Button } from '../ui/button'

const BackButton = ({ href, label }) => {
	return (
		<Button className="w-full" asChild variant='link'>
			<Link aria-label='back' href={href} className='flex gap-2'>
				{label}
			</Link>
		</Button>
	)
}

export default BackButton
