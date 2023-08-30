import { useParams } from 'react-router-dom'
import CreateBookForm from '../components/forms/CreateBookForm'
import PageTransition from '../components/animations/PageTransition'
import WarningAlert from '../components/alerts/WarningAlert'
import useAuthor from '../hooks/useAuthor'
import Card from 'react-bootstrap/Card'

const AuthorPage = () => {
	const { id } = useParams()
	const authorId = Number(id)
	const { data: author, isError, isLoading } = useAuthor(authorId)

	return (
		<PageTransition page="author-page">
			{isError && (
				<WarningAlert>
					An terrible, inexplicable error occurred while fetching authors. It wasn't me!
				</WarningAlert>
			)}

			{isLoading && (
				<p>Loading author...</p>
			)}

			{author && <>
				<h1 className="mb-3">{author.name}</h1>

				<p>Born: {author.date_of_birth}</p>

				<ul>
					{author.books.map(book => (
						<li key={book.id}>{book.title}</li>
					))}
				</ul>
			</>}

			<hr className="mb-5"></hr>

			<Card>
				<Card.Body>
					<Card.Title>Create Book</Card.Title>
					<CreateBookForm />
				</Card.Body>
			</Card>
			</PageTransition>
	)
}

export default AuthorPage
