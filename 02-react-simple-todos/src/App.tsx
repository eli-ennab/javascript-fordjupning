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

  return (
	<div className="App">

	<h1>Todos</h1>

	<form>
		<div className="input-group mb-3">
			<input
				type="text"
				className="form-control"
				placeholder="write your todo title here..."
				/>
			<button
				className="btn btn-outline-secondary"
				type="button"
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
