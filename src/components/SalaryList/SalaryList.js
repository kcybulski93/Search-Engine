import React, { Component } from 'react';
import './SalaryList.css';

class SalaryList extends Component {
	state = {
	}
	//----------------EXPERIMENTING WITH UNLIMITED DEPARTMENTS AND CURRENCIES------------------------------------------------------------------
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
	//------------------------------------------------------------------------------------------------------------------------
	render() {

		const staff = this.props.staff

		//Total salary of IT department calculation
		const itPeople = staff.filter(person => person.department === "IT")
		const itPeopleEarningInPLN = itPeople.filter(person => person.currency === "PLN")
		const itPeopleEarningInEUR = itPeople.filter(person => person.currency === "EUR")
		const itPeopleEarningInUSD = itPeople.filter(person => person.currency === "USD")
		let totalSalaryOfItInPLN = 0
		for (let i = 0; i < itPeopleEarningInPLN.length; i++) {
			totalSalaryOfItInPLN += itPeopleEarningInPLN[i].salary
		}
		let totalSalaryOfItInEUR = 0
		for (let i = 0; i < itPeopleEarningInEUR.length; i++) {
			totalSalaryOfItInEUR += itPeopleEarningInEUR[i].salary
		}
		let totalSalaryOfItInUSD = 0
		for (let i = 0; i < itPeopleEarningInUSD.length; i++) {
			totalSalaryOfItInUSD += itPeopleEarningInUSD[i].salary
		}

		//Total salary of Administration department calculation
		const admPeople = staff.filter(person => person.department === "Administracja" || person.department === "Administration")
		const admPeopleEarningInPLN = admPeople.filter(person => person.currency === "PLN")
		const admPeopleEarningInEUR = admPeople.filter(person => person.currency === "EUR")
		const admPeopleEarningInUSD = admPeople.filter(person => person.currency === "USD")
		let totalSalaryOfAdmInPLN = 0
		for (let i = 0; i < admPeopleEarningInPLN.length; i++) {
			totalSalaryOfAdmInPLN += admPeopleEarningInPLN[i].salary
		}
		let totalSalaryOfAdmInEUR = 0
		for (let i = 0; i < admPeopleEarningInEUR.length; i++) {
			totalSalaryOfAdmInEUR += admPeopleEarningInEUR[i].salary
		}
		let totalSalaryOfAdmInUSD = 0
		for (let i = 0; i < admPeopleEarningInUSD.length; i++) {
			totalSalaryOfAdmInUSD += admPeopleEarningInUSD[i].salary
		}

		//Total salary of Sales department calculation
		const salesPeople = staff.filter(person => person.department === "Handlowiec" || person.department === "Sales")
		const salesPeopleEarningInPLN = salesPeople.filter(person => person.currency === "PLN")
		const salesPeopleEarningInEUR = salesPeople.filter(person => person.currency === "EUR")
		const salesPeopleEarningInUSD = salesPeople.filter(person => person.currency === "USD")
		let totalSalaryOfSalesInPLN = 0
		for (let i = 0; i < salesPeopleEarningInPLN.length; i++) {
			totalSalaryOfSalesInPLN += salesPeopleEarningInPLN[i].salary
		}
		let totalSalaryOfSalesInEUR = 0
		for (let i = 0; i < salesPeopleEarningInEUR.length; i++) {
			totalSalaryOfSalesInEUR += salesPeopleEarningInEUR[i].salary
		}
		let totalSalaryOfSalesInUSD = 0
		for (let i = 0; i < salesPeopleEarningInUSD.length; i++) {
			totalSalaryOfSalesInUSD += salesPeopleEarningInUSD[i].salary
		}

		//Total salary of All department calculation
		let totalSalaryOfAllInPLN = totalSalaryOfItInPLN + totalSalaryOfAdmInPLN + totalSalaryOfSalesInPLN
		let totalSalaryOfAllInEUR = totalSalaryOfItInEUR + totalSalaryOfAdmInEUR + totalSalaryOfSalesInEUR
		let totalSalaryOfAllInUSD = totalSalaryOfItInUSD + totalSalaryOfAdmInUSD + totalSalaryOfSalesInUSD




		return (
			<>
				<div className="SalaryList">
					<div className="row">
						<div className="department">Total salary of IT department:</div>
						<div className="salary">
							{totalSalaryOfItInPLN ? <div>{totalSalaryOfItInPLN} PLN</div> : null}
							{totalSalaryOfItInEUR ? <div>{totalSalaryOfItInEUR} EUR</div> : null}
							{totalSalaryOfItInUSD ? <div>{totalSalaryOfItInUSD} USD</div> : null}
						</div>
						<div style={{ clear: "both" }} > </div>
					</div>
					<div className="row">
						<div className="department">Total salary of Administration department:</div>
						<div className="salary">
							{totalSalaryOfAdmInPLN ? <div>{totalSalaryOfAdmInPLN} PLN</div> : null}
							{totalSalaryOfAdmInEUR ? <div>{totalSalaryOfAdmInEUR} EUR</div> : null}
							{totalSalaryOfAdmInUSD ? <div>{totalSalaryOfAdmInUSD} USD</div> : null}
						</div>
						<div style={{ clear: "both" }} > </div>
					</div>
					<div className="row">
						<div className="department">Total salary of Sales department:</div>
						<div className="salary">
							{totalSalaryOfSalesInPLN ? <div>{totalSalaryOfSalesInPLN} PLN</div> : null}
							{totalSalaryOfSalesInEUR ? <div>{totalSalaryOfSalesInEUR} EUR</div> : null}
							{totalSalaryOfSalesInUSD ? <div>{totalSalaryOfSalesInUSD} USD</div> : null}
						</div>
						<div style={{ clear: "both" }} > </div>
					</div>
					<div className="row">
						<div className="department">Total salary of All departments:</div>
						<div className="salary">
							{totalSalaryOfAllInPLN ? <div>{totalSalaryOfAllInPLN} PLN</div> : null}
							{totalSalaryOfAllInEUR ? <div>{totalSalaryOfAllInEUR} EUR</div> : null}
							{totalSalaryOfAllInUSD ? <div>{totalSalaryOfAllInUSD} USD</div> : null}
						</div>
						<div style={{ clear: "both" }} > </div>
					</div>
				</div>
			</>
		);
	}
}

export default SalaryList;