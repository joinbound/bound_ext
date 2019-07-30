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
      .onSnapshot({ includeMetadataChanges: true }, doc => {
        this.setState({ user: doc.data() });
        this.setState({ berries: this.state.user.berries });
      });
  }

  render() {
    const { berries, user } = this.state;
    // console.log('USERRR', user);
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
