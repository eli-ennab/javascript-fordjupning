import { useState } from 'react'
import './App.css'

const App = () => {

	const [msg, setMsg] = useState("I am stateful.")

	const [clicks, setClicks] = useState(0)

	const handleButtonClick = () => {
		setMsg("I am rendered.")
		setClicks(clicks + 1)
	}

	return (
		<div className="App">
			<h1>React Basics</h1>

			<h2>{msg}</h2>

			<p>You have clicked the button {clicks} times.</p>

			<button onClick={handleButtonClick} className="btn btn-dark btn-lg">Click me</button>
		</div>
	)
}

export default App
