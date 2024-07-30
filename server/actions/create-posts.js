// 'use server'
// import { db } from '@/server'
// import { posts } from '../schema'
// import { revalidatePath } from 'next/cache'

// const createPosts = async (formData) => {
// 	revalidatePath('/')
// 	const title = formData.get('title')?.toString()

// 	if (!title) {
// 		return {
// 			message: 'Title is Required'
// 		}
// 	}

// 	const createdPost = await db.insert(posts).values({ title })
// 	return {
// 		success: true,
// 		data: createdPost,
// 		message: 'Post created successfully'
// 	}
// }

// export default createPosts
