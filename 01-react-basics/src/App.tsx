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
	const [salary, setSalary] = useState(10)
	const [showSalary, setShowsalary] = useState(false)

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

	const handleAddLike = (post: Post) => {
		console.log("adding like to this post:", post)
		post.likes++
		console.log("posts likes are now:", post.likes)

		setPosts([...posts])
	}

	const handleButtonClick = () => {
		setMsg("I am rendered.")
		// setClicks(clicks + 1)
		setClicks( (prevValue) => { return prevValue + 1 } )	// prevValue = 0, return 1
		setClicks( (prevValue) => { return prevValue + 1 } )	// prevValue = 1, return 2
	}

	const handleChangeSalary = (amount: number) => {
		if (salary + amount < 5) {
			return setSalary(5)
		}

		setSalary(salary + amount)
	}

	return (
		<div className="App">
			<h1>React Basics</h1>

			<h2>{msg}</h2>

			<p>You have clicked the dark button {clicks} times.</p>

			<button onClick={handleButtonClick} className="btn btn-dark btn-lg">Click me</button>

			<button onClick={ () => { setMsg('You made me yellow.')} } className="btn btn-warning btn-lg">Try me</button>

			<hr />

			<button className="btn btn-light" onClick={() => setShowsalary(!showSalary)}>{showSalary ? "Hide salary" : "Show salary"}</button>

			{ showSalary && (
				<>
					<h3>Salary per hour: {salary} &euro;</h3>

					{salary < 10 && (
					<div className="alert alert-warning">You are not getting paid enough.</div>
					)}

					<div className="buttons">
						<div className="mb-1">
							<button className="btn btn-dark btn-lg m-1" onClick={ () => { handleChangeSalary(1) } }>
								Raise 1 &euro;
							</button>
							<button className="btn btn-dark btn-lg m-1" onClick={ () => { handleChangeSalary(-1) } }>
								Decrease 1 &euro;
							</button>
						</div>
						<div className="mb-1">
							<button className="btn btn-dark btn-lg m-1" onClick={ () => { handleChangeSalary(5) } }>
								Raise 5 &euro;
							</button>
							<button className="btn btn-dark btn-lg m-1" onClick={ () => { handleChangeSalary(-5) } }>
								Decrease 5 &euro;
							</button>
						</div>
					</div>
				</>
			)}

			<hr />

			<h2>Posts</h2>

			<ul className="list-group list-group-flush">
				{
					posts.map( (post, index) => (
						<li key={index}>
							{post.title} ({post.likes} likes)
							<button
								className="btn btn-sm btn-heart"
								onClick={() => { handleAddLike(post)}}
							>❤</button>
						</li>
					))
				}
			</ul>

		</div>
	)
}

export default App
