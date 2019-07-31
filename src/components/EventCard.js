import React, { Component } from 'react';
import * as moment from 'moment';

class EventCard extends Component {
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
      data: { eventTitle, numberOfBerries, numberOfPeople, time, isAllDay, calendarId},
      user,
      handleUserData,
    } = this.props;

    const checkedIn = user.checkedInEvents.includes(calendarId);

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
        {!checkedIn ? (
          <div className="checkInButton">
            <button id="checkIn" style={buttonStyle} onClick={() => handleUserData('incrementBerries', {count: 50, calendarId})}>
              {' '}
              Check in 15 minutes before
            </button>
          </div>
        ) : (
          <div className="checkInButton">
            <button id="checkIn" style={buttonStyleClicked}>
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
