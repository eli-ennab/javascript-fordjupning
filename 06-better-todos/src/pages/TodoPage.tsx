import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import { Link, useParams } from 'react-router-dom'
import { Todo } from '../types'
import * as TodosAPI from '../services/TodosAPI'

const TodoPage = () => {
	const [todo, setTodo] = useState<Todo | null>(null)
	const { id } = useParams()
	const todoId = Number(id)

	const getTodo = async (id: number) => {
		// call TodosAPI
		const data = await TodosAPI.getTodo(id)

		// update todo state with data
		setTodo(data)
	}

		/*
	// Delete a todo in the api
	const deleteTodo = async (todo: Todo) => {
		if (!todo.id) {
			return
		}

		// Delete todo from the api
		await TodosAPI.deleteTodo(todo.id)

		// Get all the todos from the api
		getTodos()
	}
	*/

	// Toggle the completed status of a todo in the api
	const toggleTodo = async (todo: Todo) => {
		if (!todo.id) {
			return
		}

		// Update a todo in the api
		await TodosAPI.updateTodo(todo.id, {
			completed: !todo.completed
		})

		// Get all the todos from the api
		getTodo(todo.id)
	}

	useEffect(() => {
		if (typeof todoId !== "number") {
			return
		}
		getTodo(todoId)
	}, [todoId])

	if (!todo) {
		return (<p>Loading...</p>)
	}

	return (
		<>
			<h1>{todo.title}</h1>

			<Button
				variant='info'
				size='lg'
				className='m-3'
				onClick={ () => toggleTodo(todo) }
				>
					Toggle todo
				</Button>

			<Button
				variant='danger'
				size='lg'
				className='m-3'
				onClick={ () => (console.log('you tried to delete')) }
				>
					Delete todo
				</Button>

			<p><strong>Status:</strong> { todo.completed ? 'Completed' : 'Not completed'}</p>

			<Link to="/todos">
				<Button variant='secondary'>&laquo; All todos</Button>
			</Link>
		</>
	)
}

export default TodoPage
