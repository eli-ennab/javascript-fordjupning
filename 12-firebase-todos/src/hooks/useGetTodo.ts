import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { db, todosCol } from '../services/firebase'
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

	const toggleData = async () => {
		const newValue = !data?.completed

		const todoRef = doc(db, "todos", documentId)

		await updateDoc(todoRef, {
			completed: newValue
		})

		getData(documentId)
	}

	useEffect(() => {
		getData(documentId)
	}, [documentId])

	return {
		data,
		error,
		getData,
		toggleData,
		loading,
	}
}

export default useGetTodo
