import { useEffect, useState } from 'react'
import './assets/scss/App.scss'

function App() {

	const [time, setTime] = useState(() => new Date().toLocaleTimeString())

	useEffect(() => {
		console.log("Starting clock...")
		setInterval(() => {
			setTime(new Date().toLocaleTimeString())
		}, 1000)
		console.log("Tick")
	}, [])

	useEffect(() => {
		document.title = time
	}, [time])

	return (
		<div className="container">
			<div className="display-1 text-center">
				{time}
			</div>
		</div>
	)
}

export default App
