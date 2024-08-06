import { CheckCircle2 } from 'lucide-react'
import React from 'react'

const FormSuccess = ({ successMessage }) => {
	if (!successMessage) {
		return null
	}
	return (
		<p className='flex items-center gap-2 bg-teal-400/25 text-secondary-foreground p-3 rounded-md'>
			<CheckCircle2 className='ml-2 h-4 w-4' />
			{successMessage}
		</p>
	)
}

export default FormSuccess
