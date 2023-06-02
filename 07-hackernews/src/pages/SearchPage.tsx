import { useState, useEffect, useRef } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import ListGroup from 'react-bootstrap/ListGroup'

const SearchPage = () => {
	const [error, setError] = useState<string|null>(null)
	const [loading, setLoading] = useState(false)
	const [searchInput, setSearchInput] = useState('')
	// const [searchResult, setSearchResult] = useState()

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()

		if (!searchInput.trim().length) {
			return
		}

		// search for hacker news
		try {
			// searchHackerNews(searchInput, 0)
			// setLoading(true)
		} catch (err) {
			// setError(err.message)
		}
	}

	return (
		<>
			<h1>Search for Hacker News</h1>

			<Form
				className="mb-4"
				onSubmit={() => {handleSubmit}}
			>
				<Form.Group className="mb-3" controlId="searchQuery">
					<Form.Label>Search Query</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter your search query"
						onChange={e => setSearchInput(e.target.value)}
						value={searchInput}
						required
					/>
				</Form.Group>

				<div className="d-flex justify-content-end">
					<Button
						variant="light"
						size="lg"
						type="submit"
						disabled={!searchInput.trim().length}>
							Search
					</Button>
				</div>
			</Form>

			{ false && (
				<p>Loading...</p>
			)}

			{ true && (
				<div id="search-result">
					<p>Showing 'HITS' search results for 'QUERY'</p>

					<ListGroup
						className="mb-3"
					>
						{[{}, {}, {}].map(hit => (
							<ListGroup.Item
								action
								href={''}
								key={''}	// 'STORY_ID'
							>
								<h2 className="h3">'TITLE'</h2>
								<p className="text-muted sm mb-0">'POINTS' points by 'AUTHOR' at 'CREATED_AT'</p>
							</ListGroup.Item>
						))}
					</ListGroup>

					<div className="d-flex justify-content-between align-items-center">
						<div className="prev">
							<Button
								variant="dark"
								className="btn-prev"
							>
								Previous page
							</Button>
						</div>

						<div className="page">'PAGE'</div>

						<div className="next">
							<Button
								variant="dark"
								className="btn-next"
							>
								Next page
							</Button>
						</div>
					</div>
				</div>
			)}
		</>
	)
}

export default SearchPage
