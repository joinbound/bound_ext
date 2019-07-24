import React, { Component } from 'react';
import Store from './Store';
import Calendar from './Calendar';
import Berries from './Berries';

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
    const { userCredential, signOut, firebase } = this.props;
    let screen;

    if (this.state.storeView === true) {
      screen = <Store firebase={firebase} />;
    } else if (this.state.storeView === false) {
      screen = <Calendar signOut={signOut} userCredential={userCredential} />;
    }

    return (
      <div id="navigation">
        <div id="navTop">
          <img id="navLogo" src="/images/navIcon.png" alt="" />
          <Berries userCredential={userCredential} />
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
