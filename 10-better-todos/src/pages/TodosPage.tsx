import { NewTodo } from '../types/TodosAPI.types'
import Alert from 'react-bootstrap/Alert'
import ListGroup from 'react-bootstrap/ListGroup'
import { Link, useLocation } from 'react-router-dom'
import AddNewTodoForm from '../components/AddNewTodoForm'
import AutoDismissingAlert from '../components/AutoDismissingAlert'
import useTodos from '../hooks/useTodos'
import useCreateTodo from '../hooks/useCreateTodo'

const TodosPage = () => {
	const location = useLocation()
	const deletedTodo = location.state?.deleted ?? false

	const {
		data: todos,
		isError,
	} = useTodos()

	const createTodoMutation = useCreateTodo()

	// Create a new todo in the API
	const addTodo = async (todo: NewTodo) => {
		createTodoMutation.mutate(todo)
	}

	// // sort alphabetically by title
	// data.sort((a, b) => a.title.localeCompare(b.title))

	// // sort by completed status
	// data.sort((a, b) => Number(a.completed) - Number(b.completed))

	return (
		<>
			<h1 className="mb-3">Todos</h1>

			<AddNewTodoForm onAddTodo={addTodo} />

			{location.state?.message && (
				<Alert variant="success">
					{location.state.message}
				</Alert>
			)}

			{deletedTodo && (
				<AutoDismissingAlert variant="success" hideAfter={3}>
					Todo was successfully deleted
				</AutoDismissingAlert>
			)}

			{isError && (
				<Alert variant="danger">
					An error occured while fetching todos.
				</Alert>
			)}

			{todos && todos.length > 0 && (
				<ListGroup className="todolist">
					{todos.map(todo => (
						<ListGroup.Item
							action
							as={Link}
							key={todo.id}
							className={todo.completed ? 'done' : ''}
							to={`/todos/${todo.id}`}
						>
							{todo.title}
						</ListGroup.Item>
					))}
				</ListGroup>
			)}

			{todos && todos.length === 0 && (
				<p>You have 0 todos to do.</p>
			)}
		</>
	)
}

export default TodosPage
