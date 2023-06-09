import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { NavLink, Link } from 'react-router-dom'
import useThemeContext from '../hooks/useThemeContext'
import Button from 'react-bootstrap/Button'

const Navigation = () => {
	const { isLightMode, toggleTheme } = useThemeContext()

	return (
			<Navbar bg="dark" variant="dark" expand="md">
				<Container>
					<Navbar.Brand as={Link} to="/">Hacker News</Navbar.Brand>

					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="ms-auto">
							<Nav.Link as={NavLink} to="/random-dog">Get Random Dog</Nav.Link>
							<Nav.Link as={NavLink} to="/chuck-norris">Get Chuck Quote</Nav.Link>
							<Nav.Link as={NavLink} end to="/search">Search Hacker News</Nav.Link>
							<Button variant="light" onClick={toggleTheme}>
								{isLightMode ? 'set dark mode' : 'set light mode'}
							</Button>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
	)
}

export default Navigation
