import { createColumnHelper } from '@tanstack/react-table'
import WarningAlert from '../components/alerts/WarningAlert'
import PageTransition from '../components/animations/PageTransition'
// import BSAuthorTable from '../components/BSAuthorTable'
import TanstackSortableTable from '../components/TanstackSortableTable'
import useAuthors from '../hooks/useAuthors'
import { Author } from '../types/BooksAPI.types'

const columnHelper = createColumnHelper<Author>()

const columns = [
	columnHelper.accessor('id', {
		header: 'ID',
	}),
	columnHelper.group({
		header: 'Author Details',
		columns: [
			columnHelper.accessor('name', {
				header: 'Name',
			}),
			columnHelper.accessor('date_of_birth', {
				header: 'Date of birth',
			}),
		],
	}),
	/*
	columnHelper.display({
		id: 'actions',
		cell: (props) => (
			<div className="flex justify-end">
				<button className="btn btn-sm btn-primary">View</button>
				<button className="btn btn-sm btn-warning ml-2">Edit</button>
			</div>
		),
	})
	*/
]

const AuthorsPage = () => {
	const { data: authors, isError, isLoading } = useAuthors()

	return (
		<PageTransition page="authors-page">
			<h1 className="mb-3">Authors</h1>

			{isError && (
				<WarningAlert>
					Something went wrong.
				</WarningAlert>
			)}

			{isLoading && (
				<p>Loading authors...</p>
			)}

			{authors && <TanstackSortableTable columns={columns} data={authors} />}
		</PageTransition>
	)
}

export default AuthorsPage
