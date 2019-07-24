import React, { Component } from 'react';
import scriptLoader from 'react-async-script-loader'

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

  // loadYoutubeApi() {
  //   const script = document.createElement("script");
  //   script.src = "https://apis.google.com/js/client.js";

  //   console.log(this.props.userCredential);

  //   script.onload = () => {
  //     window.gapi.load('client:auth2', () => {
  //       window.gapi.client.setApiKey(process.env.REACT_APP_API_KEY);
  //       window.gapi.client.load('calendar', 'v3');
  //       window.gapi.auth.authorize({
  //         client_id: '121179289007-bbd4nrrm6g5sutpao31auapgp482etdo.apps.googleusercontent.com',
  //         scope: "https://www.googleapis.com/auth/calendar.events.readonly",
  //         immediate: true
  //       }, (result) => {
  //         console.log(result);
  //           window.gapi.client.load('calendar', 'v3');
  //           window.gapi.client.calendar.events.list({
  //           calendarId: 'primary',
  //           maxResult: 10
  //         }).then(function (response) {
  //           var events = response.result.items;
  //           console.log(events);
  //          });
  //       });
  //       // window.gapi.client.init({
  //       //   apiKey: process.env.REACT_APP_API_KEY,
  //       //   discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
  //       //   clientId: '121179289007-bbd4nrrm6g5sutpao31auapgp482etdo.apps.googleusercontent.com',
  //       //   scope: "https://www.googleapis.com/auth/calendar.readonly",
  //       // }).then(function () {
  //       //   window.gapi.client.load('calendar', 'v3');
  //       //   window.gapi.client.calendar.events.list({
  //       //     calendarId: 'primary',
  //       //     maxResult: 10
  //       //   }).then(function (response) {
  //       //     var events = response.result.items;
  //       //     console.log(events);
  //         // });
  //       // window.gapi.client.setApiKey("");
  //       // window.gapi.client.load('youtube', 'v3', () => {
  //       //   this.setState({ gapiReady: true });
  //       // });
  //     });
  //   };

  //   document.body.appendChild(script);
  // }

  // componentDidMount() {
  //   this.loadYoutubeApi();
  // }

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

export default scriptLoader(
  'https://apis.google.com/js/api.js'
)(Calendar)

