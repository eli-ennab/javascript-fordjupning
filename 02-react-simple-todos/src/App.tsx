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

	const handleClickedTodo = (toggledTodo: Todo) => {
		console.log("completed:", toggledTodo.completed)

		const updateTodo: Todo = {
			title: toggledTodo.title,
			completed: !toggledTodo.completed
		}

		// setTodos([...todos, updateTodo])
	}

  return (
	<div className="App">

		<h1>Todos</h1>

		<form>
			<div className="input-group mb-3">
				<input
					type="text"
					className="form-control"
					placeholder="Write the title of your todo here"
					onChange={(e) => { setNewTodoTitle(e.target.value) }}
					value={newTodoTitle}
					/>
				<button
					className="btn btn-outline-secondary"
					type="button"
					onClick={handleCreateTodo}
					>Create todo
				</button>
			</div>
		</form>

	{(todos.length > 0 &&
			<ul className="list-group">
				{
					todos.map( (todo, index) =>
						<li
							key={index}
							className="todo"
							onClick={ () => {handleClickedTodo(todo)} }
							>{todo.title} {todo.completed ? <p>completed</p> : <p> not completed</p>}
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
		)}

		{( todos.length === 0 &&
			<p>You do not have any todos.</p>
		)}
	</div>
  )
}

export default App
