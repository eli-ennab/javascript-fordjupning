import { useState } from 'react'
import ClickCounter from './components/ClickCounter'
import Salary from './components/Salary'
import './App.css'

type Post = {
	id: number
	title: string
	likes: number
}

const App = () => {
	const [msg, setMsg] = useState("I am stateful.")

	const [posts, setPosts] = useState<Post[]>([
		{
			id: 1,
			title: "React rocks",
			likes: 1337
		},
		{
			id: 2,
			title: "JSX also rocks",
			likes: 45
		},
		{
			id: 3,
			title: "TypeScript",
			likes: 1000
		}
	])

	const deletePost = (deletedPost: Post) => {
		setPosts(posts.filter(post => post !== deletedPost))
		// setPosts(prevPosts => prevPosts.filter(post => post !== deletedPost))	// if it could have been updated, use prevPosts
	}

	const handleAddLike = (post: Post) => {
		post.likes++

		setPosts([...posts])
	}

	return (
		<div className="App">
			<h1>React Basics</h1>

			<h2>{msg}</h2>

			<button onClick={ () => { setMsg('You made me yellow.')} } className="btn btn-warning btn-lg">Try me</button>

			<hr />

			<ClickCounter />

			<hr />

			<Salary />

			<hr />

			<h2>Posts</h2>

			{ posts.length > 0 && (
				<ul className="list-group list-group-flush">
					{
						posts.map( (post, index) => (
							<li key={index}>
								{post.title} ({post.likes} likes)
								<button
									className="btn btn-sm btn-heart"
									onClick={() => { handleAddLike(post)}}
								>❤</button>
								<button
									className="btn btn-sm btn-delete"
									onClick={() => { deletePost(post) }}
									>delete
								</button>
							</li>
						))
					}
				</ul>
			)}

			{/* conditional template */}
				{ posts.length === 0 && (
				<p>There are no posts yet.</p>
			)}

		</div>
	)
}

export default App
