import { FirebaseError } from 'firebase/app'
import { useRef, useState } from 'react'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Container from "react-bootstrap/Container"
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import { useForm, SubmitHandler } from 'react-hook-form'
import useAuth from '../hooks/useAuth'
import { UpdateProfileFormData } from '../types/User.types'

const UpdateProfile = () => {
	const [errorMessage, setErrorMessage] = useState<string | null>(null)
	// const [errorMessage, setErrorMessage] = useState([]) // make error an array later
	const [loading, setLoading] = useState(false)
	const { handleSubmit, register, watch, formState: { errors } } = useForm<UpdateProfileFormData>()
	const {
		currentUser,
		setEmail,
		setDisplayName,
		setPhotoUrl,
		userEmail,
		userPhotoUrl,
		userDisplayName,
} = useAuth()

	// Watch the current value of `password` form field
	const passwordRef = useRef("")
	passwordRef.current = watch('password')

	const onUpdateProfile: SubmitHandler<UpdateProfileFormData> = async (data) => {
		// Clear any previous error state
		setErrorMessage(null)

		if (!currentUser) {
			throw new Error("No user")
		}

		// Update user profile
		try {
			// Disable update-button while update is in progress
			setLoading(true)

			// Update displayName *ONLY* if it has changed
			if (userDisplayName !== data.displayName) {
				await setDisplayName(currentUser, data.displayName)
			}

			// Update photoURL *ONLY* if it has changed
			if (userPhotoUrl !== data.photoUrl) {
				await setPhotoUrl(currentUser, data.photoUrl)
			}

			// Update email *ONLY* if it has changed
			if (userEmail !== data.email) {
				await setEmail(currentUser, data.email)
			}

			// Update password *ONLY* if the user has provided a new password to set

			// Reload user data
			// userReload()

			// Show success toast 🥂

			// Enable update-button again
			setLoading(false)
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
							<Card.Title className="mb-3">Update Profile</Card.Title>

							{errorMessage && (<Alert variant="danger">{errorMessage}</Alert>)}

							<Form onSubmit={handleSubmit(onUpdateProfile)}>
								{/*
									Fill the displayName, photoURL and email form fields with their current value!
								*/}
								<Form.Group controlId="displayName" className="mb-3">
									<Form.Label>Display Name</Form.Label>
									<Form.Control
										placeholder={userDisplayName ? userDisplayName : 'set display name'}
										type="text"
										{...register('displayName')}
									/>
								</Form.Group>

								<Form.Group controlId="photoURL" className="mb-3">
									<Form.Label>Photo URL</Form.Label>
									<Form.Control
										placeholder={userPhotoUrl ? userPhotoUrl : 'set photo url'}
										type="url"
										// value={currentUser?.photoURL}
										{...register('photoUrl')}
									/>
								</Form.Group>

								<Form.Group controlId="email" className="mb-3">
									<Form.Label>Email</Form.Label>
									<Form.Control
										placeholder={userEmail ? userEmail : 'youremail@email.com'}
										type="email"
										{...register('email')}
									/>
								</Form.Group>

								{/* <Form.Group controlId="password" className="mb-3">
									<Form.Label>Password</Form.Label>
									<Form.Control
										type="password"
										autoComplete="new-password"
										{...register('password', {
											minLength: {
												value: 3,
												message: "Please enter at least 3 characters"
											},
										})}
									/>
									<Form.Text>At least 6 characters</Form.Text>
								</Form.Group>

								<Form.Group controlId="confirmPassword" className="mb-3">
									<Form.Label>Confirm Password</Form.Label>
									<Form.Control
										type="password"
										autoComplete="off"
										{...register('passwordConfirm', {
											minLength: {
												value: 3,
												message: "Please enter at least 3 characters"
											},
											validate: (value) => {
												return value === passwordRef.current || "The passwords does not match 🤦🏼‍♂️"
											}
										})}
									/>
								</Form.Group> */}

								<Button
									disabled={loading}
									variant="primary"
									type="submit"
								>
									{loading
										? "Updating profile..."
										: "Save"}
								</Button>
							</Form>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	)
}

export default UpdateProfile
