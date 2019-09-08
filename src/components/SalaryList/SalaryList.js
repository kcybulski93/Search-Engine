import React, { Component } from 'react';
import './SalaryList.css';

class SalaryList extends Component {
	state = {
	}
	//----------------EXPERIMENT------------------------------------------------------------------
	// componentDidMount() {
	// 	const allDepartments = this.props.staff.map(person => person.dzial)
	// 	const uniqueDepartments = [...new Set(allDepartments)]
	// 	let department = ""
	// 	let peopleInTheDepartment = []
	// 	let allCurrenciesInTheDepartment = []
	// 	let uniqueCurrenciesInTheDepartment = []
	// 	let currency = ""
	// 	let peopleEarningInGivenCurrency = []
	// 	let salariesInTheDepartment = []
	// 	let totalEarningsInTheDepartment = 0

	// 	for (let i = 0; i < uniqueDepartments.length; i++) {
	// 		department = uniqueDepartments.find(department => department === uniqueDepartments[i])
	// 		peopleInTheDepartment = this.props.staff.filter(person => person.dzial === uniqueDepartments[i])
	// 		allCurrenciesInTheDepartment = peopleInTheDepartment.map(person => person.wynagrodzenieWaluta)
	// 		uniqueCurrenciesInTheDepartment = [...new Set(allCurrenciesInTheDepartment)]
	// 		for (let j = 0; j < uniqueCurrenciesInTheDepartment.length; j++) {
	// 			currency = uniqueCurrenciesInTheDepartment.find(currency => currency === uniqueCurrenciesInTheDepartment[j])
	// 			peopleEarningInGivenCurrency = peopleInTheDepartment.filter(person => person.wynagrodzenieWaluta === uniqueCurrenciesInTheDepartment[j])
	// 			salariesInTheDepartment = peopleEarningInGivenCurrency.map(person => person.wynagrodzenieKwota)
	// 			totalEarningsInTheDepartment = 0
	// 			for (let k = 0; k < salariesInTheDepartment.length; k++) {
	// 				totalEarningsInTheDepartment += parseFloat(salariesInTheDepartment[k])
	//				console.log(totalEarningsInTheDepartment)
	// 			}
	//			console.log(totalEarningsInTheDepartment)
	// 			this.setState({
	// 				[department]: [totalEarningsInTheDepartment, currency]
	// 			})
	// 		}
	// 	}
	// }
	//-------------------------------------------------------------------------------------------------------
	render() {
		const allDepartments = this.props.staff.map(person => person.dzial)
		const uniqueDepartments = [...new Set(allDepartments)]
		let department = ""
		let peopleInTheDepartment = []
		let allCurrenciesInTheDepartment = []
		let uniqueCurrenciesInTheDepartment = []
		let currency = ""
		let peopleEarningInGivenCurrency = []
		let salariesInTheDepartment = []
		let totalEarningsInTheDepartment = 0

		for (let i = 0; i < uniqueDepartments.length; i++) {
			department = uniqueDepartments.find(department => department === uniqueDepartments[i])
			peopleInTheDepartment = this.props.staff.filter(person => person.dzial === uniqueDepartments[i])
			allCurrenciesInTheDepartment = peopleInTheDepartment.map(person => person.wynagrodzenieWaluta)
			uniqueCurrenciesInTheDepartment = [...new Set(allCurrenciesInTheDepartment)]
			for (let j = 0; j < uniqueCurrenciesInTheDepartment.length; j++) {
				currency = uniqueCurrenciesInTheDepartment.find(currency => currency === uniqueCurrenciesInTheDepartment[j])
				peopleEarningInGivenCurrency = peopleInTheDepartment.filter(person => person.wynagrodzenieWaluta === uniqueCurrenciesInTheDepartment[j])
				salariesInTheDepartment = peopleEarningInGivenCurrency.map(person => person.wynagrodzenieKwota)
				totalEarningsInTheDepartment = 0
				for (let k = 0; k < salariesInTheDepartment.length; k++) {
					totalEarningsInTheDepartment += parseFloat(salariesInTheDepartment[k])
				}
			}
		}

		const row = <React.Fragment>
			<div className="row">
				<div className="department">dupa</div>
				<div className="salary">dupa</div>
				<div style={{ clear: "both" }} > </div>
			</div>
		</React.Fragment >

		return (
			<>
				<div className="SalaryList">
					<div className="row">
						{row}
						{row}
					</div>
				</div>
				<div style={{ clear: "both" }} > </div>

			</>
		);
	}
}

export default SalaryList;