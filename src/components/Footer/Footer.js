import React, { Component } from 'react';
import './Footer.css';

class Footer extends Component {
    state = {}
    render() {
        return (
            <>
                <div className="Footer">
                    <h4>Made with <i class="icon-heart"> </i><a className="anchor" href="https://www.facebook.com/kamil.cybulski.9">Kamil Cybulski <i class="icon-facebook-rect"></i></a> </h4>
                </div>
            </>
        );
    }
}

export default Footer;