import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Todo } from '../types'
import { getTodo } from '../services/TodosAPI'
import * as TodosAPI from '../services/TodosAPI'
import ConfirmationModal from '../components/ConfirmationModal'

const TodoPage = () => {
	const [error, setError] = useState<string|null>(null)
	const [loading, setLoading] = useState(true)
	const [todo, setTodo] = useState<Todo|null>(null)
	const [showConfirmDelete, setShowConfirmDelete] = useState(false)
	const navigate = useNavigate()
	const { id } = useParams()
	const todoId = Number(id)

	const { data, isLoading, isError } = useQuery(
		['todos', todoId],
		() => getTodo(todoId),
	)

	// Delete a todo in the api
	const deleteTodo = async (todo: Todo) => {
		if (!todo.id) {
			return
		}

		// if (!window.confirm('U SURE BRO?!')) {
		// 	return
		// }

		// Delete todo from the api
		await TodosAPI.deleteTodo(todo.id)

		// Navigate user to `/todos` (using state)
		// navigate('/todos', {
		// 	replace: true,
		// 	state: {
		// 		message: `Todo "${todo.title}" was successfully deleted`,
		// 	},
		// })

		// Navigate user to `/todos` (using search params/query params)
		navigate('/todos?deleted=true', {
			replace: true,
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

	if (error) {
		return (
			<Alert variant="warning">
				<h1>Something went wrong!</h1>
				<p>{error}</p>

				<Button variant='primary' onClick={() => getTodo(todoId)}>TRY AGAIN!!!</Button>
			</Alert>
		)
	}

	return (
		<>
			{ data &&
				<>
					<h1>{data.title}</h1>

					<p><strong>Status:</strong> {data.completed ? 'Completed' : 'Not completed'}</p>

					<div className="buttons mb-3">
						<Button variant='success' onClick={() => toggleTodo(data)}>Toggle</Button>

						<Link to={`/todos/${todoId}/edit`}>
							<Button variant='warning'>Edit</Button>
						</Link>

						<Button variant='danger' onClick={() => setShowConfirmDelete(true)}>Delete</Button>
					</div>

					<ConfirmationModal
						show={showConfirmDelete}
						onCancel={() => setShowConfirmDelete(false)}
						onConfirm={() => deleteTodo(data)}
					>
						U SURE BRO?!
					</ConfirmationModal>
				</>
			}

			{ isLoading &&
				<p>Loading...</p>
			}

			{ isError &&
				<p>Error...</p>
			}

			<Link to="/todos">
				<Button variant='secondary'>&laquo; All todos</Button>
			</Link>
		</>
	)
}

export default TodoPage
