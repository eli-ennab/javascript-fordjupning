import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { NavLink, Link } from 'react-router-dom'

const Navigation = () => {
	return (
			<Navbar bg="dark" variant="dark" expand="md">
				<Container>
					<Navbar.Brand as={Link} to="/">Better Todos</Navbar.Brand>

					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="ms-auto">
							<Nav.Link as={NavLink} to="/">Home</Nav.Link>
							<Nav.Link as={NavLink} to="/new">New todo</Nav.Link>
							<Nav.Link as={NavLink} to="/todos">All todos</Nav.Link>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
	)
}

export default Navigation