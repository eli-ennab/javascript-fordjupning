import Container from 'react-bootstrap/Container'
import { Routes, Route } from 'react-router-dom'
import './assets/scss/App.scss'
import HomePage from './pages/HomePage'
import Navigation from './components/Navigation'
import NotFound from './pages/NotFound'
import TodosPage from './pages/TodosPage'

const App = () => {
	return (
		<div id="App">
			<Navigation />

			<Container className="py-3">
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/todos" element={<TodosPage />} />

					<Route path="*" element={<NotFound />} />
				</Routes>
			</Container>
		</div>
	)
}

export default App
