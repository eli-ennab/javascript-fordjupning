import { doc, updateDoc } from 'firebase/firestore'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import useGetTodo from '../hooks/useGetTodo'
import { todosCol } from '../services/firebase'

type FormData = {
	title: string
}

const EditTodoPage = () => {
	const {
		handleSubmit,
		register,
		formState: {
			errors
		}
	} = useForm<FormData>()
	const navigate = useNavigate()
	const { id } = useParams()

	const documentId = id as string

	const {
		data: todo,
		getData: getTodo,
		loading
	} = useGetTodo(documentId)

	if (loading || !todo) {
		return <p>Loading todo...</p>
	}

	const onFormSubmit: SubmitHandler<FormData> = async (data: FormData) => {
		if (!id) {
			return
		}

		// Save to document in Firestore
		const docRef = doc(todosCol, documentId)
		toast.promise(updateDoc(docRef, data), {
			pending: "🤔 Saving todo...",
			success: "🤩 Todo was saved successfully",
			error: "😬 Unable to save todo"
		})
		/*
		toast.promise(async () => {
			await updateDoc(docRef, data)
			await getTodo()
			await new Promise(r => setTimeout(r, 1500))
		}, {
			pending: "🤔 Saving todo...",
			success: "🤩 Todo was saved successfully",
			error: "😬 Unable to save todo"
		})
		*/

		// Get the updated todo
		await getTodo()
	}

	return (
		<>
			<h1>Edit: {todo.title}</h1>

			<Form onSubmit={handleSubmit(onFormSubmit)} className='mb-4'>
				<Form.Group className="mb-3" controlId="title">
					<Form.Label>Title</Form.Label>
					<Form.Control
						type="text"
						defaultValue={todo.title}
						{...register('title', {
							required: "You have to write something at least...",
							minLength: {
								value: 5,
								message: "That's too short to be a todo, better do it right now instead!"
							},
						})}
					/>
					{errors.title && <p className="invalid">{errors.title.message ?? "Invalid value"}</p>}
				</Form.Group>

				<Button variant="primary" type="submit">
					Save
				</Button>
			</Form>

			<Button variant='secondary' onClick={() => navigate(-1)}>&laquo; Go back</Button>
		</>
	)
}

export default EditTodoPage
