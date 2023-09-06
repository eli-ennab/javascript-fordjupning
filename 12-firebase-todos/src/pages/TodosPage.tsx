import { Link } from 'react-router-dom'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'
import useGetTodos from '../hooks/useGetTodos'
import ReactHookForm from '../components/ReactHookForm'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '../services/firebase'
import { NewTodo } from '../types/Todo.types'

const TodosPage = () => {
	const { data: todos, loading, getData: getTodos } = useGetTodos()

	console.log(todos)

	const addTodo = async (todo: NewTodo) => {
		console.log("Would add a new todo:", todo)

		await addDoc(collection(db, "todos"), {
			title: todo.title,
			completed: false,
		})
	}

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

			<ReactHookForm onAddTodo={addTodo} />

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
