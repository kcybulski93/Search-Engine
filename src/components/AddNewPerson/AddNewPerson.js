import React, { Component } from 'react';
import './AddNewPerson.css';

class AddNewPerson extends Component {
  state = {
    imie: "",
    nazwisko: "",
    dzial: "",
    wynagrodzenieKwota: "",
    wynagrodzenieWaluta: "",
  }

  handleNameText = (e) => {
    this.setState({
      imie: e.target.value
    })
  }

  handleSurnameText = (e) => {
    this.setState({
      nazwisko: e.target.value
    })
  }

  handleDepartmentText = (e) => {
    this.setState({
      dzial: e.target.value
    })
  }

  handleSalaryText = (e) => {
    this.setState({
      wynagrodzenieKwota: e.target.value
    })
  }

  handleCurrencyText = (e) => {
    this.setState({
      wynagrodzenieWaluta: e.target.value
    })
  }

  handleAddClick = () => {
    const { imie, nazwisko, dzial, wynagrodzenieKwota, wynagrodzenieWaluta } = this.state;
    this.props.addPerson(imie, nazwisko, dzial, wynagrodzenieKwota, wynagrodzenieWaluta)
    this.setState({
      imie: "",
      nazwisko: "",
      dzial: "",
      wynagrodzenieKwota: "",
      wynagrodzenieWaluta: "",
    })
  }

  render() {
    return (
      <>
        <div style={{ clear: "both" }} > </div>
        <div className="AddNewPerson">
          <input className="name" type="text" placeholder="Add name..." value={this.state.imie} onChange={this.handleNameText} />
          <input className="surname" type="text" placeholder="Add surname..." value={this.state.nazwisko} onChange={this.handleSurnameText} />
          <input className="department" type="text" placeholder="Add department..." value={this.state.dzial} onChange={this.handleDepartmentText} />
          <input className="salary" type="text" placeholder="Add salary..." value={this.state.wynagrodzenieKwota} onChange={this.handleSalaryText} />
          <input className="currency" type="text" placeholder="Add currency..." value={this.state.wynagrodzenieWaluta} onChange={this.handleCurrencyText} />
          <button className="add" onClick={this.handleAddClick}>Add</button>
          <button className="clear" onClick={this.handleClearClick}>Clear</button>
        </div>
      </>
    );
  }
}

export default AddNewPerson;