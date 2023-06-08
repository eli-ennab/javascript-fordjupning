import { useContext } from 'react'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
import { ThemeContext } from '../contexts/ThemeProvider'

const HomePage = () => {
	const { isLightMode, toggleTheme } = useContext(ThemeContext)

	const handleToggleTheme = () => {
		toggleTheme()
	}

	return (
		<>
			<h1>Welcome to Hacker News' HomiePage</h1>

			<p>Your theme is: <strong>{isLightMode ? 'light' : 'dark'}</strong></p>

			<Button variant="warning" onClick={handleToggleTheme}>Switch theme</Button>

			<Link to="/search">
				<Button variant="dark">Use the Search for Hacker News</Button>
			</Link>
		</>
	)
}

export default HomePage
