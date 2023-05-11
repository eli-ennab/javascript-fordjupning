import React from 'react'
import { Todo, TodoList } from '../types'

interface IProps {
	todos: TodoList
	finishedTodos: Todo[]
}

const TodoCounter: React.FC<IProps> = ({ todos, finishedTodos }) => {
  return (
	<p className="status">
		{finishedTodos.length} of {todos.length} todos completed
	</p>
  )
}

export default TodoCounter
