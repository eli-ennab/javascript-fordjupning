import { collection, getDocs } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { Todo, Todos } from "../types/Todo.types"
import { db } from '../services/firebase'


export const useGetTodos = () => {
	const [todos, setTodos] = useState<Todos|null>(null)
	const [loading, setLoading] = useState(true)

	const getTodos = async () => {
		setLoading(true)

		// Get reference to collection 'todos'
		const colRef = collection(db, 'todos')

		// Get query snapshot of collecton
		const snapshot = await getDocs(colRef)

		// Loop over all docs
		const data = snapshot.docs.map(doc => {
			return {
				_id: doc.id,
				...doc.data(),
			} as Todo
		})

		setTodos(data)
		setLoading(false)
	}

	useEffect(() => {
		getTodos()
	}, [])

	return {
		todos,
		loading,
		getTodos
	}
}

export default useGetTodos
