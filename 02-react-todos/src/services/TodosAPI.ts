/**
 * Service for communicating with the json-server backend
 */
import axios from 'axios'
import { Todo, Todos } from '../types'

const BASE_URL = 'http://localhost:3000'

/**
 * Get all todos
 */
export const getTodos = async () => {
	const res = await axios.get(`${BASE_URL}/todos`)
	return res.data as Todos
}

/**
 * Create a new todo
 *
 * @param data Object with properties and values for the new todo
 */
export const createTodo = async (todo: Todo) => {
	const res = await axios.post(`${BASE_URL}/todos`, todo)
	return res.data as Todo
}

/**
 * Update a todo
 *
 * @param todo_id Todo to update
 * @param data Data to update todo with
 */
export const updateTodo = async (todo: Todo) => {
	const todo_id = todo.id
	const res = await axios.patch(`${BASE_URL}/todos/${todo_id}`, todo)
	return res.data as Todos
}

/**
 * Delete a todo
 *
 * @param todo_id Todo to delete
 */
export const deleteTodo = async (todo_id: number) => {
	const res = await axios.delete(`${BASE_URL}/todos/${todo_id}`)
	return res.data
}
