import React from 'react'
import { useState } from 'react'
import { ICurrentWeather } from '../types'

interface IProps {
	onSearch: (data: string) => void
}

const SearchCity: React.FC<IProps> = ({ onSearch }) => {

	const [search, setSearch] = useState('')

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()

		onSearch(search)

		setSearch('')
	}

	return (
		<div id="search-wrapper">
			<form onSubmit={handleSubmit} id="search-form">
				<div className="input-group">
					<input
						type="text"
						className="form-control"
						placeholder="Enter city to search for" aria-label="City" aria-details="Search for city to show current weather for."
						onChange={e => setSearch(e.target.value)}
						value={search}
					/>

					<button
						disabled={!search.trim()}
						type="submit"
						className="btn btn-light"
					>Search</button>
				</div>
			</form>
		</div>
	)
}

export default SearchCity
