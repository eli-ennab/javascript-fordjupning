import { useEffect, useState } from 'react'
import { DogAPI_RandomImageResponse } from '../types'
import axios from 'axios'

const useGetData = (initialUrl: string|null = null) => {
	const [data, setData] = useState<DogAPI_RandomImageResponse|null>(null)
	const [url, setUrl] = useState<string|null>(initialUrl)
	const [error, setError] = useState<string|null>(null)
	const [isError, setIsError] = useState(false)
	const [loading, setLoading] = useState(false)

	const getData = async (resourceUrl: string) => {
		setData(null)
		setError(null)
		setIsError(false)
		setLoading(true)
		await new Promise(r => setTimeout(r, 1000))

		try {
			setUrl(null)
			const res = await axios.get<DogAPI_RandomImageResponse>(resourceUrl)
			setData(res.data)
		} catch (err: any) {
			setError(err.message)
			setIsError(true)
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
		isError,
		loading,
		reloadData
	}
}

export default useGetData
