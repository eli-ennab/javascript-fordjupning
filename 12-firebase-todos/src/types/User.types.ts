export type LoginCredentials = {
	email: string
	password: string
}

export type SignUpCredentials = {
	email: string
	password: string
	passwordConfirm: string
}

export type UpdateProfileFormData = {
	email?: string
	password?: string
	// displayName?: string
	// photoUrl?: string
}

