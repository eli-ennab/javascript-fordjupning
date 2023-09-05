import { useEffect, useState } from 'react'
import { getDocs } from 'firebase/firestore'
import { todosCol } from '../services/firebase'
import { Todo, Todos } from '../types/Todo.types'

export const useGetTodos = () => {
	const [data, setData] = useState<Todos|null>(null)
	const [loading, setLoading] = useState(true)

	const getData = async () => {
		setLoading(true)

		// Get query snapshot of collecton
		const snapshot = await getDocs(todosCol)

		// Loop over all docs
		const data = snapshot.docs.map(doc => {
			return {
				...doc.data(),
				_id: doc.id,
				// title: doc.data().title,
				// completed: doc.data().completed,
			} as Todo
		})

		setData(data)
		setLoading(false)
	}

	useEffect(() => {
		getData()
	}, [])

	return {
		data,
		loading,
		getData
	}
}

export default useGetTodos
