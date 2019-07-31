import React, { Component } from 'react';
import EventCard from './EventCard';
import * as moment from 'moment';
import axios from 'axios'

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      calendarData: [],
    };

    this.loadEvents = this.loadEvents.bind(this);
  }

  loadCalendarApi() {
    const { oauthAccessToken } = JSON.parse(localStorage.getItem('credentials'));
    axios.get('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
      params: {
        key: 'AIzaSyBmno7cNZtCFc3oawfhiql4f1ipGrgRlqw',
        timeMin: moment().toISOString(),
      },
      headers: {
        'Authorization': `Bearer ${oauthAccessToken}`
      }
    }).then((result) => {
      this.loadEvents(result.data.items);
    })
  }

  loadEvents(events) {
    const newEventsState = events.reduce(
      (eventsState, event) => {
        if (event.attendees && event.attendees.length >= 2) {
          let eventDate = moment(
            event.start.date || event.start.dateTime
          );
          eventsState.push({
            calendarId: event.id,
            eventTitle: event.summary,
            time: eventDate,
            isAllDay: Boolean(event.start.date),
            numberOfPeople: event.attendees.length,
            numberOfBerries: 50,
          });
          return eventsState;
        }
        return eventsState;
      },
      []
    );

    this.setState({
      calendarData: newEventsState,
    });
  }

  componentDidMount() {
    this.loadCalendarApi();
  }

  render() {
    const { calendarData } = this.state;
    const { user, handleUserData } = this.props;

    return (
      <div id="calBody">
        <h1 id="upcomingEvents"> Upcoming Events </h1>
        {calendarData.map((event, index) => (
          <EventCard
            data={event}
            key={index}
            user={user}
            handleUserData={handleUserData}
          />
        ))}
      </div>
    );
  }
}

export default Calendar;
