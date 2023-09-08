import { createContext, useState } from 'react'

type AuthContextType = {
	signup: (email: string, password: string) => void
	userEmail: string|null
}

// This creates the actual context and sets the context's initial/default value
export const AuthContext = createContext<AuthContextType|null>(null)

type AuthContextProps = {
	children: React.ReactNode
}

const AuthContextProvider: React.FC<AuthContextProps> = ({ children }) => {
	const [userEmail, setUserEmail] = useState<string|null>(null)

	const signup = (email: string, password: string) => {
		console.log("Hello, would sign up user from AuthContext", email, password)
	}

	return (
		<AuthContext.Provider value={{
			signup,
			userEmail,
		}}>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthContextProvider
