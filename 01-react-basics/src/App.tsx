import { useState } from 'react'
import './App.css'

const App = () => {

	const [msg, setMsg] = useState("I am stateful")

	const handleButtonClick = () => {
		console.log('You clicked me.')
		setMsg("I am rendered")
	}

	return (
		<div className="App">
			<h1>React Basics</h1>

			<h2>{msg}</h2>

			<p>You have clicked the button 0 times.</p>

			<button onClick={handleButtonClick} className="btn btn-dark btn-lg">Click me</button>
		</div>
	)
}

export default App
