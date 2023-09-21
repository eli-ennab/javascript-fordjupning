import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { Todo, TodoFormData } from "../../types/Todo.types"
import { dummyTodos } from "../../data/todos"

const initialState: Todo[] = dummyTodos

export const todoSlice = createSlice({
	name: "todos",
	initialState,
	reducers: {
		add: (state, action: PayloadAction<TodoFormData>) => {
			const newTodo = {
				id: 'ikamsdoianfdouand',
				title: action.payload.title,
				completed: action.payload.completed
			}
			state.push(newTodo)
		}
	}
})

// Action creators are generated for each reducer function
export const { add } = todoSlice.actions

// Export the reducer
export default todoSlice.reducer
