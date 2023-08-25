import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import * as TodosAPI from '../services/TodosAPI'

const useUpdateTodo = (todoId: number) => {
	const queryClient = useQueryClient()
	const navigate = useNavigate()

	return useMutation({
		mutationFn: (newTodoTitle: string) => TodosAPI.updateTodo(todoId, {
			title: newTodoTitle,
		}),
		onSuccess: (updatedTodo) => {
			queryClient.setQueryData(['todo', { id: todoId }], updatedTodo)

			queryClient.refetchQueries({ queryKey: ["todos"] })

			navigate(`/todos/${todoId}`)
		},
	})
}

export default useUpdateTodo
