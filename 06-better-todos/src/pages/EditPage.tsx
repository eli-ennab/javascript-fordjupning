import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import * as TodosAPI from '../services/TodosAPI'

const EditPage = () => {
	const location = useLocation()
	const navigate = useNavigate()
	const { id } = useParams()
	const todoId = Number(id)
	const [updateTodoTitle, setUpdateTodoTitle] = useState("")

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		const updatedTodo = {
			title: updateTodoTitle,
		}

		await TodosAPI.updateTodo(todoId, updatedTodo)

		setUpdateTodoTitle("")

		navigate(`/todos/${todoId}`, {
			state: {
				message: `Todo was updated successfully.`,
			},
		})
	}

	return (
		<Form onSubmit={handleSubmit}>
			<Form.Group className="mb-3">
				<Form.Label>Edit your todo title here</Form.Label>
				<Form.Control
					type="text"
					placeholder={location.state.message}
					onChange={e => setUpdateTodoTitle(e.target.value)}
					value={updateTodoTitle}
				/>
			</Form.Group>

			<Button
				variant="light"
				onClick={() => navigate(-1)}
				className="m-1"
				>
					Go back
			</Button>

			<Button
				variant="dark"
				type="submit"
				className="m-1"
				>
					Submit
			</Button>
	  	</Form>
	)
}

export default EditPage
