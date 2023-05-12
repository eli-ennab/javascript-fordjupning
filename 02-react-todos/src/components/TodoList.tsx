import React from 'react'
import { Todo, Todos } from '../types'
import TodoListItem from './TodoListItem'

interface IProps {
	onToggle: (todo: Todo) => void
	onDelete: (todoToDelete: Todo) => void
	todos: Todos
}

const TodoList: React.FC<IProps> = ( {onToggle, onDelete, todos} ) => {
	return (
		<ul className="todolist">
		{todos.map((todo, index) => (
			<TodoListItem
				onToggle={onToggle}
				onDelete={onDelete}
				todo={todo}
				key={index}
			/>
		) )}
	</ul>
	)
}

export default TodoList
