import { Timestamp } from "firebase/firestore";

/**
 * Convert a Firebase Timestamp to a Date
 * @param firebaseTimestamp
 * @returns
 */
export const firebaseTimestampToDate = (firebaseTimestamp: Timestamp) => {
	return firebaseTimestamp.toDate()
}

/**
 * Convert a Date to an ISO string
 * @param date
 * @returns
 */
export const dateToIsoLocal = (date: Date) => {
	return date.toISOString()
}

/**
 * Convert a Date to a YYYY-MM-DD hh:mm:ss string
 * @param date
 * @returns
 */
export const dateToYmdHms = (date: Date) => {
	return Intl.DateTimeFormat(['sv-SE'],
	{
		dateStyle: 'short',
		timeStyle: 'short',
	}).format(date)
}

/**
 * Convert a firebase Timestamp to an
 * @param firebaseTimestamp
 * @returns
 */
export const firebaseTimestampToString = (firebaseTimestamp: Timestamp) => {
	return dateToYmdHms( firebaseTimestampToDate(firebaseTimestamp) )
}
