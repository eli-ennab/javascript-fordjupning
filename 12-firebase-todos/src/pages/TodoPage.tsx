import { doc, deleteDoc } from 'firebase/firestore'
import { useState } from "react"
import Button from "react-bootstrap/Button"
import Container from "react-bootstrap/Container"
import Image from "react-bootstrap/Image"
import { Link, useNavigate, useParams } from "react-router-dom"
import { toast } from 'react-toastify'
import ConfirmationModal from "../components/ConfirmationModal"
import useGetTodo from "../hooks/useGetTodo"
import { todosCol } from '../services/firebase'
import useAuth from '../hooks/useAuth'

const TodoPage = () => {
	const [showConfirmDelete, setShowConfirmDelete] = useState(false)
	const navigate = useNavigate()
	const { id } = useParams()

	const {
		currentUser,
	} = useAuth()

	const documentId = id as string

	const {
		data: todo,
		loading
	} = useGetTodo(documentId)

	if (!loading && todo?.user !== currentUser?.uid) {
		return <Image src={'https://media.tenor.com/hYVsWvkpdrMAAAAC/you-didnt-say-the-magic-word-ah-ah.gif'} fluid />
	}

	const deleteTodo = async () => {
		// Get a reference to the document
		const docRef = doc(todosCol, documentId)

		// Delete the document
		await deleteDoc(docRef)

		// 🥂
		toast.success("💣 Todo deleted")

		// Redirect user to todos list
		// (and replace the current history entry for this page)
		navigate('/todos', {
			replace: true,
		})
	}

	if (loading || !todo) {
		return <p>Loading todo...</p>
	}

	return (
		<Container className="py-3">
			<div className="d-flex justify-content-between align-items-start">
				<h1>{todo.title}</h1>
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

				<Button
					variant="danger"
					onClick={() => setShowConfirmDelete(true)}
				>
					Delete
				</Button>
			</div>

			<ConfirmationModal
				show={showConfirmDelete}
				onCancel={() => setShowConfirmDelete(false)}
				onConfirm={deleteTodo}
			>
				U SURE BRO?!
			</ConfirmationModal>

			<Link to="/todos">
				<Button variant="secondary">&laquo; All todos</Button>
			</Link>
		</Container>
	)
}

export default TodoPage
