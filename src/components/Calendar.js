import React, { Component } from 'react';

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      calendarData: [
        {
          eventTitle: 'Title of Event 1',
          time: 950,
          numberOfPeople: 3,
          numberOfBerries: 50,
        },
        {
          eventTitle: 'Title of Event 2',
          time: 950,
          numberOfPeople: 3,
          numberOfBerries: 50,
        },
        {
          eventTitle: 'Title of Event 3',
          time: 950,
          numberOfPeople: 3,
          numberOfBerries: 50,
        },
        {
          eventTitle: 'Title of Event 4',
          time: 950,
          numberOfPeople: 3,
          numberOfBerries: 50,
        },
      ],
    };
  }

  render() {
    const { calendarData } = this.state;
    return (
      <div id="calBody">
        <h1 id="upcomingEvents"> Upcoming Events </h1>
        {calendarData.map(event => {
          return (
            <div id="eventInfoAndCheckInButton">
              <div id="eventDetails">
                <img
                  id="eventTitleIcon"
                  src="/images/eventTitleIcon.png"
                  alt="Event Title"
                />
                {event.eventTitle}
                <br />
                <img
                  id="eventTimeIcon"
                  src="/images/eventTimeIcon.png"
                  alt="Event Time"
                />
                {event.time}
                <br />
                <img
                  id="eventBerryIcon"
                  src="/images/redBerryIcon.png"
                  alt="Event Time"
                />
                {event.numberOfBerries} Berries{' '}
                <img
                  id="eventMemberIcon"
                  src="/images/eventMemberIcon.png"
                  alt="Event Time"
                />
                {event.numberOfPeople} People{' '}
              </div>

              <div className="checkInButton">
                <button id="checkIn"> Check in 15 minutes before</button>
              </div>
            </div>
          );
        })}
        <h1 id="signOut" onClick={this.props.signOut}>
          Log Out
        </h1>
      </div>
    );
  }
}

export default Calendar;
