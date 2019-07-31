import React, { Component } from 'react';
import * as moment from 'moment';

class EventCard extends Component {
  render() {
    const buttonStyle = {
      backgroundColor: '#9b9b9b',
    };
    const buttonStyleRed = {
      fontFamily: 'Roboto Medium, sans-serif',
      backgroundColor: '#ff5252',
      lineHeight: '18px',
      fontSize: '15px',
      fontWeight: 'bold',
      paddingTop: '9px',
    };
    const buttonStyleChecked = {
      fontFamily: 'Roboto Medium, sans-serif',
      backgroundColor: 'white',
      border: '2px solid #ff5252',
      lineHeight: '18px',
      fontSize: '14px',
      fontWeight: 'bold',
      paddingTop: '9px',
      color: '#ff5252',
    };
    const {
      data: {
        eventTitle,
        numberOfBerries,
        numberOfPeople,
        time,
        isAllDay,
        calendarId,
      },
      user,
      handleUserData,
      checkedIn,
    } = this.props;

    user.checkedInEvents.includes(calendarId);

    const today = new Date();
    let eventTime = new Date(time);
    eventTime.setMinutes(eventTime.getMinutes() - 15);
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
        {today >= eventTime ? (
          checkedIn === false ? (
            <div className="checkInButton">
              <button
                id="checkIn"
                style={buttonStyleRed}
                onClick={() =>
                  handleUserData('incrementBerries', { count: 50, calendarId })
                }
              >
                {' '}
                Check In
              </button>
            </div>
          ) : (
            <div className="checkInButton">
              <button id="checkIn" style={buttonStyleChecked}>
                {' '}
                Checked In
              </button>
            </div>
          )
        ) : (
          <div className="checkInButton">
            <button id="checkIn" style={buttonStyle}>
              {' '}
              Check in 15 minutes before
            </button>
          </div>
        )}
      </div>
    );
  }
}
export default EventCard;
