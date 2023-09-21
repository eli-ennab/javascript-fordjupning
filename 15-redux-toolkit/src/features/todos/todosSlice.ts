import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { Todo, TodoFormData } from "../../types/Todo.types"
import { dummyTodos } from "../../data/todos"

const initialState: Todo[] = dummyTodos

export const todoSlice = createSlice({
	name: "todos",
	initialState,
	reducers: {
		add: (state, action: PayloadAction<Todo>) => {
			state.push(action.payload)
		},
		toggle: (state, action: PayloadAction<string>) => {
			const todo = state.find(todo => todo.id === action.payload)
			if (todo) {
				todo.completed = ! todo.completed
			}
		},
		remove: (state, action: PayloadAction<string>) => {
			return state.filter(todo => todo.id !== action.payload)
		},
	}
})

// Action creators are generated for each reducer function
export const { add, toggle, remove } = todoSlice.actions

// Export the reducer
export default todoSlice.reducer
