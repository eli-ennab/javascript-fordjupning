import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getRandomCatImageByBreed } from '../services/TheCatAPI'
import { Breed } from '../types/TheCatAPI.types'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Image from 'react-bootstrap/Image'

const breeds: Breed[] = [
	{ id: '', name: 'Any' },
	{ id: 'ragd', name: 'Ragdoll' },
	{ id: 'sibe', name: 'Siberian' },
	{ id: 'beng', name: 'Bengal' },
	{ id: 'pers', name: 'Persian' },
	{ id: 'norw', name: 'Norwegian Forest' },
]

const RandomCatPage = () => {

	const [ selectedBreed, setSelectedBreed ] = useState('')

	// const { data, error, isFetching, refetch } = useQuery(['random-cat'], getRandomCatImage)
	const { data, error, isFetching, refetch } = useQuery({
		queryKey: ['random-cat', selectedBreed],
		queryFn: () => getRandomCatImageByBreed(selectedBreed),
		staleTime: 5 * 1000,	// 5 seconds, only for this query
	})

	if (error) {
		return <Alert variant="error">Oops, something went wrong.</Alert>
	}

	return (
		<>
			<h1>I ❤️ Random Cats</h1>
			<p>They cute.</p>

			<div className="text-center">
				<div className="mb-3">
					<Button
						disabled={isFetching}
						onClick={() => refetch()}
						variant="dark"
					>
						Refetch
					</Button>

					<ButtonGroup className="ms-2">
						{breeds.map(breed => (
							<Button
								key={breed.id}
								disabled={isFetching || selectedBreed === breed.id}
								onClick={() => setSelectedBreed(breed.id)}
								variant="secondary"
							>
								{breed.name}
							</Button>
						))}
					</ButtonGroup>
				</div>

				{data && (
					<Image src={data.url} fluid />
				)}
			</div>
		</>
	)
}

export default RandomCatPage
