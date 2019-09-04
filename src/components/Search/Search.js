import React, { Component } from 'react';
import './Search.css';

class Search extends Component {
    state = {
        department: "1",
    }


    render() {
        return (
            <>
                <div className="Search">
                    <input className="person" type="text" placeholder="Person..." value={this.state.person} onChange={this.handleNameText} />
                    <input className="department" type="text" placeholder="Add department..." value={this.state.department} onChange={this.handleDepartmentText} />
                    <input className="salary" type="text" placeholder="Add salary..." value={this.state.salary} onChange={this.handleSalaryText} />
                    <input className="currency" type="text" placeholder="Add currency..." value={this.state.currency} onChange={this.handleCurrencyText} />
                    <button className="add" onClick={this.handleAddClick}>Add</button>
                </div>
            </>
        );
    }
}

export default Search;