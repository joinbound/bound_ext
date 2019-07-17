import React, { Component } from 'react';
import Store from './Store';
import Calendar from './Calendar';

class NavBar extends Component {
  constructor() {
    super();
    this.state = {
      storeView: false,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = event => {
    if (event.target.className === 'store' && !this.state.storeView) {
      this.setState(() => ({
        storeView: true,
      }));
    } else if (
      event.target.className === 'cal' &&
      this.state.storeView === true
    ) {
      this.setState(() => ({
        storeView: false,
      }));
    }
  };
  render() {
    let screen;
    let berryCount = 0;
    if (this.state.storeView === true) {
      screen = <Store />;
    } else if (this.state.storeView === false) {
      screen = <Calendar />;
    }

    return (
      <div id="navigation">
        <div id="navTop">
          <img id="navLogo" src="/images/navIcon.png" alt="" />
          <div id="container">
            <div id="berries">
              <img id="boundBerries" src="/images/WhiteBerryIcon.png" alt="" />
              {/* hard coded for now, have to implement count function later */}
              <h1 id="count">{berryCount}</h1>
            </div>
          </div>
        </div>
        {screen}
        <div id="navBottom">
          <img
            src="/images/CalendarIcon.png"
            className="cal"
            onClick={this.handleClick}
            alt=""
          />

          <img
            src="/images/ShoppingBagIcon.png"
            className="store"
            onClick={this.handleClick}
            alt=""
          />
        </div>
      </div>
    );
  }
}

export default NavBar;
