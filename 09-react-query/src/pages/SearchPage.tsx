// import { useEffect, useState } from 'react'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import ListGroup from 'react-bootstrap/ListGroup'
// import { useSearchParams } from 'react-router-dom'
// import { searchByDate as HN_searchByDate } from '../services/HackerNewsAPI'
import { HN_SearchResponse } from '../types/index.types'

const SearchPage = () => {

	return (
		<>
			<h1>Hacker News Search</h1>

			{/* <Form className="mb-4" onSubmit={handleSubmit}>
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
						variant="light"
						type="submit"
						disabled={!searchInput.trim().length}
					>Search</Button>
				</div>
			</Form>

			{ error && <Alert variant="warning">{error}</Alert>}

			{ loading && <p>Loading...</p>}

			{ searchResult && (
				<div id="search-result">
					<p>Showing {searchResult.nbHits} search results for "{query}"...</p>

					<ListGroup className="mb-3">
						{searchResult.hits.map(hit => (
							<ListGroup.Item
								action
								href={hit.url}
								key={hit.objectID}
							>
								<h2 className="h3">{hit.title}</h2>
								<p className="text-muted small mb-0">
									{hit.points} points by {hit.author} at {hit.created_at}
								</p>
							</ListGroup.Item>
						))}
					</ListGroup>

					<Pagination
						page={searchResult.page + 1}
						totalPages={searchResult.nbPages}
						hasPreviousPage={page > 0}
						hasNextPage={page + 1 < searchResult.nbPages}
						onPreviousPage={() => {setPage(prevValue => prevValue - 1)}}
						onNextPage={() => {setPage(prevValue => prevValue + 1)}}
					/>
				</div>
			)} */}
		</>
	)
}

export default SearchPage
