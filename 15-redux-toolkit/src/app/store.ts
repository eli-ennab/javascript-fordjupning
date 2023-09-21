import { configureStore } from '@reduxjs/toolkit'
import accountReducer from '../features/account/accountSlice'
import todoReducer from '../features/todos/todosSlice'

export const store = configureStore({
	reducer: {
		account: accountReducer,
		todos: todoReducer
	},
})

// Interfer the RootState and AppDispatch types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
