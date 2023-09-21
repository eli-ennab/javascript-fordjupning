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
		},
		toggle: (state, action: PayloadAction<string>) => {
			const todo = state.find(todo => todo.id === action.payload)
			if (todo) {
				todo.completed = ! todo.completed
			}
		},
		// delete: (state, action: PayloadAction<Todo>) => {
		// 	const todo = state.findIndex(todo => todo.id === action.payload.id)
		// 	if (todo !== -1) {
		// 		state.splice(todo, 1)
		// 	}
		// },
	}
})

// Action creators are generated for each reducer function
export const { add, toggle } = todoSlice.actions

// Export the reducer
export default todoSlice.reducer
