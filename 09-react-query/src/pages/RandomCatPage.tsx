import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Image from 'react-bootstrap/Image'
import CatSpinner from '../components/CatSpinner'
import { getRandomCatImageByBreed } from '../services/TheCatAPI'

const RandomCatPage = () => {

	const [ selectedBreed, setSelectedBreed ] = useState('')

	// const { data, error, isFetching, refetch } = useQuery(['random-cat'], getRandomCatImage)
	const { data, error, isFetching, refetch } = useQuery({
		queryKey: ['random-cat', selectedBreed],
		queryFn: () => {
			return getRandomCatImageByBreed(selectedBreed)
		},
	})

	if (error) {
		return <Alert variant="error">Oops, something went wrong.</Alert>
	}

	return (
		<>
			<h1>I ❤️ Random Cats</h1>
			<p>They cute.</p>

			{isFetching && <CatSpinner />}

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
						<Button variant="secondary" onClick={() => { setSelectedBreed('') }}>
							Any
						</Button>
						<Button variant="secondary" onClick={() => { setSelectedBreed('ragd') }}>
							Ragdoll
						</Button>
						<Button variant="secondary" onClick={() => { setSelectedBreed('sibe') }}>
							Siberian
						</Button>
						<Button variant="secondary" onClick={() => { setSelectedBreed('beng') }}>
							Bengal
						</Button>
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
