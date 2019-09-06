import React, { Component } from 'react';
import './SearchAndTable.css';
import Person from '../Person/Person';

class SearchAndTable extends Component {
  state = {
    person: "",
    minSalary: "",
    maxSalary: "",
    checkedDepartments: "",
    filteredPersons: null,
    filteredDepartments: [],
    filteredSalary: [],
  }

  handlePersonText = (e) => {
    this.setState({
      person: e.target.value
    })
  }

  handleSearchClick = () => {
    const concatenationedNameSurname = this.props.staff.map(person => {
      return {
        zmienna: "",
        osoba: person.imie + " " + person.nazwisko,
        dzial: person.dzial,
        wynagrodzenieKwota: person.wynagrodzenieKwota,
        wynagrodzenieWaluta: person.wynagrodzenieWaluta,
        id: person.id
      }
    })
    const filteredConcatenationedNameSurname = concatenationedNameSurname.filter(person => {
      return person.osoba.toLowerCase().indexOf(this.state.person.toLowerCase()) !== -1
    })
    const filteredPersons = filteredConcatenationedNameSurname.map(person => {
      return {
        imie: person.osoba.substr(0, person.osoba.indexOf(" ")),
        nazwisko: person.osoba.substr(person.osoba.indexOf(" ") + 1, person.osoba.length),
        dzial: person.dzial,
        wynagrodzenieKwota: person.wynagrodzenieKwota,
        wynagrodzenieWaluta: person.wynagrodzenieWaluta,
        id: person.id
      }
    })
    this.setState({
      filteredPersons
    })
  }

  handleCheckbox = (e) => {
    const department = e.target.value
    if (this.state.checkedDepartments.indexOf(department) === -1)
      this.setState(prevState => ({
        checkedDepartments: [...prevState.checkedDepartments, department]
      }))
    else
      this.setState(prevState => ({
        checkedDepartments: prevState.checkedDepartments.filter(dep => dep !== department)
      }))
  }

  handleDClick = () => {
    this.setState({
      filteredDepartments: []
    })
    const checkedDepartments = this.state.checkedDepartments
    const props = this.props.staff
    for (let i = 0; i < checkedDepartments.length; i++)
      if (this.state.filteredDepartments.filter(person => person.dzial === checkedDepartments[i]))
        this.setState(prevState => ({
          filteredDepartments: [...prevState.filteredDepartments.concat(props.filter(person => person.dzial === checkedDepartments[i]))]
        }))
  }

  handleMinSalaryText = (e) => {
    this.setState({
      minSalary: e.target.value
    })
  }

  handleMaxSalaryText = (e) => {
    this.setState({
      maxSalary: e.target.value
    })
  }

  handleSClick = () => {
    const filteredSalary = this.props.staff.filter(person => (
      (person.wynagrodzenieKwota >= this.state.minSalary && person.wynagrodzenieKwota <= this.state.maxSalary)
      ||
      (person.wynagrodzenieKwota >= this.state.minSalary && this.state.maxSalary === "")
      ||
      (this.state.minSalary === "" && person.wynagrodzenieKwota < this.state.maxSalary)
    ))
    this.setState({
      filteredSalary
    })
  }

  render() {
    const staff = this.props.staff.map(person => <Person key={person.id} person={person} />)
    if (this.state.filteredPersons != null) {
      var filteredPersons = this.state.filteredPersons.map(person => <Person key={person.id} person={person} />)
    }

    const departments = this.props.staff.map(department => department.dzial)

    const uniqueDepartments = [...new Set(departments)];

    const checkboxes = uniqueDepartments.map((checkbox, index) => {
      return (
        <React.Fragment key={index}>
          <input className="department" type="checkbox" id={index} value={checkbox} onChange={this.handleCheckbox} />
          <label htmlFor={index}>{checkbox}</label>
        </React.Fragment>
      )
    })

    return (
      this.state.filteredPersons
        ?
        <>
          <div className="Search">
            <input className="person" type="text" placeholder="Person..." value={this.state.person} onChange={this.handlePersonText} />
            {checkboxes}
            <input className="salary" type="text" placeholder="Min. Price..." value={this.state.minSalary} onChange={this.handleSalaryText} />
            <input className="salary" type="text" placeholder="Max. Price..." value={this.state.maxSalary} onChange={this.handleSalaryText} />
            <button className="search" onClick={this.handleSearchClick}>Search</button>
            <button className="search" onClick={this.handleDClick}>D</button>
            <button className="search" onClick={this.handleSClick}>S</button>
          </div>
          <div className="Table">
            <div className="header">
              <div className="name">NAME</div>
              <div className="surname">SURNAME</div>
              <div className="department">DEPARTMENT</div>
              <div className="salary">SALARY</div>
            </div>
            {filteredPersons}
          </div>
        </>
        :
        <>
          <div className="Search">
            <input className="person" type="text" placeholder="Person..." value={this.state.person} onChange={this.handlePersonText} />
            {checkboxes}
            <input className="salary" type="text" placeholder="Min. Salary..." value={this.state.minSalary} onChange={this.handleMinSalaryText} />
            <input className="salary" type="text" placeholder="Max. Salary..." value={this.state.maxSalary} onChange={this.handleMaxSalaryText} />
            <button className="search" onClick={this.handleSearchClick}>Search</button>
            <button className="search" onClick={this.handleDClick}>D</button>
            <button className="search" onClick={this.handleSClick}>S</button>
          </div>
          <div className="Table">
            <div className="header">
              <div className="name">NAME</div>
              <div className="surname">SURNAME</div>
              <div className="department">DEPARTMENT</div>
              <div className="salary">SALARY</div>
            </div>
            {staff}
          </div>
        </>

    );
  }
}

export default SearchAndTable;

