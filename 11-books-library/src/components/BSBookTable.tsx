import React from 'react'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import { Book } from '../types/BooksAPI.types'

interface IProps {
	books: Book[]
}

const BSBookTable: React.FC<IProps> = ({ books }) => {
	if (!books.length) {
		return <p>No books.</p>
	}

	return (
		<Table responsive striped bordered hover>
			<thead>
				<th>Title</th>
				<th>Author</th>
				<th>Author birthdate</th>
				<th>Pages</th>
				<th>Published</th>
				<th></th>
			</thead>
			<tbody>
				{ books && books.map(book => (
					<tr key={book.id}>
						<td>{book.title}</td>
						<td>{book.author.name}</td>
						<td>{book.author.date_of_birth}</td>
						<td>{book.pages}</td>
						<td>{book.published}</td>
						<td>
							<Button variant="primary">&raquo;</Button>
						</td>
					</tr>
				))}
			</tbody>
		</Table>
	)
}

export default BSBookTable
