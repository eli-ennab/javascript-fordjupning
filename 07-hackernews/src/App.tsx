import Container from 'react-bootstrap/Container'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import SearchPage from './pages/SearchPage'
import NotFound from './pages/NotFound'
import Navigation from './components/Navigation'
import './assets/scss/App.scss'
import { useThemeContext } from './contexts/ThemeProvider'

const App = () => {
	const { isLightMode } = useThemeContext()

	return (
		<div id="App" className={ isLightMode ? 'bg-light text-dark' : ''}>
			<Navigation />

			<Container className="py-3">
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/search" element={<SearchPage />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</Container>
		</div>
	)
}

export default App
