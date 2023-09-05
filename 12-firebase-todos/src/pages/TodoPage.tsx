import { useState } from 'react'
import { useParams } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
// import ConfirmationModal from '../components/ConfirmationModal'
import useGetTodo from '../hooks/useGetTodo'

const TodoPage = () => {
	const [showConfirmDelete, setShowConfirmDelete] = useState(false)
	const { id } = useParams()
	const documentId = id as string

	const { data: todo, error, loading, getData: getTodo } = useGetTodo(documentId)

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
					onClick={() => console.log("Would toggle todo")}
				>
					Toggle
				</Button>

				<Link to={`/todos/${id}/edit`}>
					<Button variant="warning">Edit</Button>
				</Link>

				{/* <Button
					variant="danger"
					onClick={() => setShowConfirmDelete(true)}
				>
					Delete
				</Button> */}
			</div>

			{/* <ConfirmationModal
				show={showConfirmDelete}
				onCancel={() => setShowConfirmDelete(false)}
				onConfirm={() =>
					console.log("Would delete todo with id:", todoId)
				}
			>
				U SURE BRO?!
			</ConfirmationModal> */}

			<Link to="/todos">
				<Button variant="secondary">&laquo; All todos</Button>
			</Link>
		</>
	)
}

export default TodoPage
