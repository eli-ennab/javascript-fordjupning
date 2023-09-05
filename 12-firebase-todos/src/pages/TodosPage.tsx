import { collection, getDocs } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import AddNewTodoForm from "../components/AddNewTodoForm"
import { NewTodo, Todo, Todos } from "../types/Todo.types"
import ListGroup from "react-bootstrap/ListGroup"
import Button from "react-bootstrap/Button"
import { db } from '../services/firebase'

const TodosPage = () => {
	const [todos, setTodos] = useState<Todos|null>(null)
	const [loading, setLoading] = useState(true)

	// Create a new todo in the API
	const addTodo = (todo: NewTodo) => {
		console.log("Would add a new todo:", todo)
	}

	// Get todos
	const getTodos = async () => {
		setLoading(true)

		// Get reference to collection 'todos'
		const colRef = collection(db, 'todos')

		// Get query snapshot of collecton
		const snapshot = await getDocs(colRef)

		// Loop over all docs
		const data = snapshot.docs.map(doc => {
			return {
				_id: doc.id,
				...doc.data(),
			} as Todo
		})

		setTodos(data)
		setLoading(false)
	}

	// Get todos on component mount
	useEffect(() => {
		getTodos()
	}, [])

	return (
		<>
			<div className="d-flex justify-content-between align-items-center">
				<h1 className="mb-3">Todos</h1>
				<Button
					variant="dark"
					onClick={() => getTodos()}
				>
						Refresh
				</Button>
			</div>

			<AddNewTodoForm onAddTodo={addTodo} />

			{loading && (
				<p>Loading todos...</p>
			)}

			{todos && todos.length > 0 && (
				<ListGroup className="todolist">
					{todos.map((todo) => (
						<ListGroup.Item
							action
							as={Link}
							key={todo._id}
							className={todo.completed ? "done" : ""}
							to={`/todos/${todo._id}`}
						>
							{todo.title}
						</ListGroup.Item>
					))}
				</ListGroup>
			)}

			{todos && todos.length === 0 && (
				<p>Yayyy, you have 0 todos to do</p>
			)}
		</>
	)
}

export default TodosPage
