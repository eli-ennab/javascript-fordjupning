import React from 'react'
import { Todo } from '../types'

interface IProps {
	todo: Todo
	onDelete: (todo: Todo) => void
	onToggle: (todo: Todo) => void
}

const TodoListItem: React.FC<IProps> = ({todo, onDelete, onToggle}) => {

	return (
		<li className={todo.completed ? 'done' : ''}>
			<span className="todo-title">
				{todo.title}
			</span>

			<span className="ms-1">
				<span className="todo-toggle" onClick={ (e) => (e.stopPropagation(), onToggle(todo)) } role="button">
					{todo.completed ? <button className="btn btn-sm btn-dark btn-todo">mark as not completed</button> : <button className="btn btn-sm btn-dark btn-todo">mark as completed</button>}
				</span>
				<span className="todo-delete" onClick={ (e) => (e.stopPropagation(), onDelete(todo)) } role="button">
					<button className="btn btn-sm btn-danger btn-todo">delete</button>
				</span>
			</span>
		</li>
	)
}

export default TodoListItem
