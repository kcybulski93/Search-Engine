import React, { Component } from 'react';
import './SearchAndTable.css';
import Person from '../Person/Person';

class SearchAndTable extends Component {

  state = {
    person: "",
    minSalary: "",
    maxSalary: "",
    checkedDepartments: [],
    checkedIT: false,
    checkedAdministrator: false,
    checkedTrader: false,
    search: [],
    expanded: false
  }

  handleChange = (e) => {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value
    const name = target.name;
    this.setState({
      [name]: value
    })
    if (target.type === "checkbox") {
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
  }

  showCheckboxes = () => {
    var checkboxes = document.getElementById("checkboxes");
    if (!this.state.expanded) {
      checkboxes.style.display = "block";
      this.setState({
        expanded: true
      })
    } else {
      checkboxes.style.display = "none";
      this.setState({
        expanded: false
      })
    }
  }

  filteringByPeople() {
    const concatNameSurname = this.props.staff.map(person => {
      return {
        zmienna: "",
        osoba: person.name + " " + person.surname,
        department: person.department,
        salary: person.salary,
        curreny: person.curreny,
        id: person.id
      }
    })
    const filteredByPerson = concatNameSurname.filter(person => {
      return person.osoba.toLowerCase().indexOf(this.state.person.toLowerCase()) !== -1
    })
    const filteredByPeople = filteredByPerson.map(person => {
      return {
        name: person.osoba.substr(0, person.osoba.indexOf(" ")),
        surname: person.osoba.substr(person.osoba.indexOf(" ") + 1, person.osoba.length),
        department: person.department,
        salary: person.salary,
        curreny: person.curreny,
        id: person.id
      }
    })
    return filteredByPeople
  }

  filteringByDepartments() {
    const checkedDepartments = this.state.checkedDepartments
    const props = this.props.staff
    let filteredByDepartments = []
    for (let i = 0; i < checkedDepartments.length; i++) {
      filteredByDepartments = [...filteredByDepartments.concat(props.filter(person => person.department === checkedDepartments[i]))]
    }
    return filteredByDepartments
  }

  filteringBySalaries() {
    let filteredBySalaries = []
    const { minSalary, maxSalary } = this.state
    if ((minSalary !== "") || (maxSalary !== ""))
      filteredBySalaries = this.props.staff.filter(person => (
        (person.salary >= minSalary && person.salary <= maxSalary)
        ||
        (person.salary >= minSalary && maxSalary === "")
        ||
        (minSalary === "" && person.salary < maxSalary)
      ))
    return filteredBySalaries
  }

  cleaningInput() {
    this.setState({
      person: "",
      minSalary: "",
      maxSalary: "",
      checkedDepartments: [],
      checkedIT: false,
      checkedAdministrator: false,
      checkedTrader: false,
      expanded: false,
    })
    var checkboxes = document.getElementById("checkboxes");
    checkboxes.style.display = "none";
  }

  displayingNotFound() {
    this.setState({
      search: [{
        name: "Not found",
        surname: "",
        department: "",
        salary: "",
        curreny: "",
        id: "milion500sto900"
      }]
    })
  }

  handleSearchClick = () => {

    //FIRST case in wchich we search only by PEOPLE
    if ((this.state.person !== "") && (this.state.checkedDepartments.length === 0) &&
      ((this.state.minSalary === "") && (this.state.maxSalary === ""))) {
      const filteredByPeople = this.filteringByPeople()
      this.cleaningInput()
      if (filteredByPeople.length !== 0)
        this.setState({
          search: filteredByPeople
        })
      else
        this.displayingNotFound()
    }

    //SECOND case in wchich we search only by DEPARTMENTS
    else if ((this.state.person === "") && (this.state.checkedDepartments.length !== 0) &&
      ((this.state.minSalary === "") && (this.state.maxSalary === ""))) {
      const filteredByDepartments = this.filteringByDepartments()
      this.cleaningInput()
      if (filteredByDepartments.length !== 0)
        this.setState({
          search: filteredByDepartments
        })
      else
        this.displayingNotFound()
    }

    //THIRD case in wchich we search only by SALARIES
    else if ((this.state.person === "") && (this.state.checkedDepartments.length === 0) &&
      ((this.state.minSalary !== "") || (this.state.maxSalary !== ""))) {
      const filteredBySalaries = this.filteringBySalaries()
      this.cleaningInput()
      if (filteredBySalaries.length !== 0)
        this.setState({
          search: filteredBySalaries
        })
      else
        this.displayingNotFound()
    }

    //FOURTH case in which we search by PEOPLE and DEPARTMENTS
    else if ((this.state.person !== "") && (this.state.checkedDepartments.length !== 0) &&
      ((this.state.minSalary === "") && (this.state.maxSalary === ""))) {
      const filteredByPeople = this.filteringByPeople()
      const filteredByDepartments = this.filteringByDepartments()
      let filteredByPersonDepartment = []
      for (let i = 0; i < filteredByPeople.length; i++) {
        filteredByPersonDepartment = [...filteredByPersonDepartment.concat(filteredByDepartments.filter(person => person.id === filteredByPeople[i].id))]
      }
      this.cleaningInput()
      if (filteredByPersonDepartment.length !== 0)
        this.setState({
          search: filteredByPersonDepartment
        })
      else
        this.displayingNotFound()
    }

    //FIFTH case in which we search by PEOPLE and SALARIES
    else if ((this.state.person !== "") && (this.state.checkedDepartments.length === 0) &&
      ((this.state.minSalary !== "") || (this.state.maxSalary !== ""))) {
      const filteredByPeople = this.filteringByPeople()
      const filteredBySalaries = this.filteringBySalaries()
      let filteredByPersonSalary = []
      for (let i = 0; i < filteredByPeople.length; i++) {
        filteredByPersonSalary = [...filteredByPersonSalary.concat(filteredBySalaries.filter(person => person.id === filteredByPeople[i].id))]
      }
      this.cleaningInput()
      if (filteredByPersonSalary.length !== 0)
        this.setState({
          search: filteredByPersonSalary
        })
      else
        this.displayingNotFound()
    }

    //SIXTH case in which we search by DEPARTMENTS and SALARIES
    else if ((this.state.person === "") && (this.state.checkedDepartments.length !== 0) &&
      ((this.state.minSalary !== "") || (this.state.maxSalary !== ""))) {
      const filteredByDepartments = this.filteringByDepartments()
      const filteredBySalaries = this.filteringBySalaries()
      let filteredByDepartmentSalary = []
      for (let i = 0; i < filteredByDepartments.length; i++) {
        filteredByDepartmentSalary = [...filteredByDepartmentSalary.concat(filteredBySalaries.filter(person => person.id === filteredByDepartments[i].id))]
      }
      this.cleaningInput()
      if (filteredByDepartmentSalary.length !== 0)
        this.setState({
          search: filteredByDepartmentSalary
        })
      else
        this.displayingNotFound()
    }

    //SEVENTH case in which we search by PEOPLE, DEPARTMENTS and SALARIES
    else if ((this.state.person !== "") && (this.state.checkedDepartments.length !== 0) &&
      ((this.state.minSalary !== "") || (this.state.maxSalary !== ""))) {
      const filteredByPeople = this.filteringByPeople()
      const filteredByDepartments = this.filteringByDepartments()
      const filteredBySalaries = this.filteringBySalaries()
      let filteredByPersonDepartment = []
      for (let i = 0; i < filteredByPeople.length; i++) {
        filteredByPersonDepartment = [...filteredByPersonDepartment.concat(filteredByDepartments.filter(person => person.id === filteredByPeople[i].id))]
      }
      let filteredByAll = []
      for (let i = 0; i < filteredBySalaries.length; i++) {
        filteredByAll = [...filteredByAll.concat(filteredByPersonDepartment.filter(person => person.id === filteredBySalaries[i].id))]
      }
      this.cleaningInput()
      if (filteredByAll.length !== 0)
        this.setState({
          search: filteredByAll
        })
      else
        this.displayingNotFound()
    }

    //EIGHT case in which we SEARCH NOTHING (Search All)
    else if ((this.state.person === "") && (this.state.checkedDepartments.length === 0) &&
      ((this.state.minSalary === "") && (this.state.maxSalary === ""))) {
      console.log("Do nothing!")
    }
  }

  handleAllClick = () => {
    this.setState({
      person: "",
      minSalary: "",
      maxSalary: "",
      checkedDepartments: [],
      checkedIT: false,
      checkedAdministrator: false,
      checkedTrader: false,
      search: [],
      expanded: false
    })
    var checkboxes = document.getElementById("checkboxes");
    checkboxes.style.display = "none";
    this.setState({
      expanded: false
    })
  }

  render() {

    const staff = this.props.staff.map(person => <Person key={person.id} person={person} />)

    if (this.state.search != null) {
      var search = this.state.search.map(person => <Person key={person.id} person={person} />)
    }

    //----------------EXPERIMENTING WITH UNLIMITED DEPARTMENTS AND CURRENCIES------------------------------------------------------------------
    // const departments = this.props.staff.map(department => department.department)
    //   const uniqueDepartments = [...new Set(departments)]
    //   const checkboxes = uniqueDepartments.map((checkbox, index) => {
    //     var check = this.state.checkbox
    //     return (
    //       <React.Fragment key={index}>
    //         <input className="department" type="checkbox" id={index} name={checkbox} value={checkbox} onChange={this.handleCheckbox} />
    //         <label htmlFor={index}>{checkbox}</label>
    //       </React.Fragment>
    //     )
    //   })
    //-------------------------------------------------------------------------------------------------------------------------

    return (
      <>
        <div className="Search">
          <input className="person" name="person" type="text" placeholder="Person..." value={this.state.person} onChange={this.handleChange} />
          <form>
            <div className="multiselect">
              <div className="selectBox" onClick={this.showCheckboxes}>
                <select>
                  <option>Department...</option>
                </select>
                <div className="overSelect"></div>
              </div>
              <div id="checkboxes">
                <label htmlFor="one">
                  <input type="checkbox" id="one" name="checkedIT" value="IT" checked={this.state.checkedIT} onChange={this.handleChange} />IT</label>
                <label htmlFor="two">
                  <input type="checkbox" id="two" name="checkedAdministrator" checked={this.state.checkedAdministrator} value="Administracja" onChange={this.handleChange} />Administration</label>
                <label htmlFor="three">
                  <input type="checkbox" id="three" name="checkedTrader" value="Handlowiec" checked={this.state.checkedTrader} onChange={this.handleChange} />Sales</label>
              </div>
            </div>
          </form>
          <input className="salary" name="minSalary" type="number" placeholder="Min. salary..." value={this.state.minSalary} onChange={this.handleChange} />
          <input className="salary" name="maxSalary" type="number" placeholder="Max. salary..." value={this.state.maxSalary} onChange={this.handleChange} />
          <button className="search" onClick={this.handleSearchClick}>Search</button>
          <button className="all" onClick={this.handleAllClick}>All</button>
          <div style={{ clear: "both" }} > </div>
        </div>
        <div className="Table">
          <div className="header">
            <div className="name"><h4>NAME</h4></div>
            <div className="surname"><h4>SURNAME</h4></div>
            <div className="department"><h4>DEPARTMENT</h4></div>
            <div className="salary"><h4>SALARY</h4></div>
          </div>
          {this.state.search.length ? search : staff}
        </div>
      </>
    );
  }
}

export default SearchAndTable;

