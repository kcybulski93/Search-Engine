import React, { Component } from 'react';
import './App.css';
import Header from '../Header/Header';
import AddNewPerson from '../AddNewPerson/AddNewPerson';
import SearchAndTable from '../SearchAndTable/SearchAndTable';
import Footer from '../Footer/Footer';
import SalaryList from '../SalaryList/SalaryList';

class App extends Component {
  state = {
    staff: null,
  }

  componentDidMount() {
    fetch("data.json")
      .then(response => response.json())
      .then(result => {
        let staff = [...result.PRACOWNICY,]
        staff = staff.map((person, index) => ({ ...person, ...{ id: index + 1 } }))
        this.setState({
          staff
        })
      })
  }

  addPerson = (imie, nazwisko, dzial, wynagrodzenieKwota, wynagrodzenieWaluta, id) => {
    const person = {
      imie,
      nazwisko,
      dzial,
      wynagrodzenieKwota,
      wynagrodzenieWaluta,
      id
    }

    this.setState(prevState => ({
      staff: [...prevState.staff, person],
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
              {this.state.staff ? <AddNewPerson addPerson={this.addPerson} staff={this.state.staff} /> : this.state.staff}
            </section>
            <section>
              {this.state.staff ? <SearchAndTable staff={this.state.staff} /> : this.state.staff}
            </section>
            <section>
              {this.state.staff ? <SalaryList staff={this.state.staff} /> : this.state.staff}
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
