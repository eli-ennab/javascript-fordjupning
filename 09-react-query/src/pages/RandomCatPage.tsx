import { useQuery } from '@tanstack/react-query'
import { getRandomCatImage, getRandomBengalCatImage } from './../services/TheCatAPI'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'
import CatSpinner from './components/CatSpinner'

const RandomCatPage = () => {

	// const { error, data, isFetching, refetch } = useQuery(['random-cat'], getRandomCatImage)

	const { data: randomCatData, error: randomCatError, isFetching: randomCatIsFetching, refetch: randomCatRefetch } = useQuery({
		queryKey: ['random-cat'],
		queryFn: getRandomCatImage,
	})

	const { data: breedCatData, error: breedCatError, isFetching: breedCatIsFetching, refetch: breedCatRefetch } = useQuery({
		queryKey: ['random-bengal-cat'],
		queryFn: getRandomBengalCatImage,
	})

	if (randomCatError || breedCatError) {
		return <Alert variant="error">Oops, something went wrong.</Alert>
	}

	return (
		<>
			<h1>I LUV RANDOM CATS</h1>

			<div className="mb-3">
				<Button
					variant="dark"
					onClick={() => randomCatRefetch()}
				>
						Give me a random cat
				</Button>
			</div>

			<div className="mb-3">
				<Button
					variant="dark"
					onClick={() => breedCatRefetch()}
				>
						Give me a random bengal cat
				</Button>
			</div>

			{randomCatIsFetching || breedCatIsFetching && <CatSpinner />}

			{randomCatData && (
				<Image src={randomCatData.url} fluid />
			)}

			{breedCatData && (
				<Image src={breedCatData.url} fluid />
			)}

		</>
	)
}

export default RandomCatPage
