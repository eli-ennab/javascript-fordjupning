import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { createTodo as TodosAPI_createTodo } from '../services/TodosAPI'

const useCreateTodo = () => {
	const navigate = useNavigate()
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: TodosAPI_createTodo,
		onSuccess: () => {
			// invalidate any ["todos"] queries
			queryClient.invalidateQueries({ queryKey: ["todos"] })

			setTimeout(() => {
				navigate("/todos")
			}, 2000)
		}
	})
}

export default useCreateTodo
