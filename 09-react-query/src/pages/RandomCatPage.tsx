import { useQuery } from '@tanstack/react-query'
import { getRandomCat } from './../services/TheCatAPI'
import Image from 'react-bootstrap/Image'

const RandomCatPage = () => {

  const { isLoading, data } = useQuery({
	queryKey: ['cat'],
	queryFn: () => getRandomCat(),
  })

	if (isLoading) return 'Loading...'

	return (
		<>
			{ data &&
				data.map(data => <Image key={data.id} src={data.url} width={data.width} />)
			}
		</>
	)
}

export default RandomCatPage
