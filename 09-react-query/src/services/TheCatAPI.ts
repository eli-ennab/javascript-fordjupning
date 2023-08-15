import axios from 'axios'
import { CatAPI_ImageResponse } from '../types'

const FAKE_DELAY = 2000

const instance = axios.create({
	baseURL: `https://api.thecatapi.com/v1/images/search`,
	timeout: 10000,
	headers: {
		"Content-Type": "application/json",
		"Accept": "application/json",
	}
})

/**
 * Generic get with delay
 */
export const get = async <T>(endpoint: string) => {
	const response = await instance.get<T>(endpoint)
	!!FAKE_DELAY && await new Promise(r => setTimeout(r, FAKE_DELAY))
	return response.data
}

/**
 * Get a random cat image
 */
export const getRandomCat = () => {
	return get<CatAPI_ImageResponse[]>('/')
}


