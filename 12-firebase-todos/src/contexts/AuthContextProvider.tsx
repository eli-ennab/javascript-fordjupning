/* eslint-disable @typescript-eslint/no-empty-function */
import {
	UserCredential,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	onAuthStateChanged,
	User,
	signOut,
	sendPasswordResetEmail,
	updateEmail,
	updateProfile,
} from 'firebase/auth'
import { createContext, useEffect, useState } from 'react'
import SyncLoader from 'react-spinners/SyncLoader'
import { auth } from '../services/firebase'

type AuthContextType = {
	currentUser: User | null
	login: (email: string, password: string) => Promise<UserCredential>
	logout: () => Promise<void>
	signup: (email: string, password: string) => Promise<UserCredential>
	// userReload: ?
	resetPassword: (email: string) => Promise<void>
	setEmail: (user: User, newEmail: string) => Promise<void>
	setDisplayName: (user: User, displayName: string) => Promise<void>
	// setPassword: ?
	setPhotoUrl: (user: User, photoUrl: string) => Promise<void>
	userEmail: string | null
	userDisplayName: string | null
	userPhotoUrl: string | null
}

// This creates the actual context and sets the context's initial/default value
export const AuthContext = createContext<AuthContextType | null>(null)

type AuthContextProps = {
	children: React.ReactNode
}

const AuthContextProvider: React.FC<AuthContextProps> = ({ children }) => {
	const [currentUser, setCurrentUser] = useState<User | null>(null)
	const [userEmail, setUserEmail] = useState<string | null>(null)
	const [userDisplayName, setUserDisplayName] = useState<string | null>(null)
	const [userPhotoUrl, setUserPhotoUrl] = useState<string | null>(null)
	const [loading, setLoading] = useState(true)

	const login = (email: string, password: string) => {
		return signInWithEmailAndPassword(auth, email, password)
	}

	const logout = () => {
		return signOut(auth)
	}

	const signup = (email: string, password: string) => {
		return createUserWithEmailAndPassword(auth, email, password)
	}

	const userReload = async () => {
	}

	const resetPassword = (email: string) => {
		return sendPasswordResetEmail(auth, email)
	}

	const setEmail = (user: User, newEmail: string) => {
		return updateEmail(user, newEmail)
	}

	const setPassword = async (password: string) => {

	}

	const setDisplayName = async (user: User, displayName: string) => {
		await updateProfile(user, {
			displayName: displayName
		})
	}

	const setPhotoUrl = async (user: User, photoUrl: string) => {
		await updateProfile(user, {
			photoURL: photoUrl
		})
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
			setCurrentUser(user)

			if (user) {
				setUserEmail(user.email)
				setUserDisplayName(user.displayName)
				setUserPhotoUrl(user.photoURL)
			} else {
				setUserEmail(null)
				setUserDisplayName(null)
				setUserPhotoUrl(null)
			}

			setLoading(false)
		})
	}, [])

	// console.log("Current user:", currentUser)

	return (
		<AuthContext.Provider value={{
			currentUser,
			login,
			logout,
			resetPassword,
			signup,
			userEmail,
			userDisplayName,
			userPhotoUrl,
			setEmail,
			setDisplayName,
			setPhotoUrl,
		}}>
			{loading ? (
				<div id="initial-loader">
					<SyncLoader color={'#888'} size={15} speedMultiplier={1.1} />
				</div>
			) : (
				<>{children}</>
			)}
		</AuthContext.Provider>
	)
}

export default AuthContextProvider
