import React, { Component } from 'react';
import ReactGA from 'react-ga';
import EventCard from './EventCard';
import * as moment from 'moment';
import axios from 'axios';

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      calendarData: [],
    };

    this.loadEvents = this.loadEvents.bind(this);
  }

  loadCalendarApi() {
    const { oauthAccessToken } = JSON.parse(
      localStorage.getItem('credentials')
    );
    axios
      .get('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
        params: {
          key: 'AIzaSyBmno7cNZtCFc3oawfhiql4f1ipGrgRlqw',
          timeMin: moment().toISOString(),
          timeMax: moment()
            .add('7', 'days')
            .toISOString(),
          singleEvents: true,
        },
        headers: {
          Authorization: `Bearer ${oauthAccessToken}`,
        },
      })
      .then(result => {
        this.loadEvents(result.data.items);
      })
      .catch(() => {
        this.props.signOut();
      });
  }

  loadEvents(events) {
    const newEventsState = events
      .reduce((eventsState, event) => {
        if (event.attendees && event.attendees.length >= 2) {
          let eventDate = moment(event.start.date || event.start.dateTime);
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
      }, [])
      .sort((a, b) => (a.time > b.time ? 1 : -1));

    this.setState({
      calendarData: newEventsState,
    });
  }

  componentDidMount() {
    this.loadCalendarApi();

    ReactGA.pageview('/upcoming-events');
  }

  render() {
    const { calendarData } = this.state;
    const { user, handleUserData } = this.props;

    const filteredCalendarData = calendarData.filter(
      event => !user.checkedInEvents.includes(event.calendarId)
    );
    if (filteredCalendarData.length === 0)
      return <div id="calBody">No upcoming events to display</div>;
    return (
      <div id="calBody">
        <h1 id="upcomingEvents"> Upcoming Events </h1>
        {filteredCalendarData.map((event, index) => (
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
