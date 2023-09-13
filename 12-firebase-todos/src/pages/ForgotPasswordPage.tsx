import { FirebaseError } from 'firebase/app'
import { useState } from 'react'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Container from "react-bootstrap/Container"
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import { toast } from 'react-toastify'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import { SignUpCredentials, UpdateProfileFormData } from '../types/User.types'

const ForgotPasswordPage = () => {
	const [errorMessage, setErrorMessage] = useState<string | null>(null)
	const [loading, setLoading] = useState(false)
	const { handleSubmit, register, formState: { errors } } = useForm<SignUpCredentials>()
	const { resetPassword } = useAuth()
	const navigate = useNavigate()

	const onNewPassword: SubmitHandler<UpdateProfileFormData> = async (data) => {
		setErrorMessage(null)

		if (!data.email) {
			throw new Error("Email does not exist.")
		}

		try {
			setLoading(true)
			await resetPassword(data.email)
			toast.success("New password successfully sent to your email")
			navigate('/login')

		} catch (error) {
			if (error instanceof FirebaseError) {
				setErrorMessage(error.message)
			} else {
				setErrorMessage("Something went wrong. Have you tried turning it off and on again?")
			}
			setLoading(false)
		}
	}

	return (
		<Container className="py-3 center-y">
			<Row>
				<Col md={{ span: 6, offset: 3 }}>
					<Card>
						<Card.Body>
							<Card.Title className="mb-3">Require a new password</Card.Title>

							{errorMessage && (<Alert variant="danger">{errorMessage}</Alert>)}

							<Form onSubmit={handleSubmit(onNewPassword)}>
								<Form.Group controlId="email" className="mb-3">
									<Form.Label>Enter your registered email</Form.Label>
									<Form.Control
										placeholder="snelhest2000@horsemail.com"
										type="email"
										{...register('email', {
											required: "You have to enter an email",
										})}
									/>
									{errors.email && <p className="invalid">{errors.email.message ?? "Invalid value"}</p>}
								</Form.Group>

								<Button
									disabled={loading}
									variant="primary"
									type="submit"
								>
									{loading
										? "Loading..."
										: "Send new password"}
								</Button>
							</Form>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	)
}

export default ForgotPasswordPage
