import React, { Component } from 'react';
import { Store, Calendar } from '.';

class MainScreen extends Component {

  render() {
    const { displayStore, user, signOut, handleUserData, firebase } = this.props;

    return (
      <div>
        {displayStore ? (
          <Store user={user} handleUserData={handleUserData} firebase={firebase} />
        ) : (
          <Calendar
            signOut={signOut}
            user={user}
            handleUserData={handleUserData}
          />
        )}
      </div>
    );
  }
}

export default MainScreen;
