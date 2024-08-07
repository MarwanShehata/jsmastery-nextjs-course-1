const passwordResetEmailTemplate = ({ confirmLink }) => {
	return (
		<div className='p-4'>
			<p className='text-lg font-bold'>Hi there,</p>
			<p className='mt-4'>
				Thank you for using our services. Please click the link below to reset your password
			</p>
			<a
				href={confirmLink}
				className='mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
			>
				Click here to reset your password
			</a>
		</div>
	)
}

export default passwordResetEmailTemplate
