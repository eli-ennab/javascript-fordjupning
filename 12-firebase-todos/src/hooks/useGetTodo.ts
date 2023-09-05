import { doc, getDoc } from "firebase/firestore"
import { db } from '../services/firebase'
import { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import { Todo } from "../types/Todo.types"


export const useGetTodo = () => {
	const [todo, setTodo] = useState<Todo|null>(null)
	const { id } = useParams()
	const todoId = Number(id)

	const getTodo = async (id: string) => {
		const docRef = doc(db, 'todos', id)
		const docSnap = await getDoc(docRef)

		const data = docSnap.data() as Todo

		setTodo(data)
	}

	useEffect(() => {
		if (!id) {
			return
		}

		getTodo(id)
	}, [id])

	return {
		todo,
		todoId,
		getTodo
	}
}

export default useGetTodo
