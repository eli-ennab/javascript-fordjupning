import { useEffect, useState } from 'react'
import './assets/scss/App.scss'
import Clock from './components/Clock'

function App() {

	const [showClock, setShowClock] = useState(false)

	return (
		<div className="container">
				<button
					onClick={() => setShowClock(!showClock)}
					className="btn btn-light"
						>Show/Hide clock
				</button>

			{showClock && <Clock />}
		</div>
	)
}

export default App
