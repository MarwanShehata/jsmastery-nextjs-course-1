import React from 'react'
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card'
import Socials from './Socials'
import BackButton from './BackButton'

const AuthCard = ({
	children,
	cardTitle,
	backButtonHref,
	backButtonLabel,
	showSocials
}) => {
	return (
		<Card>
			<CardHeader>{cardTitle}</CardHeader>
			<CardContent>{children}</CardContent>
			{showSocials && (
				<CardFooter>
					<Socials />
				</CardFooter>
			)}
			<CardFooter>
				<BackButton href={backButtonHref} label={backButtonLabel} />
			</CardFooter>
		</Card>
	)
}

export default AuthCard
