import { useNavigate, useParams } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
import useGetTodo from '../hooks/useGetTodo'
import { toast } from "react-toastify"

const TodoPage = () => {
	const { id } = useParams()
	const documentId = id as string
	const navigate = useNavigate()

	const { data: todo, error, loading, getData: getTodo, toggleData: toggleTodo, deleteData: deleteTodo } = useGetTodo(documentId)

	if (loading || !todo) {
		return <p>Loading todo...</p>
	}

	return (
		<>

			<div className="d-flex justify-content-between align-items-center">
				<h1 className="mb-3">{todo.title}</h1>
				<Button
					variant="dark"
					onClick={() => getTodo(documentId)}
				>
						Refresh
				</Button>
			</div>

			<p>
				<strong>Status:</strong>{" "}
				{todo.completed ? "Completed" : "Not completed"}
			</p>

			<div className="buttons mb-3">
				<Button
					variant="success"
					onClick={() => toggleTodo()}
				>
					Toggle
				</Button>

				<Link to={`/todos/${id}/edit`}>
					<Button variant="warning">Edit</Button>
				</Link>

				<Button
					variant="danger"
					onClick={() => {
						deleteTodo();
						navigate("/todos");
						toast.info("Todo was deleted successfully")
					}}
				>
					Delete
				</Button>
			</div>

			<Link to="/todos">
				<Button variant="secondary">&laquo; All todos</Button>
			</Link>
		</>
	)
}

export default TodoPage
