/* eslint-disable @typescript-eslint/no-empty-function */
import { Auth, UserCredential, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { createContext, useState } from 'react'
import { auth } from '../services/firebase'
import { toast } from "react-toastify"

type AuthContextType = {
	currentUser: UserCredential | null
	login: (email: string, password: string) => Promise<UserCredential>
	logout: () => Promise<void>
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

	const login = async (email: string, password: string): Promise<UserCredential> => {
		try {
			const userCredential = await signInWithEmailAndPassword(auth, email, password)
			return userCredential
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			toast.error(`${error.message}`)
			throw error
		}
	}

	const logout = async () => {
		console.log("Logging out user:", currentUser)

		try {
			await signOut(auth);
			toast.success("User logged out successfully.")
		} catch (error) {
			console.error("Error logging out:", error)
		}
	}

	const signup = async (email: string, password: string): Promise<UserCredential> => {
		try {
			const userCredential = await createUserWithEmailAndPassword(auth, email, password)
			return userCredential
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			toast.error(`${error.message}`)
			throw error
		}
	}

	// add auth-state observer here (somehow... 😈)
	onAuthStateChanged(auth, (user: any) => {
		console.log("Auth state changed:", user)

		setCurrentUser(user)

		setUserEmail(user.email)
	})

	return (
		<AuthContext.Provider value={{
			currentUser,
			login,
			logout,
			signup,
			userEmail,
		}}>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthContextProvider
