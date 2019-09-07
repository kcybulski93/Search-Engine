import React, { Component } from 'react';
import './SearchAndTable.css';
import Person from '../Person/Person';

class SearchAndTable extends Component {

  state = {
    person: "",
    minSalary: "",
    maxSalary: "",
    checkedDepartments: [],
    search: [],
  }

  //Handling events
  handlePersonText = (e) => {
    this.setState({
      person: e.target.value
    })
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

  handleCheckbox = (e) => {
    const target = e.target
    const value = target.checked
    const name = target.name
    this.setState({
      [name]: value
    })
    const department = e.target.value
    if (this.state.checkedDepartments.indexOf(department) === -1)
      this.setState(prevState => ({
        checkedDepartments: [...prevState.checkedDepartments, department]
      }))
    else {
      this.setState(prevState => ({
        checkedDepartments: prevState.checkedDepartments.filter(dep => dep !== department)
      }))
    }
  }

  handleSearchClick = () => {
    //First case in which we search only by person
    if ((this.state.person !== "") && (this.state.checkedDepartments.length === 0) &&
      (this.state.minSalary === "") && (this.state.maxSalary === "")) {
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
      const filteredByPerson = concatenationedNameSurname.filter(person => {
        return person.osoba.toLowerCase().indexOf(this.state.person.toLowerCase()) !== -1
      })
      const filteredPersons = filteredByPerson.map(person => {
        return {
          imie: person.osoba.substr(0, person.osoba.indexOf(" ")),
          nazwisko: person.osoba.substr(person.osoba.indexOf(" ") + 1, person.osoba.length),
          dzial: person.dzial,
          wynagrodzenieKwota: person.wynagrodzenieKwota,
          wynagrodzenieWaluta: person.wynagrodzenieWaluta,
          id: person.id
        }
      })
      if (filteredPersons.length > 0) {
        this.setState({
          search: filteredPersons
        })
      }
      else
        this.setState({
          search: [{
            imie: "Not found",
            nazwisko: "",
            dzial: "",
            wynagrodzenieKwota: "",
            wynagrodzenieWaluta: "",
            id: "milion500sto900"
          }]
        })
    }
    //Second case in which we search only by department
    else if ((this.state.person === "") && (this.state.checkedDepartments.length !== 0) &&
      (this.state.minSalary === "") && (this.state.maxSalary === "")) {
      const checkedDepartments = this.state.checkedDepartments
      const props = this.props.staff
      let filteredDepartments = []
      for (let i = 0; i < checkedDepartments.length; i++) {
        filteredDepartments = [...filteredDepartments.concat(props.filter(person => person.dzial === checkedDepartments[i]))]
      }
      this.setState({
        search: filteredDepartments
      })
    }
    //Third case in which we search only by salary
    else if ((this.state.person === "") && (this.state.checkedDepartments.length === 0) &&
      ((this.state.minSalary !== "") || (this.state.maxSalary !== ""))) {
      const filteredBySalary = this.props.staff.filter(person => (
        (person.wynagrodzenieKwota >= this.state.minSalary && person.wynagrodzenieKwota <= this.state.maxSalary)
        ||
        (person.wynagrodzenieKwota >= this.state.minSalary && this.state.maxSalary === "")
        ||
        (this.state.minSalary === "" && person.wynagrodzenieKwota < this.state.maxSalary)
      ))
      if (filteredBySalary.length > 0) {
        this.setState({
          search: filteredBySalary
        })
      }
      else
        this.setState({
          search: [{
            imie: "Not found",
            nazwisko: "",
            dzial: "",
            wynagrodzenieKwota: "",
            wynagrodzenieWaluta: "",
            id: "milion500sto900"
          }]

        })
    }
    //Fourth case in which we search by person and department
    else if ((this.state.person !== "") && (this.state.checkedDepartments.length !== 0) &&
      ((this.state.minSalary === "") && (this.state.maxSalary === ""))) {
      //Filtering by person
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
      const filteredByPerson = concatenationedNameSurname.filter(person => {
        return person.osoba.toLowerCase().indexOf(this.state.person.toLowerCase()) !== -1
      })
      const filteredPersons = filteredByPerson.map(person => {
        return {
          imie: person.osoba.substr(0, person.osoba.indexOf(" ")),
          nazwisko: person.osoba.substr(person.osoba.indexOf(" ") + 1, person.osoba.length),
          dzial: person.dzial,
          wynagrodzenieKwota: person.wynagrodzenieKwota,
          wynagrodzenieWaluta: person.wynagrodzenieWaluta,
          id: person.id
        }
      })
      //Filtering by department
      const checkedDepartments = this.state.checkedDepartments
      const props = this.props.staff
      let filteredDepartments = []
      for (let i = 0; i < checkedDepartments.length; i++) {
        filteredDepartments = [...filteredDepartments.concat(props.filter(person => person.dzial === checkedDepartments[i]))]
      }
      //Checking the same arrays elements (filteredByPersonDepartment)
      let filteredByPersonDepartment = []
      if (filteredPersons.length > 0 && filteredDepartments.length > 0) {
        for (let i = 0; i < filteredPersons.length; i++) {
          filteredByPersonDepartment = [...filteredByPersonDepartment.concat(filteredDepartments.filter(person => person.id === filteredPersons[i].id))]
        }
      }
      else
        filteredByPersonDepartment = [{
          imie: "Not found",
          nazwisko: "",
          dzial: "",
          wynagrodzenieKwota: "",
          wynagrodzenieWaluta: "",
          id: "milion500sto900"
        }]
      this.setState({
        search: filteredByPersonDepartment
      })
    }
    //Fifth case in which we search by department and salary
    else if ((this.state.person === "") && (this.state.checkedDepartments.length !== 0) &&
      ((this.state.minSalary !== "") || (this.state.maxSalary !== ""))) {
      //Filtering by department
      const checkedDepartments = this.state.checkedDepartments
      const props = this.props.staff
      let filteredDepartments = []
      for (let i = 0; i < checkedDepartments.length; i++) {
        filteredDepartments = [...filteredDepartments.concat(props.filter(person => person.dzial === checkedDepartments[i]))]
      }
      //Filtering by salary
      const filteredBySalary = this.props.staff.filter(person => (
        (person.wynagrodzenieKwota >= this.state.minSalary && person.wynagrodzenieKwota <= this.state.maxSalary)
        ||
        (person.wynagrodzenieKwota >= this.state.minSalary && this.state.maxSalary === "")
        ||
        (this.state.minSalary === "" && person.wynagrodzenieKwota < this.state.maxSalary)
      ))
      //Checking the same arrays elements (filteredByDepartmentSalary)
      let filteredByDepartmentSalary = []
      if (filteredBySalary.length > 0 && filteredDepartments.length > 0) {
        for (let i = 0; i < filteredDepartments.length; i++) {
          filteredByDepartmentSalary = [...filteredByDepartmentSalary.concat(filteredBySalary.filter(person => person.id === filteredDepartments[i].id))]
        }
      }
      else
        filteredByDepartmentSalary = [{
          imie: "Not found",
          nazwisko: "",
          dzial: "",
          wynagrodzenieKwota: "",
          wynagrodzenieWaluta: "",
          id: "milion500sto900"
        }]
      this.setState({
        search: filteredByDepartmentSalary
      })
    }
    //Sixth case in which we search by person and salary
    else if ((this.state.person !== "") && (this.state.checkedDepartments.length === 0) &&
      ((this.state.minSalary !== "") || (this.state.maxSalary !== ""))) {
      //Filtering by person
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
      const filteredByPerson = concatenationedNameSurname.filter(person => {
        return person.osoba.toLowerCase().indexOf(this.state.person.toLowerCase()) !== -1
      })
      const filteredPersons = filteredByPerson.map(person => {
        return {
          imie: person.osoba.substr(0, person.osoba.indexOf(" ")),
          nazwisko: person.osoba.substr(person.osoba.indexOf(" ") + 1, person.osoba.length),
          dzial: person.dzial,
          wynagrodzenieKwota: person.wynagrodzenieKwota,
          wynagrodzenieWaluta: person.wynagrodzenieWaluta,
          id: person.id
        }
      })
      //Filtering by salary
      const filteredBySalary = this.props.staff.filter(person => (
        (person.wynagrodzenieKwota >= this.state.minSalary && person.wynagrodzenieKwota <= this.state.maxSalary)
        ||
        (person.wynagrodzenieKwota >= this.state.minSalary && this.state.maxSalary === "")
        ||
        (this.state.minSalary === "" && person.wynagrodzenieKwota < this.state.maxSalary)
      ))
      //Checking the same arrays elements (filteredByPersonSalary)
      let filteredByPersonSalary = []
      if (filteredPersons.length > 0 && filteredBySalary.length > 0) {
        for (let i = 0; i < filteredPersons.length; i++) {
          filteredByPersonSalary = [...filteredByPersonSalary.concat(filteredBySalary.filter(person => person.id === filteredPersons[i].id))]
        }
      }
      else
        filteredByPersonSalary = [{
          imie: "Not found",
          nazwisko: "",
          dzial: "",
          wynagrodzenieKwota: "",
          wynagrodzenieWaluta: "",
          id: "milion500sto900"
        }]
      this.setState({
        search: filteredByPersonSalary
      })
    }
    //Seventh case in which we search by person, department and salary
    else if ((this.state.person !== "") && (this.state.checkedDepartments.length !== 0) &&
      ((this.state.minSalary !== "") || (this.state.maxSalary !== ""))) {
      //Filtering by person
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
      const filteredByPerson = concatenationedNameSurname.filter(person => {
        return person.osoba.toLowerCase().indexOf(this.state.person.toLowerCase()) !== -1
      })
      const filteredPersons = filteredByPerson.map(person => {
        return {
          imie: person.osoba.substr(0, person.osoba.indexOf(" ")),
          nazwisko: person.osoba.substr(person.osoba.indexOf(" ") + 1, person.osoba.length),
          dzial: person.dzial,
          wynagrodzenieKwota: person.wynagrodzenieKwota,
          wynagrodzenieWaluta: person.wynagrodzenieWaluta,
          id: person.id
        }
      })
      //Filtering by department
      const checkedDepartments = this.state.checkedDepartments
      const props = this.props.staff
      let filteredDepartments = []
      for (let i = 0; i < checkedDepartments.length; i++) {
        filteredDepartments = [...filteredDepartments.concat(props.filter(person => person.dzial === checkedDepartments[i]))]
      }
      //Filtering by salary
      const filteredBySalary = this.props.staff.filter(person => (
        (person.wynagrodzenieKwota >= this.state.minSalary && person.wynagrodzenieKwota <= this.state.maxSalary)
        ||
        (person.wynagrodzenieKwota >= this.state.minSalary && this.state.maxSalary === "")
        ||
        (this.state.minSalary === "" && person.wynagrodzenieKwota < this.state.maxSalary)
      ))
      //Checking the same arrays elements (filteredByAll)
      let filteredByPersonDepartment = []
      if (filteredPersons.length > 0 && filteredDepartments.length > 0 && filteredBySalary.length > 0) {
        for (let i = 0; i < filteredPersons.length; i++) {
          filteredByPersonDepartment = [...filteredByPersonDepartment.concat(filteredDepartments.filter(person => person.id === filteredPersons[i].id))]
        }
        let filteredByAll = []
        for (let i = 0; i < filteredBySalary.length; i++) {
          filteredByAll = [...filteredByAll.concat(filteredByPersonDepartment.filter(person => person.id === filteredBySalary[i].id))]
        }
        this.setState({
          search: filteredByAll
        })
      } else
        this.setState({
          search: [{
            imie: "Not found",
            nazwisko: "",
            dzial: "",
            wynagrodzenieKwota: "",
            wynagrodzenieWaluta: "",
            id: "milion500sto900"
          }]
        })
      //Inputs cleaning
      // let checked = ""
      // console.log(checked)
      // for (let i = 0; i < this.state.checkedDepartments.length; i++) {
      //   checked = this.state.checkedDepartments.find(check => check === this.state.checkedDepartments[i])
      //   console.log(checked)
      //   this.setState({
      //     [checked]: false
      //   })
      // }

    }
    //Eight case in which we search nothing (Search All)
    else if ((this.state.person === "") && (this.state.checkedDepartments.length === 0) &&
      ((this.state.minSalary === "") || (this.state.maxSalary === ""))) {
      this.setState({
        search: this.props.staff
      })
    }
  }

  render() {

    const staff = this.props.staff.map(person => <Person key={person.id} person={person} />)
    if (this.state.search != null) {
      var search = this.state.search.map(person => <Person key={person.id} person={person} />)
    }

    const departments = this.props.staff.map(department => department.dzial)

    const uniqueDepartments = [...new Set(departments)];

    const checkboxes = uniqueDepartments.map((checkbox, index) => {
      var check = this.state.checkbox
      return (
        <React.Fragment key={index}>
          <input className="department" type="checkbox" id={index} name={checkbox} value={checkbox} checked={check} onChange={this.handleCheckbox} />
          <label htmlFor={index}>{checkbox}</label>
        </React.Fragment>
      )
    })

    return (
      this.state.search.length
        ?
        <>
          <div className="Search">
            <input className="person" type="text" placeholder="Person..." value={this.state.person} onChange={this.handlePersonText} />
            {checkboxes}
            <input className="salary" type="text" placeholder="Min. Salary..." value={this.state.minSalary} onChange={this.handleMinSalaryText} />
            <input className="salary" type="text" placeholder="Max. Salary..." value={this.state.maxSalary} onChange={this.handleMaxSalaryText} />
            <button className="search" onClick={this.handleSearchClick}>Search</button>
          </div>
          <div className="Table">
            <div className="header">
              <div className="name">NAME</div>
              <div className="surname">SURNAME</div>
              <div className="department">DEPARTMENT</div>
              <div className="salary">SALARY</div>
            </div>
            {search}
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

