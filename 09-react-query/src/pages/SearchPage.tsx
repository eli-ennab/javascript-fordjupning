import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'
import HN_ListItem from '../components/HN_ListItem'
import { searchByDate as HN_searchByDate } from '../services/HackerNewsAPI'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import ListGroup from 'react-bootstrap/ListGroup'

const SearchPage = () => {
	// const [page, setPage] = useState(0)
	const [searchInput, setSearchInput] = useState("")
	const [searchParams, setSearchParams] = useSearchParams()

	// get "query=" from URL Search Params
	const query = searchParams.get("query") ?? ""

	const { data: searchResult, isError } = useQuery(
		['search-hn', query],
		() => HN_searchByDate(query),
		{
			enabled: !!query,
		}
	)

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()

		// haxx0r
		if (!searchInput.trim().length) {
			return
		}

		// reset page state
		// setPage(0)

		// set input value as query in searchParams
		setSearchParams({ query: searchInput })    // ?query=tesla
	}

	return (
		<>
			<h1>Hacker Search News</h1>

			<Form className="mb-4" onSubmit={handleSubmit}>
				<Form.Group className="mb-3" controlId="searchQuery">
					<Form.Label>Search Query</Form.Label>
					<Form.Control
						onChange={e => setSearchInput(e.target.value)}
						placeholder="Enter your search query"
						required
						type="text"
						value={searchInput}
					/>
				</Form.Group>

				<div className="d-flex justify-content-end">
					<Button
						variant="success"
						type="submit"
						disabled={!searchInput.trim().length}
					>Search</Button>
				</div>
			</Form>

			{isError && <Alert variant='warning'>Something went wrong.</Alert>}

			{searchResult && (
				<div id="search-result">
					<p>Showing {new Intl.NumberFormat().format(searchResult.nbHits)} search results for "{query}"...</p>

					<ListGroup className="mb-3">
						{searchResult.hits.map(hit => (
							<HN_ListItem
								key={hit.objectID}
								item={hit}
							/>
						))}
					</ListGroup>

					{/* <Pagination
						page={searchResult.page + 1}
						totalPages={searchResult.nbPages}
						hasPreviousPage={page > 0}
						hasNextPage={page + 1 < searchResult.nbPages}
						onPreviousPage={() => { setPage(prevValue => prevValue - 1) }}
						onNextPage={() => { setPage(prevValue => prevValue + 1) }}
					/> */}
				</div>
			)}
		</>
	)
}

export default SearchPage
