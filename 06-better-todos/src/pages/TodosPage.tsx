import { useEffect, useState } from 'react'
import { Todo, Todos } from '../types'
import ListGroup from 'react-bootstrap/ListGroup'
import { Link } from 'react-router-dom'
import * as TodosAPI from '../services/TodosAPI'

const TodosPage = () => {

	const [todos, setTodos] = useState<Todos>([])

	// Get todos from api
	const getTodos = async () => {
		const data = await TodosAPI.getTodos()
		setTodos(data)
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
		getTodos()
	}
	*/

	// fetch todos when App is being mounted
	useEffect(() => {
		getTodos()
	}, [])

	return (
	<>
		<h1 className="mb-3">Todos</h1>

		{todos.length > 0 && (
			<ListGroup className="todolist">
				{todos.map(todo => (
					<ListGroup.Item
						action
						as={Link}
						className={todo.completed ? 'done' : ''}
						key={todo.id}
						to={`/todos/${todo.id}`}
					>
						{todo.title}
					</ListGroup.Item>
				))}
			</ListGroup>
		)}

		{todos.length === 0 && (
			<p>You have 0 todos to do</p>
		)}
	</>
	)
}

export default TodosPage
