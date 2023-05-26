import React from 'react'
import forecastBanner from '../assets/images/forecast-banner.png'
import { ICurrentWeather, IWeather } from '../types'

interface IProps {
	data: ICurrentWeather
}

const Forecast: React.FC<IProps> = ({ data }) => {
	const freshness = new Date(data.dt * 1000).toLocaleString()

	return (
		<div id="forecast">
			<div className="card">

				<img src={forecastBanner} className="card-img-top" alt="Daytime, nighttime, daytime, nighttime"/>

				<div className="card-body">
					<h5 className="card-title" id="location">
						<span id="city">{data.name}</span>,
						<span id="country">{data.sys.country}</span>
					</h5>
					<p className="temp">
						<span id="temperature">{data.main.temp}</span>
						&deg;C
					</p>
					<p className="humidity">
						<span id="humidity">{data.main.humidity}</span> % humidity
					</p>
					<p className="wind">
						<span id="windspeed">{data.wind.speed}</span> m/s
					</p>

					<ul className="conditions">
						{data.weather.map(condition => {
							const weatherIconUrl = `https://openweathermap.org/img/wn/${condition.icon}@2x.png`

							return (
								<li key={condition.id}>
									<img
										src={weatherIconUrl}
										title={condition.main}
										alt={condition.main}
									/>
									{condition.description}
								</li>
							)
						})}
					</ul>

					<p className="text-muted small">
						<span>
							Last updated: {freshness}
						</span>
					</p>
				</div>

			</div>
		</div>
	)
}

export default Forecast
