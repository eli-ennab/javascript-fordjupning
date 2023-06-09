import { useEffect, useState } from 'react'
import axios from 'axios'

const useGetData = <T = any>(initialUrl: string|null = null) => {
	const [data, setData] = useState<T|null>(null)
	const [url, setUrl] = useState<string|null>(initialUrl)
	const [error, setError] = useState<string|null>(null)
	const [isError, setIsError] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

	const getData = async (resourceUrl: string) => {
		setData(null)
		setError(null)
		setIsError(false)
		setIsLoading(true)
		await new Promise(r => setTimeout(r, 1000))

		try {
			setUrl(null)
			const res = await axios.get<T>(resourceUrl)
			setData(res.data)
		} catch (err: any) {
			setError(err.message)
			setIsError(true)
		}

		setIsLoading(false)
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
		isLoading,
		reloadData
	}
}

export default useGetData
