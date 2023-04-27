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


		<ul className="list-group">
			{
				todos.map( (todo, index) =>
					<li
						key={index}
						className="todo">
						{todo.title}
						<button
							className="btn btn-dark">
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
