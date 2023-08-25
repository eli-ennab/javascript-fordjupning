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
					onClick={() => toast("så hungrig")}
				>
						??????????
				</Button>
				<Button
					variant="light"
					onClick={() => toast.success("ät")}
				>
						!!!!!!!!!!!!!!!!!
				</Button>
			</ButtonGroup>

			<p>This text does not exist.</p>
		</>
	)
}

export default HomePage
