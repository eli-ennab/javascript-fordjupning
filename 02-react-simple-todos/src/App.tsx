import { useState } from 'react'
import './App.css'

type Todo = {
	title: string
	completed: boolean
}

function App() {

	const [todos, setTodos] = useState<Todo[]>([
		{ title: "my first todo", completed: false },
		{ title: "my second todo", completed: false },
		{ title: "my third todo", completed: true }
	])

	const [newTodoTitle, setNewTodoTitle] = useState("")

	const createTodo = (e: React.FormEvent) => {
		e.preventDefault()

		const newTodo: Todo = {
			title: newTodoTitle,
			completed: false,
		}
		setTodos([...todos, newTodo])

		setNewTodoTitle("")
	}

  return (
	<div className="App">

	<h1>Todos</h1>

	<form>
		<div className="input-group mb-3">
			<input
				type="text"
				className="form-control"
				placeholder="write your todo title here..."
				onChange={(e) => { setNewTodoTitle(e.target.value) }}
				value={newTodoTitle}
				/>
			<button
				className="btn btn-outline-secondary"
				type="button"
				onClick={createTodo}
				>Create todo
			</button>
		</div>
	</form>


		<ul className="list-group">
			{
				todos.map( (todo, index) =>
					<li
						key={index}
						className="todo">
						{todo.title} {todo.completed ? "✓" : "×"}
						<button
							className="btn btn-dark btn-toggle">
							{!todo.completed ? "mark as completed" : "mark as not completed"}
						</button>
						<button
							className="btn btn-grey btn-delete">
							delete
						</button>
					</li>
				)
			}
		</ul>
	</div>
  )
}

export default App
