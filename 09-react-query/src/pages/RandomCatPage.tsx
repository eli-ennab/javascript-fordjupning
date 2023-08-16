import { useQuery } from '@tanstack/react-query'
import { getRandomCatImage } from './../services/TheCatAPI'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'
import CatSpinner from './components/CatSpinner'

const RandomCatPage = () => {

	// const { error, data, isFetching, refetch } = useQuery(['random-cat'], getRandomCatImage)

	const { data, error, isFetching, refetch } = useQuery({
		queryKey: ['random-cat'],
		queryFn: getRandomCatImage,
	})

	if (error) {
		return <Alert variant="error">Oops, something went wrong.</Alert>
	}

	return (
		<>
			<h1>I LUV RANDOM CATS</h1>

			<div className="mb-3">
				<Button
					variant="dark"
					onClick={() => refetch()}
				>
						Give me another one
				</Button>
			</div>

			{isFetching && <CatSpinner />}

			{data && (
				<Image src={data.url} fluid />
			)}

		</>
	)
}

export default RandomCatPage
