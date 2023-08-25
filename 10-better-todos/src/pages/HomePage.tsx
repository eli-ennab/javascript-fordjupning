import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import { toast } from 'react-toastify'

const HomePage = () => {
	return (
		<>
			<h1>Welcome to Better Todos!</h1>

			<ButtonGroup>
				<Button
					variant="light"
					onClick={() => toast("toast")}
				>
						toast
				</Button>
				<Button
					variant="light"
					onClick={() => toast.success("toast")}
				>
						toast
				</Button>
			</ButtonGroup>

			<p>This text does not exist.</p>
		</>
	)
}

export default HomePage
