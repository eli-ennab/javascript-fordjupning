import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'

const HomePage = () => {
	return (
		<>
			<h1>Sorry homie, pagie not found.</h1>

			<Link to="/">
				<Button variant="dark">Return</Button>
			</Link>
		</>
	)
}

export default HomePage
