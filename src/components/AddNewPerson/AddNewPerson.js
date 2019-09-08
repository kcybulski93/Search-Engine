import React, { Component } from 'react';
import './AddNewPerson.css';

class AddNewPerson extends Component {
  state = {
    imie: "",
    nazwisko: "",
    dzial: "IT",
    wynagrodzenieKwota: "",
    wynagrodzenieWaluta: "PLN",
    id: this.props.staff.length
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
    const { imie, nazwisko, dzial, wynagrodzenieKwota, wynagrodzenieWaluta,id } = this.state;
    if (imie !== "" && nazwisko !== "" && wynagrodzenieKwota !== "") {
      if(wynagrodzenieKwota<0)
      {
        console.log("Wynagrodzenie nie może być ujemne!")
      }
      else
      this.props.addPerson(imie, nazwisko, dzial, wynagrodzenieKwota, wynagrodzenieWaluta,id)
      this.setState(prevState => ({
        imie: "",
        nazwisko: "",
        dzial: "IT",
        wynagrodzenieKwota: "",
        wynagrodzenieWaluta: "PLN",
        id: prevState.id+1
      }))
    }
    else console.log("Wypełnij Wszystkie Pola Formularza!")
  }

  handleClearClick = () => {
    this.setState({
      imie: "",
      nazwisko: "",
      dzial: "IT",
      wynagrodzenieKwota: "",
      wynagrodzenieWaluta: "PLN",
    })
  }

  render() {
    return (
      <>
        <div style={{ clear: "both" }} > </div>
        <div className="AddNewPerson">
          <input className="name" type="text" name="imie" placeholder="Add name..." value={this.state.imie} onChange={this.handleChange} />
          <input className="surname" type="text" name="nazwisko" placeholder="Add surname..." value={this.state.nazwisko} onChange={this.handleChange} />
          <select className="department" value={this.state.dzial} name="dzial" onChange={this.handleChange}>
            <option>IT</option>
            <option>Administracja</option>
            <option>Handlowiec</option>
          </select>
          <input className="salary" type="number" min="=1" step="1" name="wynagrodzenieKwota" placeholder="Add salary..." value={this.state.wynagrodzenieKwota} onChange={this.handleChange} />
          <select className="currency" value={this.state.wynagrodzenieWaluta} name="wynagrodzenieWaluta" onChange={this.handleChange}>
            <option>PLN</option>
            <option>EUR</option>
            <option>USD</option>
          </select>
          <button className="add" onClick={this.handleAddClick}>Add</button>
          <button className="clear" onClick={this.handleClearClick}>Clear</button>
        </div>
      </>
    );
  }
}

export default AddNewPerson;