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

  //Handling events

  handleChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    })
  }

  showCheckboxes = () => {
    var checkboxes = document.getElementById("checkboxes");
    var expanded = this.state.expanded
    if (!expanded) {
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
    //FIRST case in wchich we search only by PERSON
    if ((this.state.person !== "") && (this.state.checkedDepartments.length === 0) &&
      (this.state.minSalary === "") && (this.state.maxSalary === "")) {
      const concatNameSurname = this.props.staff.map(person => {
        return {
          zmienna: "",
          osoba: person.imie + " " + person.nazwisko,
          dzial: person.dzial,
          wynagrodzenieKwota: person.wynagrodzenieKwota,
          wynagrodzenieWaluta: person.wynagrodzenieWaluta,
          id: person.id
        }
      })
      const filteredByPerson = concatNameSurname.filter(person => {
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
          person: "",
          minSalary: "",
          maxSalary: "",
          checkedDepartments: [],
          checkedIT: false,
          checkedAdministrator: false,
          checkedTrader: false,
          search: filteredPersons,
          expanded: false,
        })
        var checkboxes = document.getElementById("checkboxes");
        checkboxes.style.display = "none";
      }
      else
        this.setState({
          person: "",
          minSalary: "",
          maxSalary: "",
          checkedDepartments: [],
          checkedIT: false,
          checkedAdministrator: false,
          checkedTrader: false,
          search: [{
            imie: "Not found",
            nazwisko: "",
            dzial: "",
            wynagrodzenieKwota: "",
            wynagrodzenieWaluta: "",
            id: "milion500sto900"
          }],
          expanded: false,
        })
      checkboxes = document.getElementById("checkboxes");
      checkboxes.style.display = "none";
    }

    //SECOND case in wchich we search only by DEPARTMENT
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

    //THIRD case in wchich we search only by DEPARTMENT
    else if ((this.state.person === "") && (this.state.checkedDepartments.length === 0) &&
      ((this.state.minSalary !== "") || (this.state.maxSalary !== ""))) {
      const filteredBySalary = this.props.staff.filter(person => (
        (person.wynagrodzenieKwota >= this.state.minSalary && person.wynagrodzenieKwota <= this.state.maxSalary)
        ||
        (person.wynagrodzenieKwota >= this.state.minSalary && this.state.maxSalary === "")
        ||
        (this.state.minSalary === "" && person.wynagrodzenieKwota <= this.state.maxSalary)
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

    //FOURTH case in which we search by PERSON and DEPARTMENT
    else if ((this.state.person !== "") && (this.state.checkedDepartments.length !== 0) &&
      ((this.state.minSalary === "") && (this.state.maxSalary === ""))) {

      //Filtering by person
      const concatNameSurname = this.props.staff.map(person => {
        return {
          zmienna: "",
          osoba: person.imie + " " + person.nazwisko,
          dzial: person.dzial,
          wynagrodzenieKwota: person.wynagrodzenieKwota,
          wynagrodzenieWaluta: person.wynagrodzenieWaluta,
          id: person.id
        }
      })
      const filteredByPerson = concatNameSurname.filter(person => {
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
      for (let i = 0; i < filteredPersons.length; i++) {
        filteredByPersonDepartment = [...filteredByPersonDepartment.concat(filteredDepartments.filter(person => person.id === filteredPersons[i].id))]
      }
      if (filteredByPersonDepartment.length > 0) {
        this.setState({
          search: filteredByPersonDepartment
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
    //FIFTH case in which we search by DEPARTMENT and SALARY
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
      for (let i = 0; i < filteredDepartments.length; i++) {
        filteredByDepartmentSalary = [...filteredByDepartmentSalary.concat(filteredBySalary.filter(person => person.id === filteredDepartments[i].id))]
      }
      if (filteredByDepartmentSalary.length > 0) {
        this.setState({
          search: filteredByDepartmentSalary
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

    //SIXTH case in which we search by PERSON and SALARY
    else if ((this.state.person !== "") && (this.state.checkedDepartments.length === 0) &&
      ((this.state.minSalary !== "") || (this.state.maxSalary !== ""))) {

      //Filtering by person
      const concatNameSurname = this.props.staff.map(person => {
        return {
          zmienna: "",
          osoba: person.imie + " " + person.nazwisko,
          dzial: person.dzial,
          wynagrodzenieKwota: person.wynagrodzenieKwota,
          wynagrodzenieWaluta: person.wynagrodzenieWaluta,
          id: person.id
        }
      })
      const filteredByPerson = concatNameSurname.filter(person => {
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
      for (let i = 0; i < filteredPersons.length; i++) {
        filteredByPersonSalary = [...filteredByPersonSalary.concat(filteredBySalary.filter(person => person.id === filteredPersons[i].id))]
      }
      if (filteredByPersonSalary.length > 0) {
        this.setState({
          search: filteredByPersonSalary
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

    //SEVENTH case in which we search by PERSON, DEPARTMENT and SALARY
    else if ((this.state.person !== "") && (this.state.checkedDepartments.length !== 0) &&
      ((this.state.minSalary !== "") || (this.state.maxSalary !== ""))) {

      //Filtering by person
      const concatNameSurname = this.props.staff.map(person => {
        return {
          zmienna: "",
          osoba: person.imie + " " + person.nazwisko,
          dzial: person.dzial,
          wynagrodzenieKwota: person.wynagrodzenieKwota,
          wynagrodzenieWaluta: person.wynagrodzenieWaluta,
          id: person.id
        }
      })
      const filteredByPerson = concatNameSurname.filter(person => {
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
      for (let i = 0; i < filteredPersons.length; i++) {
        filteredByPersonDepartment = [...filteredByPersonDepartment.concat(filteredDepartments.filter(person => person.id === filteredPersons[i].id))]
      }
      let filteredByAll = []
      for (let i = 0; i < filteredBySalary.length; i++) {
        filteredByAll = [...filteredByAll.concat(filteredByPersonDepartment.filter(person => person.id === filteredBySalary[i].id))]
        if (filteredByAll.length > 0) {
          this.setState({
            search: filteredByAll
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
    }

    //EIGHT case in which we SEARCH NOTHING (Search All)
    else if ((this.state.person === "") && (this.state.checkedDepartments.length === 0) &&
      ((this.state.minSalary === "") || (this.state.maxSalary === ""))) {
      this.setState({
        search: this.props.staff
      })
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

    //----------------EXPERIMENTING WITH DIFFERENT data.json------------------------------------------------------------------
    // const departments = this.props.staff.map(department => department.dzial)
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
                  <input type="checkbox" id="one" name="checkedIT" value="IT" checked={this.state.checkedIT} onChange={this.handleCheckbox} />IT</label>
                <label htmlFor="two">
                  <input type="checkbox" id="two" name="checkedAdministrator" checked={this.state.checkedAdministrator} value="Administracja" onChange={this.handleCheckbox} />Administrator</label>
                <label htmlFor="three">
                  <input type="checkbox" id="three" name="checkedTrader" value="Handlowiec" checked={this.state.checkedTrader} onChange={this.handleCheckbox} />Trader</label>
              </div>
            </div>
          </form>
          <input className="salary" name="minSalary" type="number" placeholder="Min. Salary..." value={this.state.minSalary} onChange={this.handleChange} />
          <input className="salary" name="maxSalary" type="number" placeholder="Max. Salary..." value={this.state.maxSalary} onChange={this.handleChange} />
          <button className="search" onClick={this.handleSearchClick}>Search</button>
          <button className="search" onClick={this.handleAllClick}>All</button>
        </div>
        <div className="Table">
          <div className="header">
            <div className="name">NAME</div>
            <div className="surname">SURNAME</div>
            <div className="department">DEPARTMENT</div>
            <div className="salary">SALARY</div>
          </div>
          {this.state.search.length ? search : staff}
        </div>
      </>
    );
  }
}

export default SearchAndTable;

