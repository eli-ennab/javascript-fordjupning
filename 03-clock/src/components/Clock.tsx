import { useEffect, useState } from 'react'

const Clock = () => {

	const [time, setTime] = useState(() => new Date().toLocaleTimeString())

	useEffect(() => {
		// this will only be executed when the component is mounted
		// and only AFTER the component has been rendered
		console.log("Clock is mounted. Starting clock...")

		const intervalId = setInterval(() => {
			setTime(new Date().toLocaleTimeString())
			console.log("Tick")
		}, 1000)

		return () => {
			// this will be executed when the component is about to be unmounted
			console.log("Clock is unmounted. Stopping clock...")
			clearInterval(intervalId)
		}
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
