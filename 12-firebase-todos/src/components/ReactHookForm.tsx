import { useForm, SubmitHandler } from 'react-hook-form'
import { NewTodo } from '../types/Todo.types'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '../services/firebase'

const ReactHookForm = () => {
	const { register, handleSubmit } = useForm<NewTodo>()
	const onSubmit: SubmitHandler<NewTodo> = async (data) => await addDoc(collection(db, "todos"), {
		title: data.title,
		completed: false,
	})

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="mb-3">
			<div className="input-group">
				<input
					{...register("title")}
					className="form-control"
					/>
				<button type="submit">Create</button>
			</div>
		</form>
	)
}

export default ReactHookForm
