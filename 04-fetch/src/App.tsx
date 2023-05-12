import { useEffect, useState } from 'react'
import './assets/scss/App.scss'

interface IResource {
	id: number
	title: string
}

function App() {
	const [resource, setResource] = useState('')
	const [data, setData] = useState<IResource[]>([])
	const [loading, setLoading] = useState(true)

	// fetch data with async await
	useEffect(() => {

		setLoading(false)
		console.log("loading?", loading)

		if (!resource) {
			return
		}


		const fetchData = async () => {
			// fetch resource
			const res = await fetch(`https://jsonplaceholder.typicode.com/${resource}`)

			if (res.status === 404) {
				setData([])
				setLoading(false)
				console.log(loading)
				return
			}

			setLoading(true)
			console.log("loading?", loading)

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
				<button onClick={() => setResource('tra$h')} className="btn btn-dark">Tra$h</button>
			</div>

			{!loading && (
					<p>There are no {resource}</p>
				)
			}

			{resource && loading && (
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
