import React from 'react'
import { useState } from 'react'
import { ICurrentWeather } from '../types'

interface IProps {
	onSearch: (data: string) => void
}

const SearchCity: React.FC<IProps> = ({onSearch}) => {

	const [newSearch, setNewSearch] = useState('')

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()

		onSearch(newSearch)

		setNewSearch('')
	}

	return (
		<div id="search-wrapper">
			<form onSubmit={handleSubmit} id="search-form">
				<div className="input-group">
					<input
						type="text"
						className="form-control"
						placeholder="Enter city to search for" aria-label="City" aria-details="Search for city to show current weather for."
						onChange={e => setNewSearch(e.target.value)}
						value={newSearch}
					/>

					<button
						disabled={!newSearch.trim()}
						type="submit"
						className="btn btn-light"
					>Search</button>
				</div>
			</form>
		</div>
	)
}

export default SearchCity
