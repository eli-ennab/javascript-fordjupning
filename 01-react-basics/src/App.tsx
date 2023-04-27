import { useState } from 'react'
import ClickCounter from './components/ClickCounter'
import Salary from './components/Salary'
import './App.css'

type Post = {
	title: string
	likes: number
}

const App = () => {
	const [msg, setMsg] = useState("I am stateful.")
	const [posts, setPosts] = useState<Post[]>([
		{
			title: "React rocks",
			likes: 1337
		},
		{
			title: "JSX also rocks",
			likes: 45
		},
		{
			title: "TypeScript",
			likes: 1000
		}
	])

	// input state
	const [newPostTitle, setNewPostTitle] = useState("")

	const deletePost = (deletedPost: Post) => {
		setPosts(posts.filter(post => post !== deletedPost))
		// setPosts(prevPosts => prevPosts.filter(post => post !== deletedPost))	// if it could have been updated, use prevPosts
	}

	const handleAddLike = (post: Post) => {
		post.likes++

		setPosts([...posts])
	}

	const handleFormSubmit = (e: React.FormEvent) => {
		// stop form from submitting
		e.preventDefault()

		// add a new post to the posts state
		const newPost: Post = {
			title: newPostTitle,
			likes: 0,
		}
		setPosts([...posts, newPost])

		// clear new post title state
		setNewPostTitle("")
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

			<form onSubmit={ handleFormSubmit } className="mb-3">
				<div className="input-group mb-3">
					<input
						type="text"
						className="form-control"
						placeholder="Post title"
						onChange={e => setNewPostTitle(e.target.value)}
						value={newPostTitle}
						required
					/>

					<button
						type="submit"
						className="btn btn-light"
					>
						Create
					</button>
				</div>
				{newPostTitle.length > 0 && newPostTitle.length < 5 && (
					<div className="form-text text-warning">Title has to be at least 5 chars.</div>
				)}
			</form>

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
