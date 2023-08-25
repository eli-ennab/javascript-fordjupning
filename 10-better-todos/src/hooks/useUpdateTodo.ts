import { useMutation, useQueryClient } from '@tanstack/react-query'
import * as TodosAPI from '../services/TodosAPI'
import { PartialTodo, Todo } from '../types/TodosAPI.types'

const useUpdateTodo = (
	todoId: number,
	onSuccess: (todo: Todo) => void = () => { return }
) => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (data: PartialTodo) => TodosAPI.updateTodo(todoId, data),
		onSuccess: (updatedTodo) => {
			queryClient.setQueryData(['todo', { id: todoId }], updatedTodo)

			queryClient.refetchQueries({ queryKey: ["todos"] })

			onSuccess(updatedTodo)
		},
	})
}

export default useUpdateTodo
