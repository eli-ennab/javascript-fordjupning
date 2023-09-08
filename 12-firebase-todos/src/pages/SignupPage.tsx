import { Link, useNavigate } from 'react-router-dom'
import { useRef } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { SignUpCredentials } from '../types/User.types'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'

const SignupPage = () => {
	const { register, handleSubmit, formState: { errors }, watch } = useForm<SignUpCredentials>()

	// Watch the current value of the password form field
	const passwordRef = useRef("")
	passwordRef.current = watch('password')

	const onSignup: SubmitHandler<SignUpCredentials> = async (data) => {
		console.log("Would sign up user:", data)
	}

	return (
		<Row>
			<Col md={{ span: 6, offset: 3 }}>
				<Card>
					<Card.Body>
						<Card.Title className="mb-3">Sign up</Card.Title>

						<Form onSubmit={handleSubmit(onSignup)}>
							<Form.Group controlId="email" className="mb-3">
								<Form.Label>Email</Form.Label>
								<Form.Control
									placeholder="yo@email.it"
									type="email"
									{...register('email', {
										required: "You have to enter an email",
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
										required: "You have to enter a password",
										minLength: {
											value: 3,
											message: "Enter at least 3 characters"
										},
									})}
								/>
								{errors.password && <p className="invalid">{errors.password.message ?? "Invalid value"}</p>}
								<Form.Text>At least 6 characters.</Form.Text>
							</Form.Group>

							<Form.Group controlId="confirmPassword" className="mb-3">
								<Form.Label>Confirm Password</Form.Label>
								<Form.Control
									type="password"
									autoComplete="off"
									{...register('passwordConfirm', {
										required: "You have to enter password again",
										minLength: {
											value: 3,
											message: "Enter at least 3 characters"
										},
										validate: (value) => {
											return value === passwordRef.current || "The passwords do not match"
										}
									})}
								/>
								{errors.passwordConfirm && <p className="invalid">{errors.passwordConfirm.message ?? "Invalid value"}</p>}
							</Form.Group>

							<Button
								variant="light"
								type="submit"
							>
								Create Account
							</Button>

						</Form>

						{/* <div className="text-center">
							<Link to="/forgot-password">Forgot Password?</Link>
						</div> */}
					</Card.Body>
				</Card>

				<div className="text-center mt-3">
					Already have an account? <Link to="/login">Log In</Link>
				</div>
			</Col>
		</Row>
	)
}

export default SignupPage
