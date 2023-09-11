/* eslint-disable @typescript-eslint/no-empty-function */
import { UserCredential, createUserWithEmailAndPassword } from 'firebase/auth'
import { createContext, useState } from 'react'
import { auth } from '../services/firebase'

type AuthContextType = {
	currentUser: UserCredential | null
	// login: ?
	// logout: ?
	signup: (email: string, password: string) => Promise<UserCredential>
	userEmail: string | null
}

// This creates the actual context and sets the context's initial/default value
export const AuthContext = createContext<AuthContextType | null>(null)

type AuthContextProps = {
	children: React.ReactNode
}

const AuthContextProvider: React.FC<AuthContextProps> = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(null)
	const [userEmail, setUserEmail] = useState<string | null>(null)

	const login = (email: string, password: string) => {
	}

	const logout = () => {
	}

	const signup = (email: string, password: string) => {
		return createUserWithEmailAndPassword(auth, email, password)
	}

	// add auth-state observer here (somehow... 😈)

	return (
		<AuthContext.Provider value={{
			currentUser,
			// login,
			// logout,
			signup,
			userEmail,
		}}>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthContextProvider
