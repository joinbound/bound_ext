import React, { Component } from 'react';
import CheckInButton from './CheckInButton';
import * as moment from 'moment';

class EventCard extends Component {
  render() {
    const {
      data: {
        eventTitle,
        numberOfBerries,
        numberOfPeople,
        time,
        isAllDay,
        calendarId,
      },
      handleUserData,
    } = this.props;

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
          {moment(time).format(isAllDay ? 'MM/DD' : 'MM/DD/YYYY hh:mm a')}
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
        <CheckInButton
          time={time}
          onClick={() =>
            handleUserData('incrementBerries', { count: 50, calendarId })
          }
        />
      </div>
    );
  }
}
export default EventCard;
