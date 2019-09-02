import React, { Component } from 'react';
import './App.css';
import Header from '../Header/Header';
import AddNewPerson from '../AddNewPerson/AddNewPerson';
import Search from '../Search/Search';
import Table from '../Table/Table';
import Footer from '../Footer/Footer';

class App extends Component {
  state = {}
  render() {
    return (
      <>
        <div className="App">
          <header>
            <Header />
          </header>
          <main>
            <section>
              <AddNewPerson />
            </section>
            <section>
              <Search />
            </section>
            <section>
              <Table />
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
