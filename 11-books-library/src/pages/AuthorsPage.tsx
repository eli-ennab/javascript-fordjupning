import WarningAlert from '../components/alerts/WarningAlert'
import PageTransition from '../components/animations/PageTransition'
import BSAuthorTable from '../components/BSAuthorTable'
import useAuthors from '../hooks/useAuthors'

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

			{authors && <BSAuthorTable authors={authors} />}
		</PageTransition>
	)
}

export default AuthorsPage
