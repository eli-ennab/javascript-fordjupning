import { useState } from 'react'
import './App.css'

type Post = {
	id: number
	title: string
	likes: number
}

const App = () => {
	const [msg, setMsg] = useState("I am stateful.")
	const [clicks, setClicks] = useState(0)
	const [posts, setPosts] = useState<Post[]>([
		{
			id: 1,
			title: "React rocks",
			likes: 1337
		},
		{
			id: 2,
			title: "JSX rocks even more",
			likes: 45
		},
		{
			id: 3,
			title: "TypeScript",
			likes: 1000
		}
	])

	const handleButtonClick = () => {
		setMsg("I am rendered.")
		setClicks(clicks + 1)
	}

	return (
		<div className="App">
			<h1>React Basics</h1>

			<h2>{msg}</h2>

			<p>You have clicked the dark button {clicks} times.</p>

			<button onClick={handleButtonClick} className="btn btn-dark btn-lg">Click me</button>

			<button onClick={ () => { setMsg('You made me yellow.')} } className="btn btn-warning btn-lg">Try me</button>

			<hr />

			<h2>Posts</h2>

			<ul className="list-group list-group-flush">
				{
					posts.map( (post, index) => (<li className="list-group-item" key={index}>{post.title}<span className="badge badge-primary badge-pill">{post.likes}</span></li>))
				}
			</ul>

		</div>
	)
}

export default App
