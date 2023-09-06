import { useForm, SubmitHandler } from 'react-hook-form'
import { NewTodo } from '../types/Todo.types'

interface IProps {
	onAddTodo: (todo: NewTodo) => void
}

const ReactHookForm: React.FC<IProps> = ({ onAddTodo }) => {
	const { register, handleSubmit, reset } = useForm<NewTodo>()
	const onSubmit: SubmitHandler<NewTodo> = (data) => {
		onAddTodo(data)

		reset()
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="mb-3">
			<div className="input-group">
				<input
					{...register("title")}
					className="form-control"
				/>
				<button
					type="submit"
					className="btn btn-success"
					>
						Create
				</button>
			</div>
		</form>
	)
}

export default ReactHookForm
