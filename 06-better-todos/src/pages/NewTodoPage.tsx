import { Todo } from '../types'
import AddNewTodoForm from '../components/AddNewTodoForm'
import Alert from 'react-bootstrap/Alert'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import * as TodosAPI from '../services/TodosAPI'

const NewTodoPage = () => {
	const navigate = useNavigate()
	const [isTodoCreated, setIsTodoCreated] = useState(false)

	// Create a new todo in the API
	const addTodo = async (todo: Todo) => {

		try {
			await TodosAPI.createTodo(todo)

			setIsTodoCreated(true)

			setTimeout(() => {
				navigate('/todos')
			}, 2000)
		} catch (e: any) {

			setIsTodoCreated(false)

			alert("Something went wrong")
		}
	}

	return (
		<>
			<AddNewTodoForm onAddTodo={addTodo} />

			{isTodoCreated &&
				<Alert variant={'success'}>Todo was created successfully! Redirecting to all todos.</Alert>
			}
		</>
	)
}

export default NewTodoPage
