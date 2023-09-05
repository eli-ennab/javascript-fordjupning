import { doc, getDoc } from 'firebase/firestore'
import { todosCol } from '../services/firebase'
import { useEffect, useState } from 'react'
import { Todo } from '../types/Todo.types'

export const useGetTodo = (documentId: string) => {
	const [data, setData] = useState<Todo|null>(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(false)

	const getData = async (documentId: string) => {
		setLoading(true)

		const docRef = doc(todosCol, documentId)
		const docSnap = await getDoc(docRef)

		if (!docSnap.exists()) {
			setData(null)
			setError(true)
			setLoading(false)
			return
		}

		const data: Todo = {
			...docSnap.data(),
			_id: docSnap.id,
		}

		setData(data)
		setError(false)
		setLoading(false)
	}

	useEffect(() => {
		getData(documentId)
	}, [documentId])

	return {
		data,
		error,
		getData,
		loading,
	}
}

export default useGetTodo
