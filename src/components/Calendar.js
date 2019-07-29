import React, { Component } from 'react';
import scriptLoader from 'react-async-script-loader';
import EventCard from './EventCard';
import * as moment from 'moment';

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      calendarData: [],
    };
  }

  loadCalendarApi() {
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/client.js';

    let calendar = this;

    script.onload = () => {
      window.gapi.load('client:auth2', () => {
        window.gapi.client.setApiKey(process.env.REACT_APP_API_KEY);
        window.gapi.client.load('calendar', 'v3');
        window.gapi.auth.authorize(
          {
            client_id:
              '121179289007-bbd4nrrm6g5sutpao31auapgp482etdo.apps.googleusercontent.com',
            scope: 'https://www.googleapis.com/auth/calendar.events.readonly',
            immediate: true,
          },
          result => {
            window.gapi.client.calendar.events
              .list({
                calendarId: 'primary',
                timeMin: moment().toISOString(),
                maxResult: 10,
              })
              .then(function(response) {
                let events = response.result.items;
                const newEventsState = events.reduce((eventsState, event) => {
                  if (event.attendees && event.attendees.length > 2) {
                    let eventDate = moment(
                      event.start.date || event.start.dateTime
                    );
                    eventsState.push({
                      eventTitle: event.summary,
                      time: eventDate,
                      isAllDay: Boolean(event.start.date),
                      numberOfPeople: event.attendees.length,
                      numberOfBerries: 50,
                    });
                    return eventsState;
                  }
                  return eventsState;
                }, []);

                calendar.setState({
                  calendarData: newEventsState,
                });
              });
          }
        );
      });
    };

    document.body.appendChild(script);
  }

  componentDidMount() {
    this.loadCalendarApi();
  }

  render() {
    const { calendarData } = this.state;
    return (
      <div id="calBody">
        <h1 id="upcomingEvents"> Upcoming Events </h1>
        {calendarData.map((event, index) => (
          <EventCard
            data={event}
            key={index}
            user={this.props.user}
            firebase={this.props.firebase}
          />
        ))}
      </div>
    );
  }
}

export default scriptLoader('https://apis.google.com/js/api.js')(Calendar);
