import { zodResolver } from '@hookform/resolvers/zod'
import useCreateAuthor from '../../hooks/useCreateAuthor'
import { useForm, SubmitHandler } from 'react-hook-form'
import { NewAuthor } from '../../types/BooksAPI.types'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import FormGroup from 'react-bootstrap/FormGroup'
import { AuthorSchema, authorSchema } from '../../schemas/AuthorSchema'

const CreateAuthorForm = () => {
	const { handleSubmit, register, formState: { errors } } = useForm<AuthorSchema>({
		resolver: zodResolver(authorSchema)
	})
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
					{... register('name')}
				/>
				{errors.name && <p className="text-danger">{errors.name.message}</p>}
			</FormGroup>

			<FormGroup className="mb-3" controlId="date_of_birth">
				<Form.Label>Date of Birth</Form.Label>
				<Form.Control
					type="date"
					{... register('date_of_birth')}
				/>
				{errors.date_of_birth && <p className="text-danger">{errors.date_of_birth.message ?? "Invalid value"}</p>}
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
