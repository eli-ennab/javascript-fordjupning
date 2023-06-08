import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'
import useGetData from '../hooks/useGetData'

const RandomDogPage = () => {
	const { data, setUrl, reloadData, error, loading } = useGetData()

	return (
		<>
			<h1>A random doggo</h1>

			<div>
				<Button
					variant="primary"
					onClick={() => setUrl("https://dog.ceo/api/breds/image/random")}
				>Random Doggo</Button>

				<Button
					variant="primary"
					onClick={() => setUrl("https://dog.ceo/api/breed/boer/images/random")}
				>Random Boxer Doggo</Button>

				<Button
					variant="primary"
					onClick={() => {reloadData("https://dog.ceo/api/brees/image/random")}}
				>MOAR!!</Button>
			</div>

			{ !loading && error && ( <Alert variant="primary">{error}</Alert> )}

			{ loading && <p>Loading...</p> }

			<div>
				{ data && data.status === "success" && (
					<Image src={data?.message} fluid />
				)}
			</div>
		</>
	)
}

export default RandomDogPage
