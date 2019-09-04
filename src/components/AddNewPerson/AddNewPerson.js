import React, { Component } from 'react';
import './AddNewPerson.css';

class AddNewPerson extends Component {
  state = {}
  render() {
    return (
      <>
        <div style={{ clear: "both" }} > </div>
        <div className="AddNewPerson">
          <input className="name" type="text" placeholder="Add name..." value={this.state.name} onChange={this.handleNameText} />
          <input className="surname" type="text" placeholder="Add surname..." value={this.state.surname} onChange={this.handleSurnameText} />
          <input className="department" type="text" placeholder="Add department..." value={this.state.department} onChange={this.handleDepartmentText} />
          <input className="salary" type="text" placeholder="Add salary..." value={this.state.salary} onChange={this.handleSalaryText} />
          <input className="currency" type="text" placeholder="Add currency..." value={this.state.currency} onChange={this.handleCurrencyText} />
          <button className="add" onClick={this.handleAddClick}>Add</button>
          <button className="clear" onClick={this.handleClearClick}>Clear</button>
        </div>
      </>
    );
  }
}

export default AddNewPerson;