export type LoginCredentials = {
	email: string
	password: string
}

export type SignUpCredentials = {
	email: string
	password: string
	passwordConfirm: string
}

export type ForgotPasswordFormData = {
	email: string
}

export type UpdateProfileFormData = {
	name: string
	photoUrl: string
	email: string
	password: string
	passwordConfirm: string
}

