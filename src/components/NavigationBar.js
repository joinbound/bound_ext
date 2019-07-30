import React, { Component } from 'react';

class NavigationBar extends Component {
  render() {
    const { handleClick, storeView } = this.props;

    return (
      <div id="navBottom">
        {storeView ? (
          <>
            <img
              src="/images/blackCalendarIcon.png"
              className="cal"
              onClick={handleClick}
              alt=""
            />

            <img
              src="/images/redShoppingIcon.png"
              className="store"
              onClick={handleClick}
              alt=""
            />
          </>
        ) : (
          <>
            <img
              src="/images/CalendarIcon.png"
              className="cal"
              onClick={handleClick}
              alt=""
            />

            <img
              src="/images/ShoppingBagIcon.png"
              className="store"
              onClick={handleClick}
              alt=""
            />
          </>
        )}
      </div>
    );
  }
}

export default NavigationBar;
