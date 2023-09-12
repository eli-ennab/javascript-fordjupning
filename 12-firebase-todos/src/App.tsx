import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import RequireAuth from './components/RequireAuth'
import Navigation from './pages/partials/Navigation'
import EditTodoPage from './pages/EditTodoPage'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import LogoutPage from './pages/LogoutPage'
import NotFound from './pages/NotFound'
import SignupPage from './pages/SignupPage'
import TodoPage from './pages/TodoPage'
import TodosPage from './pages/TodosPage'
import './assets/scss/App.scss'

const App = () => {
	return (
		<div id="App">
			<Navigation />

			<Routes>
				{/* Guest routes */}
				<Route path="*" element={<NotFound />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/logout" element={<LogoutPage />} />
				<Route path="/signup" element={<SignupPage />} />

				{/* Protected routes */}
				<Route path="/" element={
					<RequireAuth>
						<HomePage />
					</RequireAuth>
				}/>

				<Route path="/todos">
					<Route path="" element={
						<RequireAuth>
							<TodosPage />
						</RequireAuth>
					}/>
					<Route path=":id" element={
						<RequireAuth>
							<TodoPage />
						</RequireAuth>
					} />
					<Route path=":id/edit" element={
						<RequireAuth>
							<EditTodoPage />
						</RequireAuth>
					} />
				</Route>

				{/* <Route path="/update-profile" element={
					<RequireAuth>
						<UpdateProfile />
					</RequireAuth>
				}/> */}

			</Routes>

			<ToastContainer
				theme='colored'
			/>
		</div>
	)
}

export default App
