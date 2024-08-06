import { AlertCircleIcon } from 'lucide-react'

const FormError = ({ errorMessage }) => {
	if (!errorMessage) {
		return null
	}
	return (
		<p className='flex items-center gap-2 bg-destructive text-secondary-foreground p-3 rounded-md'>
			<AlertCircleIcon className='ml-2 h-4 w-4' />
			{errorMessage}
		</p>
	)
}

export default FormError
