import { useEffect, useState } from 'react'
import { getResource } from './services/API'
import { IResource } from './types'
import './assets/scss/App.scss'
import ResourceList from './components/ResourceList'

function App() {
	const [resource, setResource] = useState('')
	const [data, setData] = useState<IResource[]>([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')

	useEffect(() => {
		const fetchData = async () => {
			if (!resource) {
				return
			}

			// empty data and error before fetching new
			// and set loading
			setError('')
			setData([])
			setLoading(true)

			try {
				const payload = await getResource(resource)

				// update data state with resource payload
				setData(payload)
				setLoading(false)

			} catch (e: any) {
				setError(e.toString())
				setLoading(false)

			}
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

			<ResourceList
				error={error}
				loading={loading}
				resource={resource}
				data={data}
			/>
		</div>
	)
}

export default App
