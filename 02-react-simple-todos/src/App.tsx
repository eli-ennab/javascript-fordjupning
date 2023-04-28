import { useState } from 'react'
import './App.css'

type Todo = {
	title: string
	completed: boolean
}

function App() {

	const [todos, setTodos] = useState<Todo[]>([
		{ title: "Learn React", completed: false },
		{ title: "Learn UX", completed: false },
		{ title: "Learn TypeScript", completed: true }
	])

	const [newTodoTitle, setNewTodoTitle] = useState("")
	const completedTodos = todos.filter(todo => todo.completed)
	const notCompletedTodos = todos.filter(todo => !todo.completed)

	const handleCreateTodo = (e: React.FormEvent) => {
		e.preventDefault()

		const newTodo: Todo = {
			title: newTodoTitle,
			completed: false,
		}
		setTodos([...todos, newTodo])

		setNewTodoTitle("")
	}

	const handleDeleteTodo = (deletedTodo: Todo) => {
		setTodos(todos.filter(todos => todos !== deletedTodo))
	}

	const handleToggleTodo = (toggledTodo: Todo) => {
		toggledTodo.completed = !toggledTodo.completed
		setTodos([...todos])
	}

  return (
	<div className="App">

		<h1>Todos</h1>

		<form onSubmit={handleCreateTodo}>
			<div className="input-group mb-3">
				<input
					type="text"
					className="form-control"
					placeholder="Write the title of your todo here"
					onChange={(e) => { setNewTodoTitle(e.target.value) }}
					value={newTodoTitle}
					required
				/>
				<button
					className="btn btn-outline-secondary"
					type="submit"
						>Create todo
				</button>
			</div>
		</form>

		{(todos.length > 0 &&
			<>
				<h2>
					Not completed todos
				</h2>

				<ul className="list-group">
					{
						notCompletedTodos.map( (todo, index) =>
							<li
								key={index}
								className="todo"
								onClick={ () => {handleToggleTodo(todo)} }
								>{todo.title} {todo.completed ? <p>completed</p> : <p>not completed</p>}
								<button
									className="btn btn-grey btn-delete"
									onClick={ (e) => (e.stopPropagation(), handleDeleteTodo(todo)) }
										>delete
								</button>
							</li>
						)
					}
				</ul>

				<h2>Completed todos</h2>

				<ul className="list-group">
					{
						completedTodos.map( (todo, index) =>
							<li
								key={index}
								className="todo"
								onClick={ () => {handleToggleTodo(todo)} }
								>{todo.title} {todo.completed ? <p>completed</p> : <p>not completed</p>}
								{/* <button
									className="btn btn-dark btn-toggle">
									{!todo.completed ? "mark as completed" : "mark as not completed"}
								</button> */}
								<button
									className="btn btn-grey btn-delete"
									onClick={ (e) => (e.stopPropagation(), handleDeleteTodo(todo)) }
									>delete
								</button>
							</li>
						)
					}
				</ul>
			</>
		)}

		<hr />

		{(todos.length > 0 &&
			<div>
				<p>
					{completedTodos.length} out of {todos.length} todos are completed.
				</p>
			</div>
		)}

		{( todos.length === 0 &&
			<p>You do not have any todos.</p>
		)}
	</div>
  )
}

export default App
