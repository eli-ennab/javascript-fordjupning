import { collection, getDocs } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import AddNewTodoForm from "../components/AddNewTodoForm"
import { NewTodo, Todo, Todos } from "../types/Todo.types"
import ListGroup from "react-bootstrap/ListGroup"
import { db } from '../services/firebase'

const TodosPage = () => {
	const [todos, setTodos] = useState<Todos|null>(null)

	// Create a new todo in the API
	const addTodo = (todo: NewTodo) => {
		console.log("Would add a new todo:", todo)
	}

	// Get todos
	const getTodos = async () => {
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
	}

	// Get todos on component mount
	useEffect(() => {
		getTodos()
	}, [])

	return (
		<>
			<h1 className="mb-3">Todos</h1>

			<AddNewTodoForm onAddTodo={addTodo} />

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
