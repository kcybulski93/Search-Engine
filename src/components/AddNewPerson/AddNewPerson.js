import React, { Component } from 'react';
import './AddNewPerson.css';

class AddNewPerson extends Component {
  state = {
    name: "",
    surname: "",
    department: "IT",
    salary: "",
    currency: "PLN",
    id: this.props.staff.length + 1,
    remarkToNegativeAmount: false,
    remarkToEmptyInputs: false
  }

  handleChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    })
  }

  handleAddClick = () => {
    const { name, surname, department, salary, currency, id } = this.state;
    if (name !== "" && surname !== "" && salary !== "") {
      if (salary < 0) {
        this.setState({
          remarkToEmptyInputs: false,
          remarkToNegativeAmount: true
        })
      }
      else {
        this.props.addPerson(name, surname, department, salary, currency, id)
        this.setState(prevState => ({
          name: "",
          surname: "",
          department: "IT",
          salary: "",
          currency: "PLN",
          id: prevState.id + 1,
          remarkToNegativeAmount: false,
          remarkToEmptyInputs: false,
        }))
      }
    }
    else
      this.setState({
        remarkToEmptyInputs: true
      })
  }

  handleClearClick = () => {
    this.setState({
      name: "",
      surname: "",
      department: "IT",
      salary: "",
      currency: "PLN",
    })
  }

  render() {
    return (
      <>
        <div style={{ clear: "both" }} > </div>
        <div className="AddNewPerson">
          <input className="name" type="text" name="name" placeholder="Add name..." value={this.state.name} onChange={this.handleChange} />
          <input className="surname" type="text" name="surname" placeholder="Add surname..." value={this.state.surname} onChange={this.handleChange} />
          <select className="department" value={this.state.department} name="department" onChange={this.handleChange}>
            <option>IT</option>
            <option>Administration</option>
            <option>Sales</option>
          </select>
          <input className="salary" type="number" name="salary" placeholder="Add salary..." value={this.state.salary} onChange={this.handleChange} />
          <script>
          </script>
          <select className="currency" value={this.state.currency} name="currency" onChange={this.handleChange}>
            <option>PLN</option>
            <option>EUR</option>
            <option>USD</option>
          </select>
          <button className="add" onClick={this.handleAddClick}>Add</button>
          <button className="clear" onClick={this.handleClearClick}>Clear</button>
          {this.state.remarkToEmptyInputs ? <div>dupa</div> : null}
          {this.state.remarkToNegativeAmount ? <div>dupa2</div> : null}
        </div>
      </>
    );
  }
}

export default AddNewPerson;