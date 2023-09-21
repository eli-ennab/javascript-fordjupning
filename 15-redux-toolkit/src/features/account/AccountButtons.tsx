import Button from "react-bootstrap/Button"
import ButtonGroup from "react-bootstrap/ButtonGroup"
import { useAppDispatch } from "../../app/hooks"
import { deposit, withdraw } from "./accountSlice"
import { useAppSelector } from "../../app/hooks"

const AccountButtons = () => {
	const dispatch = useAppDispatch()
	const accountState = useAppSelector(state => state.account)

	return (
		<>
			<ButtonGroup>
				<Button variant="warning" disabled={accountState.balance < 5 ? true : false} onClick={() => dispatch( withdraw(5) )}>$5</Button>
				<Button variant="warning" disabled={accountState.balance < 1 ? true : false}onClick={() => dispatch( withdraw(1) )}>$1</Button>
			</ButtonGroup>
			<ButtonGroup>
				<Button variant="success" onClick={() => dispatch( deposit(1) )}>$1</Button>
				<Button variant="success" onClick={() => dispatch( deposit(5) )}>$5</Button>
			</ButtonGroup>
		</>
	)
}

export default AccountButtons
