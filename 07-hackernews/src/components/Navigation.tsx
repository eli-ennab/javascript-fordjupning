import { useContext } from 'react'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { NavLink, Link } from 'react-router-dom'
import { ThemeContext } from '../contexts/ThemeProvider'
import Button from 'react-bootstrap/Button'

const Navigation = () => {
	const { isLightMode, toggleTheme } = useContext(ThemeContext)

	return (
			<Navbar bg="dark" variant="dark" expand="md">
				<Container>
					<Navbar.Brand as={Link} to="/">Hacker News</Navbar.Brand>

					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="ms-auto">
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
