import React, { Component } from 'react';
import './Search.css';

class Search extends Component {
  state = {
    person: "",
    department: "IT",
    salary: "",
  }

  handlePersonText = (e) => {
    this.setState({
      person: e.target.value
    })
  }

  handleSearchClick = () => {
    let filteredPersons = this.props.staff.filter(person => {
      return person.imie.toLowerCase().indexOf(this.state.person) !== -1
    })
    console.log(filteredPersons)
    this.props.searchClick(filteredPersons)
  }

  render() {
    return (
      <>
        <div className="Search">
          <input className="person" type="text" placeholder="Person..." value={this.state.person} onChange={this.handlePersonText} />
          <input className="department" type="text" placeholder="Add department..." value={this.state.department} onChange={this.handleDepartmentText} />
          <input className="salary" type="text" placeholder="Add salary..." value={this.state.salary} onChange={this.handleSalaryText} />
          <button className="search" onClick={this.handleSearchClick}>Search</button>
        </div>
      </>
    );
  }
}

export default Search;