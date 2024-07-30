// import getPosts from '@/server/actions/get-posts'
// import Camp from './components/Camp'
// import Features from './components/Features'
// import GetApp from './components/GetApp'
// import Guide from './components/Guide'
// import Hero from './components/Hero'
// import createPosts from '@/server/actions/create-posts'
// import Button from './components/Button'

import { Button } from '@/components/ui/button'

export default async function Home() {
	// const data = await getPosts()
	// console.log(data)
	return (
		<>
			<nav className=' bg-special text-white hover:opacity-15 flex justify-between px-12 py-4 '>
				<div>Home</div>
				<div>About</div>
				<div>Hey</div>
				<div>Kosomak</div>
				<div>55555</div>
			</nav>
			<Button variant='destructive'>a7a 3ala button</Button>
		</>
	)
}

// SSG (Static Side Generation)
// ISR (Incremental Static Regeneration)
