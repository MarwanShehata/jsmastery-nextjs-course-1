import { cn } from '@/lib/utils'
import './globals.css'
import NavBar from '@/components/navigation/NavBar'

export const metadata = {
	title: 'Travel',
	description: 'Travel UI/UX App for Camping'
}

export default function RootLayout({ children }) {
	return (
		<html lang='en'>
			<body className='px-6 md:px-12 max-w-7xl mx-auto'>
				<NavBar />
				<main className={cn()}>{children}</main>
			</body>
		</html>
	)
}
