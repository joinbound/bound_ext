import React, { Component } from 'react';

class Berries extends Component {
  constructor(props) {
    super(props);
    this.state = {
      berries: 10,
    };
  }
  render() {
    return (
      <div id="container">
        <div id="berries">
          <img id="boundBerries" src="/images/WhiteBerryIcon.png" alt="" />
          <h1 id="count">{this.state.berries}</h1>
        </div>
      </div>
    );
  }
}
export default Berries;
