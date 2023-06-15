import { useQuery } from '@tanstack/react-query'
import Alert from "react-bootstrap/Alert"
import Button from "react-bootstrap/Button"
import Spinner from "react-bootstrap/Spinner"
import { getRandomDadJoke } from '../services/ICanHazDadJokeAPI'

const ICanHazDadJokePage = () => {
	// const jokeQuery = useQuery(["random-dad-joke"], getRandomDadJoke)
	const {
		data,
		isError,
		isLoading,
		isFetching,
		isStale,
		isSuccess,
		status
	} = useQuery(["random-dad-joke"], getRandomDadJoke)

	return (
		<>
			<h1>Random Dad Joke</h1>

			<pre className="bg-light py-2 px-3">
				isError: {isError ? "true" : "false"}<br />
				isLoading: {isLoading ? "true" : "false"}<br />
				isFetching: {isFetching ? "true" : "false"}<br />
				isStale: {isStale ? "true" : "false"}<br />
				isSuccess: {isSuccess ? "true" : "false"}<br />
				status: {status}
			</pre>

			{isLoading && <Spinner animation="border" variant="secondary" />}

			{isError && <Alert variant="warning">ERROR! ERROR! ERROR!</Alert>}

			<div>
				{true && (
					<>
						<p className="display-5 text-center my-5">
							{data?.joke}
						</p>
					</>
				)}
			</div>

			<div className="d-flex justify-content-center">
				<Button
					variant="primary"
					disabled={false}
				>
					MOAR!
				</Button>
			</div>
		</>
	)
}

export default ICanHazDadJokePage
