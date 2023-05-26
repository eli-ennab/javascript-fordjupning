import { useEffect, useState } from 'react'
import Forecast from './components/Forecast'
import SearchCity from './components/SearchCity'
import { getCurrentWeather } from './services/owmapi'
import { ICurrentWeather } from './types'
import Airplane from './assets/images/747.svg'
import './assets/scss/App.scss'

function App() {

	const [currentWeather, setCurrentWeather] = useState<ICurrentWeather | null>(null)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | false>(false)

	const handleSearch = async (data: string) => {
		if (!data) {
			return
		}

		setError('')
		setLoading(true)
		setCurrentWeather(null)

		try {
			setCurrentWeather(await getCurrentWeather(data))
		} catch (e: any) {
			setError(e.response.data.message.toString())
		}
		setLoading(false)
	}

	return (
		<div id="app" className="container">

			<SearchCity onSearch={handleSearch} />


			{ loading && (
				<img src={Airplane} className="img-fluid" alt="Airplane showing when page load" />
			)}

			{ error && (
				<div className="alert alert-dark" role="alert">
					<p>{error}</p>
				</div>
			)}

			{ currentWeather && (
				<Forecast data={currentWeather} />
			)}

		</div>
	)
}

export default App
