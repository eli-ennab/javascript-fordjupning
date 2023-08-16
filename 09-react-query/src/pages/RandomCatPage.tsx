import { useQuery } from '@tanstack/react-query'
import { getRandomCatImage, getRandomCatImageByBreed } from './../services/TheCatAPI'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'
import CatSpinner from './components/CatSpinner'
import { useState } from 'react'

const RandomCatPage = () => {

	const [breed, setBreed] = useState<string | null>(null)

	const getRandomCat = useQuery({
		queryKey: ['random-cat'],
		queryFn: getRandomCatImage,
	})

	const getRandomCatByBreed = useQuery({
        queryKey: ['breed', breed],
        queryFn: () => breed ? getRandomCatImageByBreed(breed) : null,
        enabled: breed !== null,
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
					onClick={() => { setBreed(null); getRandomCat.refetch()} }
				>
						Give me a totally random cat
				</Button>
			</div>

			<div className="mb-3">
				<Button
					variant="dark"
					onClick={() => setBreed('beng')}
				>
						Give me a random bengal cat
				</Button>
			</div>

			<div className="mb-3">
				<Button
					variant="dark"
					onClick={() => setBreed('siam')}
				>
						Give me a random siamese cat
				</Button>
			</div>

			{getRandomCat.isFetching && <CatSpinner />}

			{getRandomCatByBreed.isFetching && <CatSpinner />}

			{getRandomCat.data && (
				<Image src={getRandomCat.data.url} fluid />
			)}

			{getRandomCatByBreed.data && (
				<Image src={getRandomCatByBreed.data.url} fluid />
			)}

		</>
	)
}

export default RandomCatPage
