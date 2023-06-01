import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import { Link, useParams } from 'react-router-dom'
import { Todo } from '../types'
import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import * as TodosAPI from '../services/TodosAPI'

const TodoPage = () => {
	const [error, setError] = useState<string | null>(null)
	const [loading, setLoading] = useState(true)
	const [todo, setTodo] = useState<Todo | null>(null)
	const location = useLocation()
	const navigate = useNavigate()
	const { id } = useParams()
	const todoId = Number(id)

	const getTodo = async (id: number) => {
		setError(null)
		setLoading(true)

		try {
			// call TodosAPI
			const data = await TodosAPI.getTodo(id)

			// update todo state with data
			setTodo(data)

		} catch (e: any) {
			// set error
			setError(e.message)
		}

		setLoading(false)
	}

	// Delete a todo in the api
	const deleteTodo = async (todo: Todo) => {
		if (!todo.id) {
			return
		}

		if (window.confirm("Are you sure?")) {
			// Delete todo from the api
			await TodosAPI.deleteTodo(todo.id)

			// Navigate user to `/todos`
			navigate('/todos', {
				replace: true,
				state: {
					message: `Todo "${todo.title}" was successfully deleted.`,
				},
			})
		} else {
			return
		}

	}

	// Edit a todo
	const editTodo = (todo: Todo) => {
		if (!todo.id) {
			return
		}

		navigate(`/todos/${todo.id}/edit`, {
			state: {
				message: `${todo.title}`,
			},
		})
	}

	// Toggle the completed status of a todo in the api
	const toggleTodo = async (todo: Todo) => {
		if (!todo.id) {
			return
		}

		// Update a todo in the api
		const updatedTodo = await TodosAPI.updateTodo(todo.id, {
			completed: !todo.completed
		})

		// update todo state with the updated todo
		setTodo(updatedTodo)
	}

	useEffect(() => {
		if (typeof todoId !== "number") {
			return
		}
		getTodo(todoId)
	}, [todoId])


	if (error) {
		return (
			<Alert variant="warning">
				<h1>Something went wrong</h1>
				<p>{error}</p>
			</Alert>
		)
	}

	if (loading || !todo) {
		return (<p>Loading...</p>)
	}

	return (
		<>
			{location.state?.message && (
				<Alert variant="success">
					{location.state.message}
				</Alert>
			)}

			<h1>{todo.title}</h1>


			<p><strong>Status:</strong> {todo.completed ? 'Completed' : 'Not completed'}</p>

			<div className="buttons mb-3">
				<Button variant='light'
					onClick={() => toggleTodo(todo)}
					className="m-1"
					>
						Toggle
				</Button>
				<Button
					variant='dark'
					onClick={() => editTodo(todo)}
					className="m-1"
					>
						Edit
				</Button>
				<Button
					variant='danger'
					onClick={() => deleteTodo(todo)}
					className="m-1"
					>
						Delete
				</Button>
			</div>

			<Link to="/todos">
				<Button
					variant='light'
					className="m-1"
					>
						&laquo; All todos
				</Button>
			</Link>
		</>
	)
}

export default TodoPage
