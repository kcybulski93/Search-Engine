import React, { Component } from 'react';
import './Header.css';
import Clock from '../Clock/Clock';

class Header extends Component {
    state = {}
    render() {
        return (
            <>
                <div className="Header">
                    <Clock />
                    <h1> Search-Engine </h1>
                </div>
            </>
        );
    }
}

export default Header;