import React, { Component } from 'react';
import { Header, NavigationBar, MainScreen } from './components';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      storeView: false,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = event => {
    this.setState({
      storeView: Boolean(event.target.className === 'store'),
    });
  };

  render() {
    console.log('props in home', this.props);
    const { storeView } = this.state;
    const { signOut, firebase } = this.props;

    return (
      <div id="home">
        <Header firebase={firebase} user={this.props.user} />
        <MainScreen
          displayStore={storeView}
          firebase={firebase}
          user={this.props.user}
        />
        <h1 id="signOut" onClick={signOut}>
          Log Out
        </h1>
        <NavigationBar handleClick={this.handleClick} />
      </div>
    );
  }
}

export default Home;
