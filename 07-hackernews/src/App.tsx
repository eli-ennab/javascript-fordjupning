import classNames from 'classnames'
import Container from 'react-bootstrap/Container'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import RandomDogPage from './pages/RandomDogPage'
import SearchPage from './pages/SearchPage'
import NotFound from './pages/NotFound'
import Navigation from './components/Navigation'
import './assets/scss/App.scss'
import useThemeContext from './hooks/useThemeContext'
import ChuckNorrisPage from './pages/ChuckNorrisPage'

const App = () => {
	const { isLightMode } = useThemeContext()

	const themeClasses = classNames({
		'app': true,
		'bg-light text-dark': isLightMode,
		'not-light-mode': !isLightMode
	})

	return (
		<div id="App" className={themeClasses}>
			<Navigation />

			<Container className="py-3">
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/random-dog" element={<RandomDogPage />} />
					<Route path="/chuck-norris" element={<ChuckNorrisPage />} />
					<Route path="/search" element={<SearchPage />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</Container>
		</div>
	)
}

export default App
