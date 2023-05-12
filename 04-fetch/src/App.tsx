import { useEffect, useState } from 'react'
import './assets/scss/App.scss'

interface IResource {
	id: number
	title: string
}

function App() {
	const [resource, setResource] = useState('')
	const [data, setData] = useState<IResource[]>([])

	// fetch data with .then
	// useEffect(() => {
	// 	fetch(`https://jsonplaceholder.typicode.com/${resource}`)
	// 		.then(res => res.json())
	// 		.then(payload => setData(payload))
	// }, [resource])

	// fetch data with async await
	useEffect(() => {

		if (!resource) {
			return
		}

		const fetchData = async () => {
			// fetch resource
			const res = await fetch(`https://jsonplaceholder.typicode.com/${resource}`)

			// parse response as json
			const payload = await res.json() as IResource[]

			// update data state with resource payload
			setData(payload)
		}

		// call function
		fetchData()
	}, [resource])

	return (
		<div className="container">
			<h1 className="mb-3">Fetch</h1>

			<div className="d-flex justify-content-between">
				<button onClick={() => setResource('albums')} className="btn btn-dark">Albums</button>
				<button onClick={() => setResource('photos')} className="btn btn-dark">Photos</button>
				<button onClick={() => setResource('posts')} className="btn btn-dark">Posts</button>
				<button onClick={() => setResource('todos')} className="btn btn-dark">Todos</button>
			</div>

			{resource && (
				<>
					<h2>{resource}</h2>
					<p>There are {data.length} {resource}.</p>
					<ol>
						{data.map(item => (
							<li key={item.id}>{item.title}</li>
						))}
					</ol>
				</>
			)}
		</div>
	)
}

export default App
