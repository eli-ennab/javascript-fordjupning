import { Todo } from '../types'
import AddNewTodoForm from '../components/AddNewTodoForm'
import * as TodosAPI from '../services/TodosAPI'

const NewTodoPage = () => {
	// Create a new todo in the API
	const addTodo = async (todo: Todo) => {
		await TodosAPI.createTodo(todo)
	}

	return (
		<>
			<AddNewTodoForm onAddTodo={addTodo} />
		</>
	)
}

export default NewTodoPage
