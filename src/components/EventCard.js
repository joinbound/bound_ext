import React, { Component } from 'react';
import * as moment from 'moment';

class EventCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      berries: 0,
      user: null,
      clicked: false,
    };
    this.addBerries = this.addBerries.bind(this);
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

  addBerries() {
    const { firebase, user } = this.props;
    const updatedBerries =
      this.state.user.berries + this.props.data.numberOfBerries;
    firebase
      .exportToDB()
      .collection('users')
      .doc(user.email)
      .update({
        berries: updatedBerries,
      });
    this.setState({ clicked: true });
    //to test
    // this.setState({ clicked: !this.state.checked });
  }

  render() {
    const buttonStyle = {
      backgroundColor: '#9b9b9b',
    };
    const buttonStyleClicked = {
      backgroundColor: '#ff5252',
      lineHeight: '17px',
      fontSize: '13px',
      paddingTop: '5px',
      fontWeight: 'bold',
    };

    const {
      data: { eventTitle, numberOfBerries, numberOfPeople, time, isAllDay },
    } = this.props;
    let { user } = this.state;
    if (!user) user = {};

    return (
      <div id="eventInfoAndCheckInButton">
        <div id="eventDetails">
          <img
            id="eventTitleIcon"
            src="/images/eventTitleIcon.png"
            alt="Event Title"
          />
          {eventTitle}
          <br />
          <img
            id="eventTimeIcon"
            src="/images/eventTimeIcon.png"
            alt="Event Time"
          />
          {moment(time).format(isAllDay ? 'MM/DD' : 'MM/DD/YYYY hh:mm')}
          <br />
          <img
            id="eventBerryIcon"
            src="/images/redBerryIcon.png"
            alt="Event Time"
          />
          {numberOfBerries} Berries
          <img
            id="eventMemberIcon"
            src="/images/eventMemberIcon.png"
            alt="Event Time"
          />
          {numberOfPeople} People
        </div>
        {this.state.clicked ? (
          <div className="checkInButton">
            <button id="checkIn" style={buttonStyle} onClick={this.addBerries}>
              {' '}
              Check in 15 minutes before
            </button>
          </div>
        ) : (
          <div className="checkInButton">
            <button
              id="checkIn"
              style={buttonStyleClicked}
              //to test
              //   onClick={this.addBerries}
            >
              {' '}
              Checked In!
            </button>
          </div>
        )}
      </div>
    );
  }
}
export default EventCard;
