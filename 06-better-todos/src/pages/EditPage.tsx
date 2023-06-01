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
	const [updateTodoTitle, setUpdateTodoTitle] = useState("")

	const handleSubmit = async (e: React.FormEvent) => {
		// stop form from submitting
		e.preventDefault()

		// create a new todo and set a new todos state
		const updatedTodo = {
			title: updateTodoTitle,
		}

		const res = await TodosAPI.updateTodo(Number(id), updatedTodo)
		console.log(res)

		// clear
		setUpdateTodoTitle("")

		// go back
		navigate(-1)
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
				variant="secondary"
				onClick={() => navigate(-1)}
				className="m-1"
				>
					Go back
			</Button>

			<Button
				variant="primary"
				type="submit"
				className="m-1"
				>
					Submit
			</Button>
	  </Form>
	)
}

export default EditPage
