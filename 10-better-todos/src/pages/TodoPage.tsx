import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { PartialTodo, Todo } from '../types/TodosAPI.types'
import * as TodosAPI from '../services/TodosAPI'
import ConfirmationModal from '../components/ConfirmationModal'

const TodoPage = () => {
	const queryClient = useQueryClient()
	const [showConfirmDelete, setShowConfirmDelete] = useState(false)
	const navigate = useNavigate()
	const { id } = useParams()
	const todoId = Number(id)

	const {
		data: todo,
		isError,
		refetch: getTodo,
	} = useQuery(
		['todo', { id: todoId }],
		() => TodosAPI.getTodo(todoId),
	)

	const deleteTodo = useMutation({
		mutationFn: () => TodosAPI.deleteTodo(todoId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['todo', { id: todoId }] })
			queryClient.invalidateQueries({ queryKey: ['todos'] })
			setTimeout(() => navigate('/todos?deleted=true', {
				replace: true,
				}
			))
		},
	})

	const toggleTodo = useMutation({
		mutationFn: (todo: PartialTodo) => TodosAPI.updateTodo(todoId, { completed: !todo.completed }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['todo', { id: todoId }] })
			queryClient.invalidateQueries({ queryKey: ['todos'] })
			setTimeout(() => navigate(`/todos/${todoId}`), 2000)
		},
	})

	if (isError) {
		return (
			<Alert variant="warning">
				<h1>Something went wrong!</h1>

				<Button variant='primary' onClick={() => getTodo()}>TRY AGAIN!!!</Button>
			</Alert>
		)
	}

	return (
		<>
			{ todo &&
				<>
					<h1>{todo.title}</h1>

					<p><strong>Status:</strong> {todo.completed ? 'Completed' : 'Not completed'}</p>

					<div className="buttons mb-3">
						<Button variant='success' onClick={() => toggleTodo.mutate(todo)}>Toggle</Button>

						<Link to={`/todos/${todoId}/edit`}>
							<Button variant='warning'>Edit</Button>
						</Link>

						<Button variant='danger' onClick={() => setShowConfirmDelete(true)}>Delete</Button>
					</div>

					<ConfirmationModal
						show={showConfirmDelete}
						onCancel={() => setShowConfirmDelete(false)}
						onConfirm={() => deleteTodo.mutate()}
					>
						U SURE BRO?!
					</ConfirmationModal>
				</>
			}

			<Link to="/todos">
				<Button variant='secondary'>&laquo; All todos</Button>
			</Link>
		</>
	)
}

export default TodoPage
