import React, { Component } from 'react';

class Header extends Component {
    constructor() {
        super();
        this.state = {
            berries: 0,
        };
    }

    render() {
        const { berryCount } = this.state;

        return (
          <div id="header">
            <img id="headerLogo" src="/images/navIcon.png" alt="" />
            <div id="container">
              <div id="berries">
                <img id="boundBerries" src="/images/WhiteBerryIcon.png" alt="" />
                <h1 id="count">{berryCount}</h1>
              </div>
            </div>
          </div>
        );
    }
}

export default Header;
