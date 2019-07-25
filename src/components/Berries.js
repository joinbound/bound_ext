import React, { Component } from 'react';

class Berries extends Component {
  constructor(props) {
    super(props);
    this.state = {
      berries: 0,
      user: null,
    };
  }
  componentDidMount() {
    const { firebase } = this.props;
    firebase
      .exportToDB()
      .collection('users')
      .doc(this.props.userCredential.user.email)
      .get()
      .then(doc => {
        console.log('got data');
        this.setState({ user: doc.data() });
        this.setState({ berries: this.state.user.berries });
      });
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
