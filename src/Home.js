import React, { Component } from "react";
import { Header, NavigationBar, MainScreen } from "./components";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      storeView: false,
      user: null
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleUserData = this.handleUserData.bind(this);
    this.updateFirebase = this.updateFirebase.bind(this);
  }

  handleClick = event => {
    this.setState({
      storeView: Boolean(event.target.className === "store")
    });
  };

  componentDidMount() {
    const { firebase, user } = this.props;

    firebase
      .exportToDB()
      .collection("users")
      .doc(user.email)
      .get()
      .then(doc => {
        this.setState({ user: doc.data() });
      });
  }

  updateFirebase(updateContent) {
    const { firebase } = this.props;
    const { user } = this.state;
    firebase
      .exportToDB()
      .collection("users")
      .doc(this.state.user.email)
      .update(updateContent)
      .then(doc => {
        this.setState({
          user: {
            ...user,
            ...updateContent
          }
        });
      });
  }

  handleUserData(type, action) {
    const {
      user: { berries, checkedInEvents, rewards }
    } = this.state;

    switch (type) {
      case "incrementBerries":
        const checkedInEventsCopy = checkedInEvents.splice(0);
        checkedInEventsCopy.push(action.calendarId);
        this.updateFirebase({
          berries: berries + action.count,
          checkedInEvents: checkedInEventsCopy
        });
        break;
      case "purchaseItem":
        const rewardsCopy = rewards.splice(0);
        rewardsCopy.push(action.reward);
        this.updateFirebase({
          berries: berries - action.count,
          rewards: rewardsCopy
        });
        break;
      default:
        return;
    }
  }

  render() {
    const { storeView, user } = this.state;
    const { signOut, firebase } = this.props;

    return user ? (
      <div id="home">
        <Header user={user} />
        <MainScreen
          displayStore={storeView}
          user={user}
          handleUserData={this.handleUserData}
          firebase={firebase}
          signOut={signOut}
        />
        <h1 id="signOut" onClick={signOut}>
          Log Out
        </h1>
        <NavigationBar handleClick={this.handleClick} storeView={storeView} />
      </div>
    ) : null;
  }
}

export default Home;
