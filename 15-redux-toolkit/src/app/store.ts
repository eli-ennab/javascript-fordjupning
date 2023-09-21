import { configureStore } from '@reduxjs/toolkit'
import accountReducer from '../features/account/AccountSlice'

export const store = configureStore({
	reducer: {
		account: accountReducer,
	},
})

// Interfer the RootState and AppDispatch types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch