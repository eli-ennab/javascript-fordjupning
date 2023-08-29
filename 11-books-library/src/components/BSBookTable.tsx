import React from 'react'
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
		<Table>
			<thead>
				<tr></tr>
			</thead>
		</Table>
	)
}

export default BSBookTable
