import { useEffect, useState } from 'react'
import Forecast from './components/Forecast'
import SearchCity from './components/SearchCity'
import { getCurrentWeather } from './services/owmapi'
import { ICurrentWeather } from './types'
import Airplane from './assets/images/747.svg'
import './assets/scss/App.scss'

function App() {

	const [currentWeather, setCurrentWeather] = useState<ICurrentWeather>()

	const getWeather = async (data: string) => {
		setCurrentWeather(await getCurrentWeather(data))
	}

	return (
		<div id="app" className="container">
			<SearchCity onSearch={getWeather}/>

		{currentWeather && (
			<Forecast weather={currentWeather}/>
		)}

		</div>
	)
}

export default App
