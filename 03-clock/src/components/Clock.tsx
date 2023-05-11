import { useEffect, useState } from 'react'

const Clock = () => {

	const [time, setTime] = useState(() => new Date().toLocaleTimeString())

	useEffect(() => {
		console.log("Starting clock...")
		setInterval(() => {
			setTime(new Date().toLocaleTimeString())
			console.log("Tick")
		}, 1000)
	}, [])

	useEffect(() => {
		document.title = time
	}, [time])

	return (
		<div className="display-1 text-center">
			{time}
		</div>
	)
}

export default Clock
