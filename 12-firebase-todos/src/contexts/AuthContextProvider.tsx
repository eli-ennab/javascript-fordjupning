/* eslint-disable @typescript-eslint/no-empty-function */
import { User, UserCredential, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { createContext, useState } from 'react'
import { auth } from '../services/firebase'
import { toast } from "react-toastify"

type AuthContextType = {
	currentUser: UserCredential | null
	login: (email: string, password: string) => Promise<UserCredential>
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
	const [currentUser, setCurrentUser] = useState<User|null>(null)
	const [userEmail, setUserEmail] = useState<string | null>(null)

	// onAuthStateChanged(auth, (user) => {
	// 	if (!user) {
	// 		throw new Error("That is not a user")
	// 	}

	// 	setCurrentUser(user)
	// })

	const login = async (email: string, password: string) => {
		try {
			await signInWithEmailAndPassword(auth, email, password)
		} catch (err: any) {
			toast.error(
				`${err.message}`
			)
		}
	}

	const logout = (auth: any) => {
		return signOut(auth)
	}

	const signup = async (email: string, password: string) => {
		try {
			await createUserWithEmailAndPassword(auth, email, password)
		} catch (err: any) {
			toast.error(
				`${err.message}`
			)
		}
	}

	// add auth-state observer here (somehow... 😈)

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
