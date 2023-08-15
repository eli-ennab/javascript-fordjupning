import Container from 'react-bootstrap/Container'
import Navigation from './pages/partials/Navigation'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import PageNotFound from './pages/PageNotFound'

import './assets/scss/App.scss'

const App = () => {
	return (
		<div id="App">
			<Navigation />
			<Container className="py-3">
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="*" element={<PageNotFound />} />
				</Routes>
			</Container>
		</div>
	)
}

export default App
