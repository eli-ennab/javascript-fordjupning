import { useQuery } from '@tanstack/react-query'
import { getRandomCatImage, getRandomBengalCatImage } from './../services/TheCatAPI'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'
import CatSpinner from './components/CatSpinner'

const RandomCatPage = () => {

	const getRandomCat = useQuery({
		queryKey: ['random-cat'],
		queryFn: getRandomCatImage,
	})

	const getRandomBengalCat = useQuery({
		queryKey: ['random-cat', 'beng'],
		queryFn: getRandomBengalCatImage,
	})

	if (getRandomCat.error) {
		return <Alert variant="error">Oops, something went wrong.</Alert>
	}

	return (
		<>
			<h1>I LUV RANDOM CATS</h1>

			<div className="mb-3">
				<Button
					variant="dark"
					onClick={() => getRandomCat.refetch()}
				>
						Give me a totally random cat
				</Button>
			</div>

			<div className="mb-3">
				<Button
					variant="dark"
					onClick={() => getRandomBengalCat.refetch()}
				>
						Give me a random bengal cat
				</Button>
			</div>

			{getRandomCat.isFetching && <CatSpinner />}

			{getRandomBengalCat.isFetching && <CatSpinner />}

			{getRandomCat.data && (
				<Image src={getRandomCat.data.url} fluid />
			)}

			{getRandomBengalCat.data && (
				<Image src={getRandomBengalCat.data.url} fluid />
			)}

		</>
	)
}

export default RandomCatPage
