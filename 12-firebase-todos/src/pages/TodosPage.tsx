import { Link } from "react-router-dom"
import AddNewTodoForm from "../components/AddNewTodoForm"
import { NewTodo } from "../types/Todo.types"
import ListGroup from "react-bootstrap/ListGroup"
import Button from "react-bootstrap/Button"
import useGetTodos from '../hooks/useGetTodos'

const TodosPage = () => {
	// Create a new todo in the API
	const addTodo = (todo: NewTodo) => {
		console.log("Would add a new todo:", todo)
	}

	// Get todos
	const { todos, loading, getTodos } = useGetTodos()

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
