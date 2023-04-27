import { useState } from 'react'
const Salary = () => {
	const [salary, setSalary] = useState(10)
	const [showSalary, setShowsalary] = useState(false)

	const handleChangeSalary = (amount: number) => {
		if (salary + amount < 5) {
			return setSalary(5)
		}

		setSalary(salary + amount)
	}

	return (
		<div>
			<button className="btn btn-light" onClick={() => setShowsalary(!showSalary)}>{showSalary ? "Hide salary" : "Show salary"}</button>

			{ showSalary && (
				<>
					<h3>Salary per hour: {salary} &euro;</h3>

					{salary < 10 && (
					<div className="alert alert-warning">You are not getting paid enough.</div>
					)}

					<div className="buttons">
						<div className="mb-1">
							<button className="btn btn-dark btn-lg m-1" onClick={ () => { handleChangeSalary(1) } }>
								Raise 1 &euro;
							</button>
							<button className="btn btn-dark btn-lg m-1" onClick={ () => { handleChangeSalary(-1) } }>
								Decrease 1 &euro;
							</button>
						</div>
						<div className="mb-1">
							<button className="btn btn-dark btn-lg m-1" onClick={ () => { handleChangeSalary(5) } }>
								Raise 5 &euro;
							</button>
							<button className="btn btn-dark btn-lg m-1" onClick={ () => { handleChangeSalary(-5) } }>
								Decrease 5 &euro;
							</button>
						</div>
					</div>
				</>
			)}
		</div>
	)
}

export default Salary
