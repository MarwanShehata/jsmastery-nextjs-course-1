import './globals.css'
// import NavBar from './components/NavBar'

export const metadata = {
	title: 'Travel',
	description: 'Travel UI/UX App for Camping'
}

export default function RootLayout({ children }) {
	return (
		<html lang='en'>
			<body className='bg-slate-900'>
				<main className='relative overflow-hidden'>{children}</main>
			</body>
		</html>
	)
}
