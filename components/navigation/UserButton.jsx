'use client'
import { signOut } from 'next-auth/react'
import React from 'react'

const UserButton = ({ user }) => {
	return (
		<div>
			<h2>{user?.email}</h2>
			<button onClick={() => signOut()}>sign out</button>
		</div>
	)
}

export default UserButton
