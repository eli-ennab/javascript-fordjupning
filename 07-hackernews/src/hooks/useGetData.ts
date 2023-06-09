import { useEffect, useState } from 'react'
import { DogAPI_RandomImageResponse } from '../types'
import axios from 'axios'

const useGetData = (initialUrl: string|null = null) => {
	const [data, setData] = useState<DogAPI_RandomImageResponse|null>(null)
	const [url, setUrl] = useState<string|null>(initialUrl)
	const [error, setError] = useState<string | null>(null)
	const [loading, setLoading] = useState(false)

	const getData = async (resourceUrl: string) => {
		setData(null)
		setLoading(true)
		await new Promise(r => setTimeout(r, 1000))

		try {
			setError(null)
			setUrl(null)
			const res = await axios.get<DogAPI_RandomImageResponse>(resourceUrl)
			setData(res.data)
		} catch (err: any) {
			setError(err.message)
		}

		setLoading(false)
	}

	const reloadData = (url: string) => {
		setUrl(url)
	}

	useEffect(() => {
		if(!url) {
			return
		}

		getData(url)
	}, [url])

	return {
		data,
		setUrl,
		error,
		loading,
		reloadData
	}
}

export default useGetData
