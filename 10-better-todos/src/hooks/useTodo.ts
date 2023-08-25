import { useQuery } from '@tanstack/react-query'
import { getTodo as TodosAPI_getTodo } from '../services/TodosAPI'

const useTodo = (todoId: number, enabled = true) => {
	return useQuery(
		["todo", { id: todoId }],
		() => TodosAPI_getTodo(todoId),
		{
			enabled
		}
	)
}

export default useTodo
