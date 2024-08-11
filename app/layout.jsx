import { cn } from '@/lib/utils'
import './globals.css'
import NavBar from '@/components/navigation/NavBar'
import { ThemeProvider } from '@/components/providers/ThemeProvider'

export const metadata = {
	title: 'Travel',
	description: 'Travel UI/UX App for Camping'
}

export default function RootLayout({ children }) {
	return (
		<html lang='en' suppressHydrationWarning>
			<body className='px-6 md:px-12 max-w-7xl mx-auto'>
				<ThemeProvider
					attribute='class'
					defaultTheme='system'
					enableSystem
					disableTransitionOnChange
				>
					<NavBar />
					<main className={cn()}>{children}</main>
				</ThemeProvider>
			</body>
		</html>
	)
}
