import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { NavLink, Link } from 'react-router-dom'

const Navigation = () => {
	return (
		<Navbar bg="dark" className="navbar" variant="dark" expand="md">
			<Container>
				<Navbar.Brand as={Link} to="/" className="logo">Better Todos</Navbar.Brand>

				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="ms-auto">
						<Nav.Link as={NavLink} end to="/todos">Todos</Nav.Link>
						<Nav.Link as={NavLink} to="/todos/create">Create Todo</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	)
}

export default Navigation
