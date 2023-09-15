import Card from "react-bootstrap/Card"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import Container from "react-bootstrap/Container"
import useAuth from "../hooks/useAuth"
import UploadMeme from "../components/UploadMeme"
import useMemes from "../hooks/useMemes"

const HomePage = () => {
	const { currentUser } = useAuth()
	const { data: memes, loading } = useMemes()

	return (
		<Container className="py-3">
			<h1>(W)rapperMemes</h1>
			<h2>When I get sad I stop being sad and be awesome instead</h2>

			{currentUser && <UploadMeme />}

			<hr />

			{loading && <p>Loading...</p>}

			{!loading && memes && memes.length > 0 && (
				<Row xs={1} md={3} lg={4}>
					{memes.map(meme => (
						<Col key={meme._id} className="d-flex mb-4">
							<Card>
								<Card.Header>{meme.name}</Card.Header>

								<a href={meme.url} target="_blank" rel="noreferrer nofollow">
									<Card.Img
										src={meme.url}
									/>
								</a>

								<Card.Footer>
									{Math.round(meme.size / 1024)} kB
								</Card.Footer>
							</Card>
						</Col>
					))}
				</Row>
			)}

		</Container>
	)
}

export default HomePage
