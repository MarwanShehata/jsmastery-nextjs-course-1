const verificationEmailTemplate = ({ confirmLink }) => {
	return (
		<div className='p-4'>
			<p className='text-lg font-bold'>Hi there,</p>
			<p className='mt-4'>
				Thank you for signing up. Please click the link below to verify your
				email.
			</p>
			<a
				href={confirmLink}
				className='mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
			>
				Verify Email
			</a>
		</div>
	)
}

export default verificationEmailTemplate
