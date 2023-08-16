import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

const POSTS =  [
	{ id: 1, title: "Post 1"},
	{ id: 2, title: "Post 2"}
]

// /posts 				>> ["posts"]
// /posts/1 			>> ["posts", post.id]
// /posts?authorId=1 	>> ["posts", { authorId: 1 }]
// /posts/2/comments	>> ["posts", post.id, "comments"]

function App() {
	console.log(POSTS)

	const queryClient = useQueryClient()

	const postsQuery = useQuery({
		// the key needs to be unique
		queryKey: ['posts'],
		queryFn: ({ queryKey }) => wait(1000).then(() => {
			console.log(queryKey)
			return [...POSTS]
		}),
	})

	const newPostMutation = useMutation({
		mutationFn: (title: string) => {
			return wait(1000).then(() => POSTS.push({ id: crypto.randomUUID(),
			title }))
		},
		onSuccess: () => {
			queryClient.invalidateQueries(["posts"])
		}
	})

	if (postsQuery.isLoading) return <h1>Loading...</h1>

	if (postsQuery.isError) return <pre>{JSON.stringify(postsQuery.error)}</pre>

	return (
		<div>
			{postsQuery.data.map(post => (
				<div key={post.id}>{post.title}</div>
			))}

			<button
				disabled={newPostMutation.isLoading}
				onClick={() => newPostMutation.mutate("New Post")}
			>
				Add new
			</button>
		</div>
	)
}

function wait(duration: number) {
	return new Promise(resolve => setTimeout(resolve, duration))
}

export default App
