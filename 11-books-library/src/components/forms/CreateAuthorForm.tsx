import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { toast } from 'react-toastify'
import useCreateAuthor from '../../hooks/useCreateAuthor'
import { FormGroup } from 'react-bootstrap'

const CreateAuthorForm = () => {
	return (
		<Form>
			<FormGroup className="mb-3" controlId="name">
				<Form.Label>Author Name</Form.Label>
				<Form.Control
					type="text"
					placeholder="Author Authorian"
					minLength={2}
					maxLength={20}
					required
				/>
			</FormGroup>

			<FormGroup className="mb-3" controlId="date_of_birth">
				<Form.Label>Date of Birth</Form.Label>
				<Form.Control
					type="date"
				/>
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
