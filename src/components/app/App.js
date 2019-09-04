import React, { Component } from 'react';
import './App.css';
import Header from '../Header/Header';
import AddNewPerson from '../AddNewPerson/AddNewPerson';
import Search from '../Search/Search';
import Table from '../Table/Table';
import Footer from '../Footer/Footer';

class App extends Component {
  state = {
    staff: null,
    filteredPersons: null,
  }

  componentDidMount() {
    fetch("data.json")
      .then(response => response.json())
      .then(result => {
        let staff = [...result.PRACOWNICY]
        let id = { id: 0 }
        staff = staff.map((person, index) => ({ ...person, ...id = { id: index + 1 } }))
        this.setState({
          staff
        })
      })
  }

  addPerson = (imie, nazwisko, dzial, wynagrodzenieKwota, wynagrodzenieWaluta) => {
    const person = {
      imie,
      nazwisko,
      dzial,
      wynagrodzenieKwota,
      wynagrodzenieWaluta,
    }

    this.setState(prevState => ({
      staff: [...prevState.staff, person]
    }))
  }

  searchClick = (filteredPersons) => {
    this.setState(() => ({
      filteredPersons
    }))
  }

  render() {
    return (
      <>
        <div className="App">
          <header>
            <Header />
          </header>
          <main>
            <section>
              <AddNewPerson addPerson={this.addPerson} />
            </section>
            <section>
              {this.state.staff ? <Search staff={this.state.staff} searchClick={this.searchClick} /> : this.state.staff}
            </section>
            <section>
              {this.state.staff ? <Table staff={this.state.staff} filteredPersons={this.state.filteredPersons} /> : this.state.staff}
            </section>
          </main>
          <footer>
            <Footer />
          </footer>
        </div>
      </>
    );
  }
}

export default App;
