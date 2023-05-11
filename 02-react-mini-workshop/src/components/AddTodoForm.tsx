import React from 'react'

interface IProps {
	onSubmit: (e: React.FormEvent) => void
	onChange: (value: React.SetStateAction<string>) => void
	value: string
	newTodoTitle: string
}

const AddTodoForm: React.FC<IProps> = ({ onSubmit, onChange, newTodoTitle }) => {
	return (
		<form onSubmit={onSubmit} className="mb-3">
			<div className="input-group">
				<input
					type="text"
					className="form-control"
					placeholder="Todo title"
					onChange={e => onChange(e.target.value)}
					value={newTodoTitle}
				/>

				<button
					type="submit"
					className="btn btn-success"
					disabled={!newTodoTitle}
				>Create</button>
				</div>
			</form>
	)
}

export default AddTodoForm
