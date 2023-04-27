import { useState } from 'react'

const ClickCounter = () => {
	const [clicks, setClicks] = useState(0)

	const handleButtonClick = () => {
		setClicks( (prevValue) => { return prevValue + 1 } )	// prevValue = 0, return 1
		setClicks( (prevValue) => { return prevValue + 1 } )	// prevValue = 1, return 2
	}

	return (
		<div>
			<p>You have clicked the dark button {clicks} times.</p>

			<button onClick={handleButtonClick} className="btn btn-dark btn-lg">Click me</button>
		</div>
	)
}

export default ClickCounter
