/* eslint-disable @typescript-eslint/no-empty-function */
import {
	UserCredential,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	onAuthStateChanged,
	User,
} from 'firebase/auth'
import { createContext, useEffect, useState } from 'react'
import { auth } from '../services/firebase'

type AuthContextType = {
	currentUser: User | null
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
	const [currentUser, setCurrentUser] = useState<User | null>(null)
	const [userEmail, setUserEmail] = useState<string | null>(null)

	const login = (email: string, password: string) => {
		return signInWithEmailAndPassword(auth, email, password)
	}

	const logout = () => {
	}

	const signup = (email: string, password: string) => {
		return createUserWithEmailAndPassword(auth, email, password)
	}

	// add auth-state observer here (somehow... 😈)
	useEffect(() => {
		/*
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setCurrentUser(user)
		})

		// runs when we leave the page, not when we log out
		return unsubscribe
		*/

		// the result is returned as a cleanup (unsubscribe)
		return onAuthStateChanged(auth, (user) => {
			console.log("Auth state changed:", user)
			setCurrentUser(user)

			if (user) {
				setUserEmail(user.email)
			} else {
				setUserEmail(null)
			}
		})
	}, [])

	console.log("Current user:", currentUser)

	return (
		<AuthContext.Provider value={{
			currentUser,
			login,
			// logout,
			signup,
			userEmail,
		}}>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthContextProvider
