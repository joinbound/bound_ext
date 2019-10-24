import React, { Component } from "react";
import CheckInButton from "./CheckInButton";
import * as moment from "moment";
import eventTitleIcon from "../images/eventTitleIcon.png";
import eventMemberIcon from "../images/eventMemberIcon.png";
import redBerryIcon from "../images/RedBerryIcon.png";
import eventTimeIcon from "../images/EventTimeIcon.png";

class EventCard extends Component {
  render() {
    const {
      data: {
        eventTitle,
        numberOfBerries,
        numberOfPeople,
        time,
        isAllDay,
        calendarId
      },
      handleUserData
    } = this.props;

    return (
      <div id="eventInfoAndCheckInButton">
        <div id="eventDetails">
          <img id="eventTitleIcon" src={eventTitleIcon} alt="Event Title" />
          {eventTitle}
          <br />
          <img id="eventTimeIcon" src={eventTimeIcon} alt="Event Time" />
          {moment(time).format(isAllDay ? "MM/DD" : "MM/DD/YYYY hh:mm a")}
          <br />
          <img id="eventBerryIcon" src={redBerryIcon} alt="Event Time" />
          {numberOfBerries} Berries
          <img id="eventMemberIcon" src={eventMemberIcon} alt="Event Time" />
          {numberOfPeople} People
        </div>
        <CheckInButton
          time={time}
          onClick={() =>
            handleUserData("incrementBerries", { count: 50, calendarId })
          }
        />
      </div>
    );
  }
}
export default EventCard;
