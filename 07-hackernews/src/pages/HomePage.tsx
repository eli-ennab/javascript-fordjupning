import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'

const HomePage = () => {
	return (
		<>
			<h1>Welcome to Hacker News' HomiePage</h1>

			<Link to="/search">
				<Button variant="dark">Use the Search for Hacker News</Button>
			</Link>
		</>
	)
}

export default HomePage
