import React, { Component } from 'react';

class Header extends Component {
  render() {
    const { user: { berries } } = this.props;
    return (
      <div id="header">
        <img id="headerLogo" src="/images/navIcon.png" alt="" />
        <div id="container">
          <div id="berries">
            <img id="boundBerries" src="/images/WhiteBerryIcon.png" alt="" />
            <h1 id="count">{berries}</h1>
          </div>
        </div>
      </div>
    );
  }
}
export default Header;
