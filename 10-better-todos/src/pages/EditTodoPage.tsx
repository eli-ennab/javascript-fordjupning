import { useEffect, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useNavigate, useParams } from 'react-router-dom'
import * as TodosAPI from '../services/TodosAPI'

const EditTodoPage = () => {
	const queryClient = useQueryClient()
	const [newTodoTitle, setNewTodoTitle] = useState("")
	const navigate = useNavigate()
	const { id } = useParams()
	const todoId = Number(id)

	const {
		data: todo,
		isError,
		isLoading,
		refetch: getTodo,
	} = useQuery(["todo", { id: todoId }], () => TodosAPI.getTodo(todoId))

	const updateTodoTitleMutation = useMutation({
		mutationFn: (newTodoTitle: string) => TodosAPI.updateTodo(todoId, {
			title: newTodoTitle,
		}),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['todo', { id: todoId }] })
			queryClient.invalidateQueries({ queryKey: ['todos'] })
			navigate(`/todos/${todoId}`)
		},
	})

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		if (!todo || !todo.id) {
			return
		}

		// Update a todo in the api
		updateTodoTitleMutation.mutateAsync(newTodoTitle)
	}

	useEffect(() => {
		if (todo) {
			setNewTodoTitle(todo.title)
		}
	}, [todo])

	if (isError) {
		return (
			<Alert variant="warning">
				<h1>Something went wrong!</h1>
				<p>It wasn't me that did something /the server</p>

				<Button variant='primary' onClick={() => getTodo()}>TRY AGAIN!!!</Button>
			</Alert>
		)
	}

	if (isLoading || !todo) {
		return (<p>Loading...</p>)
	}

	return (
		<>
			<h1>Edit: {todo?.title}</h1>

			<Form onSubmit={handleSubmit} className='mb-4'>
				<Form.Group className="mb-3" controlId="title">
					<Form.Label>Title</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter the new title"
						onChange={(e) => setNewTodoTitle(e.target.value)}
						value={newTodoTitle}
					/>
				</Form.Group>

				<Button variant="light" type="submit">
					Save
				</Button>
			</Form>

			<Button variant='dark' onClick={() => navigate(-1)}>&laquo; Go back</Button>
		</>
	)
}

export default EditTodoPage
