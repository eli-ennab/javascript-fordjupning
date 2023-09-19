import { Reducer, useReducer } from 'react'
import Button from 'react-bootstrap/Button'

type PointsState = {
	points: number
}

type PointsAction = {
	type: "increment" | "decrement"
}

const initialState: PointsState = {
	points: 0
}

const pointsReducer = (state: PointsState, action: PointsAction) => {		// takes current state and what (action) we want to do with the state
	// state = current state, action = { type: "increment" }
	// console.log("Current state:", state)
	// console.log("Action:", action)

	switch (action.type) {
		case "decrement":
			console.log("Would decrement points", action)
			return {
				points: state.points - 1	// returning a new state
			}

		case "increment":
			console.log("Would increment points", action)
			return {
				points: state.points + 1	// returning a new state
			}

		default:
			return state
	}
}

const ReducerCounter = () => {
	const [state, dispatch] = useReducer<Reducer<PointsState, PointsAction>>(pointsReducer, initialState)	// dispatch modifies state

	return (
		<div className="counter">
			<Button
				variant="warning"
				onClick={() => dispatch({ type: "decrement" })}>
					-
			</Button>

			<span className="points">{state.points}</span>

			<Button
				variant="success"
				onClick={() => dispatch({ type: "increment" })}>
					+
			</Button>
		</div>
	)
}

export default ReducerCounter
