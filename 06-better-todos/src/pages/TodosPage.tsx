import { useEffect, useState } from 'react'
import { Todos } from '../types'
import Alert from 'react-bootstrap/Alert'
import ListGroup from 'react-bootstrap/ListGroup'
import { Link, useLocation } from 'react-router-dom'
import * as TodosAPI from '../services/TodosAPI'

const TodosPage = () => {
	const [todos, setTodos] = useState<Todos>([])
	const location = useLocation()

	// Get todos from api
	const getTodos = async () => {
		const data = await TodosAPI.getTodos()

		data.sort((a, b) => a.title.localeCompare(b.title))

		data.sort((a, b) => Number(a.completed) - Number(b.completed))

		setTodos(data)
	}

	// fetch todos when App is being mounted
	useEffect(() => {
		getTodos()
	}, [])

	return (
	<>
		<h1 className="mb-3">Todos</h1>

		{location.state?.message && (
			<Alert variant="success">
				{location.state.message}
			</Alert>
		)}

		{todos.length > 0 && (
			<>
				<ListGroup className="todolist p-2">
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
						))
					}
				</ListGroup>
			</>
		)}

		{todos.length === 0 && (
			<p>You have 0 todos to do</p>
		)}
	</>
	)
}

export default TodosPage
