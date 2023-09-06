import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm, SubmitHandler } from 'react-hook-form'
import { PartialTodo } from '../types/Todo.types'
import useGetTodo from '../hooks/useGetTodo'

const EditTodoPage = () => {
	const navigate = useNavigate()
	const { id } = useParams()
	const documentId = id as string

	const { editData: editTodo } = useGetTodo(documentId)

	const { register, handleSubmit, reset } = useForm<PartialTodo>()
	const onSubmit: SubmitHandler<PartialTodo> = (newTodoTitle) => {
		editTodo(newTodoTitle)

		reset(newTodoTitle)
	}


	return (
		<>
			<h1>Edit: {``}</h1>

			<Form onSubmit={handleSubmit(onSubmit)} className='mb-4'>
				<Form.Group className="mb-3" controlId="title">
					<Form.Label>Title</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter the new title"
						{...register("title")}
					/>
				</Form.Group>

				<Button variant="primary" type="submit" disabled={false}>
					Save
				</Button>
			</Form>

			<Button variant='secondary' onClick={() => navigate(-1)}>&laquo; Go back</Button>
		</>
	)
}

export default EditTodoPage
