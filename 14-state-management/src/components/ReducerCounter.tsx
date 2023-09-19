import { Reducer, useReducer } from 'react'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'

enum PointsActionTypes {
	INCREMENT = "increment",
	DECREMENT = "decrement",
}

type PointsState = {
	points: number
	game: string
}

type PointsAction = {
	type: PointsActionTypes
}

const initialState: PointsState = {
	points: 0,
	game: "Hackers vs Plebs"
}

/**
 * Reduce a new state based on the action and current state
 *
 * @param state Current state
 * @param action Action to take on the state
 * @returns New state
 */
const pointsReducer = (state: PointsState, action: PointsAction) => {
	// state = current state
	// action = { type: "increment" }

	switch (action.type) {
		case PointsActionTypes.DECREMENT:
			return {
				...state,
				points: state.points - 1,
			}

		case PointsActionTypes.INCREMENT:
			return {
				...state,
				points: state.points + 1,
			}

		default:
			return state
	}
}

const decreasePoints = () => {
	return { type: PointsActionTypes.DECREMENT }
}

const increasePoints = () => {
	return { type: PointsActionTypes.INCREMENT }
}


const ReducerCounter = () => {
	const [state, dispatch] = useReducer<Reducer<PointsState, PointsAction>>(pointsReducer, initialState)

	return (
		<div className="counter">
			{/* Decrease points */}
			<ButtonGroup>
				<Button
					variant="warning"
					onClick={() => null}
				>-10</Button>
				<Button
					variant="warning"
					onClick={() => null}
				>-5</Button>
				<Button
					variant="warning"
					onClick={() => dispatch( decreasePoints() )}
				>-</Button>
			</ButtonGroup>

			{/* Current points */}
			<span className="points">{state.points}</span>

			{/* Increase points */}
			<ButtonGroup>
				<Button
					variant="success"
					onClick={() => dispatch( increasePoints() )}
				>+</Button>
				<Button
					variant="success"
					onClick={() => null}
				>+5</Button>
				<Button
					variant="success"
					onClick={() => null}
				>+10</Button>
			</ButtonGroup>

			{/* Reset state */}
			<Button
				className="ms-3"
				variant="danger"
				onClick={() => null}
			>🧹</Button>
		</div>
	)
}

export default ReducerCounter
