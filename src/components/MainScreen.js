import React, { Component } from 'react';
import { Store, Calendar } from '.';

class MainScreen extends Component {
  render() {
    const { displayStore } = this.props;

    return (
      <div>
        {displayStore ? (
          <Store firebase={this.props.firebase} user={this.props.user} />
        ) : (
          <Calendar signOut={this.props.signOut} />
        )}
      </div>
    );
  }
}

export default MainScreen;