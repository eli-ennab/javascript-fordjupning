import { ColumnDef } from '@tanstack/react-table'
import WarningAlert from '../components/alerts/WarningAlert'
import useBooks from '../hooks/useBooks'
import TanstackBasicTable from '../components/TanstackBasicTable'
import { Book } from '../types/BooksAPI.types'

const columns: ColumnDef<Book>[] = [
	{
		accessorKey: 'title',
		header: 'Title',
	},
	{
		accessorKey: 'author.name',
		header: 'Author',
	},
	{
		accessorKey: 'pages',
		header: 'Pages',
	},
	{
		accessorKey: 'published',
		header: 'Published',
	},
]

const BooksPage = () => {
	const { data: books, isError, isLoading } = useBooks()

	return (
		<>
			<h1 className="mb-3">Books</h1>

			{isError && (
				<WarningAlert>
					An terrible, inexplicable error occurred while fetching books. It wasn't me!
				</WarningAlert>
			)}

			{isLoading && (
				<p>Loading books...</p>
			)}

			{books && <TanstackBasicTable columns={columns} data={books} />}
		</>
	)
}

export default BooksPage
