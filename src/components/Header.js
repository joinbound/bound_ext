import React, { Component } from 'react';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      berries: 0,
      user: null,
    };
  }
  componentDidMount() {
    const { firebase, user } = this.props;
    firebase
      .exportToDB()
      .collection('users')
      .doc(user.email)
      .get()
      .then(doc => {
        this.setState({ user: doc.data() });
      });
  }

  render() {
    const { berries } = this.state;

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
