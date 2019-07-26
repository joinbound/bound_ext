import React, { Component } from 'react';

class NavigationBar extends Component {
    render() {
        const { handleClick } = this.props;

        return (
            <div id="navBottom">
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
            </div>
        );
    }
}

export default NavigationBar;
