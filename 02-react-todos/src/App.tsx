import { useEffect, useState } from 'react'
import { Todo, Todos } from './types'
import './assets/scss/App.scss'
import TodoCounter from './components/TodoCounter'
import AddNewTodoForm from './components/AddNewTodoForm'
import TodoList from './components/TodoList'
import * as TodosAPI from './services/TodosAPI'

function App() {
	const [todos, setTodos] = useState<Todos>([])

	const unfinishedTodos = todos.filter(todo => !todo.completed)
	const finishedTodos = todos.filter(todo => todo.completed)

	const getTodos = async () => {
		const data = await TodosAPI.getTodos()
		setTodos(data)
	}

	const addTodo = async (todo: Todo) => {
		setTodos([...todos, await TodosAPI.createTodo(todo)])
	}

	const deleteTodo = async (todoToDelete: Todo) => {
		setTodos([...todos, await TodosAPI.deleteTodo(todoToDelete)])
	}

	const toggleTodo = async(todo: Todo) => {
		todo.completed = !todo.completed
		await TodosAPI.updateTodo(todo)
		setTodos([...todos])
	}

	// fetch todos when app is being mounted
	// and when todo is added, toggled or deleted
	useEffect(() => {
		getTodos()
	}, [todos.length, finishedTodos.length])

	return (
		<div className="container">
			<h1 className="mb-3">React Simple Todos</h1>

			<AddNewTodoForm onAddTodo={addTodo} />

			{todos.length > 0 && (
				<>
					<h3>not completed todos</h3>
					<TodoList
						onToggle={toggleTodo}
						onDelete={deleteTodo}
						todos={unfinishedTodos}
					/>

					<h3>completed todos</h3>
					<TodoList
						onToggle={toggleTodo}
						onDelete={deleteTodo}
						todos={finishedTodos}
					/>

					<TodoCounter finished={finishedTodos.length} total={todos.length} />
				</>
			)}

			{todos.length === 0 && (
				<p>You have no todos.</p>
			)}

		</div>
	)
}

export default App

