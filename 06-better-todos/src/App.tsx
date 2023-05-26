import Container from 'react-bootstrap/Container'
import { Routes, Route } from 'react-router-dom'
import './assets/scss/App.scss'
import HomePage from './pages/HomePage'
import TodosPage from './pages/TodosPage'
import Navigation from './components/Navigation'

const App = () => {
	return (
		<div id="App">
			<Navigation />

			<Container className="py-3">
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/todos" element={<TodosPage />} />
				</Routes>
			</Container>
		</div>
	)
}

export default App
