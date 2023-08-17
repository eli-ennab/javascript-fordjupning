/**
 * API client for The Cat API
 *
 * Docs: https://docs.thecatapi.com/
 * API: https://api.thecatapi.com/v1/
 */

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
export const getRandomCatImage = async () => {
	const data = await get<CatAPI_ImageResponse>("images/search")

	return data[0]
}

/**
 * Get a random cat image by breed
 */
export const getRandomCatImageByBreed = async (breed_id = '') => {
	const data = await get<CatAPI_ImageResponse>("/images/search?breed_ids=" + breed_id)

	return data[0]
}

/**
 * Get random cat images
 */
export const getRandomCatImages = async (qty = 1) => {
	const data = await get<CatAPI_ImageResponse>("images/search?limit=" + qty)

	return data
}

