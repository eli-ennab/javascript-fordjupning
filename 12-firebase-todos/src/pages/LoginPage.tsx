import { Link, useNavigate } from 'react-router-dom'
import { useRef } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { LoginCredentials } from '../types/User.types'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'

const LoginPage = () => {
	const { register, handleSubmit, formState: { errors }, watch } = useForm<LoginCredentials>()

	// Watch the current value of the password form field
	const passwordRef = useRef("")
	passwordRef.current = watch('password')

	const onLogin: SubmitHandler<LoginCredentials> = async (data) => {
		console.log("Would login up user:", data)
	}

	return (
		<Row>
			<Col md={{ span: 6, offset: 3 }}>
				<Card>
					<Card.Body>
						<Card.Title className="mb-3">Log In</Card.Title>

						<Form onSubmit={handleSubmit(onLogin)}>
							<Form.Group controlId="email" className="mb-3">
								<Form.Label>Email</Form.Label>
								<Form.Control
									placeholder="yo@email.it"
									type="email"
									{...register('email', {
										required: "You have to enter your email",
									})}
								/>
								{errors.email && <p className="invalid">{errors.email.message ?? "Invalid value"}</p>}
							</Form.Group>

							<Form.Group controlId="password" className="mb-3">
								<Form.Label>Password</Form.Label>
								<Form.Control
									type="password"
									autoComplete="new-password"
									{...register('password', {
										required: "You have to enter your password",
										minLength: {
											value: 3,
											message: "Enter at least 3 characters"
										},
									})}
								/>
								{errors.password && <p className="invalid">{errors.password.message ?? "Invalid value"}</p>}
								<Form.Text>At least 6 characters.</Form.Text>
							</Form.Group>

							<Button
								variant="light"
								type="submit"
							>
								Log In
							</Button>

						</Form>

						<div className="text-center">
							<Link to="/forgot-password">Forgot Password?</Link>
						</div>
					</Card.Body>
				</Card>

				<div className="text-center mt-3">
					Need an account? <Link to="/signup">Sign Up</Link>
				</div>
			</Col>
		</Row>
	)
}

export default LoginPage
