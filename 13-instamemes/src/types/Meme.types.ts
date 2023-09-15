import { Timestamp } from "firebase/firestore"

export type Meme = {
	_id: string
	created: Timestamp
	name: string
	path: string
	type: string
	size: number
	uid: string
	url: string
}
