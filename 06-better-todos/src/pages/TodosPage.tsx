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
