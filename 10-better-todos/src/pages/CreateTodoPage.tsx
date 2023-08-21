import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import Alert from 'react-bootstrap/Alert'
import { Todo } from '../types/TodosAPI.types'
import AddNewTodoForm from '../components/AddNewTodoForm'
import * as TodosAPI from '../services/TodosAPI'

const CreateTodoPage = () => {
	const navigate = useNavigate()

	const mutation = useMutation({
		mutationFn: (todo: Todo) => TodosAPI.createTodo(todo),
		onSuccess: () => setTimeout(() => { navigate("/todos") }, 2000),
	})

	return (
		<>
			<h1 className="mb-3">Create a new Todo</h1>

			<AddNewTodoForm onAddTodo={(todo: Todo) => mutation.mutate(todo)} />

			{mutation.isSuccess === true && (
				<Alert variant="success" className="mt-3">Todo created!</Alert>
			)}

			{mutation.error === false && (
				<Alert variant="warning" className="mt-3">Todo could not be created 😔</Alert>
			)}
		</>
	)
}

export default CreateTodoPage
