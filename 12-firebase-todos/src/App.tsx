import Container from 'react-bootstrap/Container'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Navigation from './pages/partials/Navigation'
import EditTodoPage from './pages/EditTodoPage'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import NotFound from './pages/NotFound'
import TodoPage from './pages/TodoPage'
import TodosPage from './pages/TodosPage'
import SignupPage from './pages/SignupPage'
import './assets/scss/App.scss'

const App = () => {
	return (
		<div id="App">
			<Navigation />

			<Container className="py-3">
				<Routes>
					<Route path="/" element={<HomePage />} />

					{/* /signup */}
					<Route path="/signup" element={<SignupPage />} />

					{/* /login */}
					<Route path="/login" element={<LoginPage />} />

					<Route path="/todos">
						{/* /todos */}
						<Route path="" element={<TodosPage />} />

						{/* /todos/:id */}
						<Route path=":id" element={<TodoPage />} />

						{/* /todos/:id/edit */}
						<Route path=":id/edit" element={<EditTodoPage />} />

					</Route>

					<Route path="*" element={<NotFound />} />
				</Routes>
			</Container>

			<ToastContainer
				theme='colored'
			/>
		</div>
	)
}

export default App
