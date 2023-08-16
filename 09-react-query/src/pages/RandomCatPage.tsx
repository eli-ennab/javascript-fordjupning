import { useQuery } from '@tanstack/react-query'
import { getRandomCat } from './../services/TheCatAPI'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'
import CatSpinner from './components/CatSpinner'

const RandomCatPage = () => {

	// const { isLoading, data } = useQuery({
	// 	queryKey: ['random-cat'],
	// 	queryFn: () => getRandomCat(),
	// })

	const { error, data, isFetching, refetch } = useQuery(['random-cat'], getRandomCat)

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

			{ data &&
				data.map(data => <Image key={data.id} src={data.url} fluid />)
			}

		</>
	)
}

export default RandomCatPage
