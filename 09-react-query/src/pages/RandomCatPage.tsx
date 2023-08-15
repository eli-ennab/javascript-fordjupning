import { useQuery } from '@tanstack/react-query'
import { getRandomCat } from './../services/TheCatAPI'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'

const RandomCatPage = () => {

	// const { isLoading, data } = useQuery({
	// 	queryKey: ['random-cat'],
	// 	queryFn: () => getRandomCat(),
	// })

	const { error, data, isLoading, refetch } = useQuery(['random-cat'], getRandomCat)

	if (error) {
		return <Alert variant="error">Oops, something went wrong.</Alert>
	}

	if (isLoading) return 'Loading...'

	return (
		<>
			<h1>I LUV RANDOM CATS</h1>

			<Button
				variant="dark"
				className="my-4"
				onClick={() => refetch()}>
					Give me another one
			</Button>

			{ data &&
				data.map(data => <Image key={data.id} src={data.url} fluid />)
			}

		</>
	)
}

export default RandomCatPage
