import { toast } from 'react-toastify'
import useCreateAuthor from '../../hooks/useCreateAuthor'
import { useForm, SubmitHandler } from 'react-hook-form'
import { NewAuthor } from '../../types/BooksAPI.types'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import FormGroup from 'react-bootstrap/FormGroup'

const CreateAuthorForm = () => {
	const { handleSubmit, register, formState: { errors } } = useForm<NewAuthor>()
	const createAuthorMutation = useCreateAuthor()

	const onCreateAuthorSubmit: SubmitHandler<NewAuthor> = (data) => {
		console.log("Submitted data", data)
		createAuthorMutation.mutate(data)
	}

	return (
		<Form onSubmit={handleSubmit(onCreateAuthorSubmit)}>
			<FormGroup className="mb-3" controlId="name">
				<Form.Label>Author Name</Form.Label>
				<Form.Control
					type="text"
					placeholder="Author Authorian"
					minLength={2}
					maxLength={20}
					{... register('name', {
						required: true,
						minLength: 3,
					})}
				/>
				{errors.name && <p className="text-danger">Too short name.</p>}
			</FormGroup>

			<FormGroup className="mb-3" controlId="date_of_birth">
				<Form.Label>Date of Birth</Form.Label>
				<Form.Control
					type="date"
					{... register('date_of_birth', {
						required: true,
					})}
				/>
				{errors.date_of_birth && <p className="text-danger">Date of Birth missing.</p>}
			</FormGroup>

			<div className="d-flex justify-content-end">
				<Button
					variant="dark"
					type="submit"
				>
						Create
					</Button>
			</div>
		</Form>
	)
}

export default CreateAuthorForm
