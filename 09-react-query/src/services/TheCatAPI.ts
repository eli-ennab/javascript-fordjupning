import axios from 'axios'
import { CatAPI_ImageResponse } from '../types/TheCatAPI.types'

const FAKE_DELAY = 2000

const instance = axios.create({
	baseURL: "https://api.thecatapi.com/v1/",
	timeout: 10000,
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
export const getRandomCat = async () => {
	return await get<CatAPI_ImageResponse>("images/search")
}


