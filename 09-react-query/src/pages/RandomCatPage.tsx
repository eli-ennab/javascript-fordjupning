import { useQuery } from '@tanstack/react-query'
import { getRandomCat } from './../services/TheCatAPI'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'

const RandomCatPage = () => {

  const { isLoading, data } = useQuery({
	queryKey: ['cat'],
	queryFn: () => getRandomCat(),
  })

	if (isLoading) return 'Loading...'

	return (
		<>
			<h1>I LUV RANDOM CATS</h1>

			<Button
				variant="dark"
				onClick={() => getRandomCat()}>
					Give me another one
			</Button>

			{ data &&
				data.map(data => <Image key={data.id} src={data.url} fluid />)
			}

			<hr></hr>

		</>
	)
}

export default RandomCatPage
