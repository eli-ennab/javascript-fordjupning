import { useQuery, useMutation } from '@tanstack/react-query'
import { Todo } from '../types/TodosAPI.types'
import Alert from 'react-bootstrap/Alert'
import ListGroup from 'react-bootstrap/ListGroup'
import { Link, useLocation, useSearchParams } from 'react-router-dom'
import AddNewTodoForm from '../components/AddNewTodoForm'
import AutoDismissingAlert from '../components/AutoDismissingAlert'
import * as TodosAPI from '../services/TodosAPI'

const TodosPage = () => {
	const location = useLocation()
	const [searchParams, setSearchParams] = useSearchParams()
	const searchParams_deletedTodo = searchParams.get("deleted")
	const deletedTodo = Boolean(searchParams_deletedTodo)

	const {
		data: todos,
		isError,
		refetch: getTodos,
	} = useQuery(
		['todos'],
		TodosAPI.getTodos
	)


	// // sort alphabetically by title
	// data.sort((a, b) => a.title.localeCompare(b.title))

	// // sort by completed status
	// data.sort((a, b) => Number(a.completed) - Number(b.completed))

	const mutation = useMutation({
		mutationFn: (todo: Todo) => TodosAPI.createTodo(todo),
		onSuccess: () => getTodos(),
	})

	return (
		<>
			<h1 className="mb-3">Todos</h1>

			<AddNewTodoForm onAddTodo={(todo: Todo) => mutation.mutate(todo)} />

			{mutation.isSuccess ? <p>New todo was successfully added!</p> : null}

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
