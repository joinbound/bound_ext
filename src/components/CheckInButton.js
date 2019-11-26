import React, { Component } from "react";
import ReactGA from "react-ga";
import moment from "moment";

class CheckInButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      minutesLeft: 15,
      timer: null
    };

    this.runTimer = this.runTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
  }

  componentDidMount() {
    const { time: eventTime } = this.props;
    console.log(eventTime);
    const now = moment();
    const event = moment(eventTime);
    const checkInPeriod = moment.duration("00:15:00");
    const checkInStart = moment(eventTime).subtract(checkInPeriod);

    if (now.isAfter(event)) {
      this.setState({
        minutesLeft: -1
      });
    } else {
      if (now.isSameOrBefore(checkInStart)) {
        setTimeout(
          function() {
            this.runTimer();
          }.bind(this),
          moment.duration(checkInStart.diff(now)).valueOf()
        );
      } else if (now.isBetween(checkInStart, event)) {
        this.setState({
          minutesLeft:
            moment.duration(event.diff(now, "minutes"), "minutes").valueOf() /
            60000
        });
        this.runTimer();
      }
      setTimeout(
        function() {
          this.stopTimer();
        }.bind(this),
        moment.duration(event.diff(now).valueOf())
      );
    }
  }

  runTimer() {
    this.setState({
      timer: setInterval(
        function() {
          this.updatesMinutesLeft();
        }.bind(this),
        60000
      )
    });
  }

  stopTimer() {
    const { timer } = this.state;
    this.setState({
      timer: clearInterval(timer),
      minutesLeft: -1
    });
  }

  updatesMinutesLeft() {
    const { minutesLeft, timer } = this.state;
    if (minutesLeft < 0) {
      this.setState({
        timer: clearInterval(timer)
      });
    }
    this.setState({
      minutesLeft: minutesLeft - 1
    });
  }

  render() {
    const { onClick } = this.props;
    const { minutesLeft } = this.state;

    const isWithinCheckin = minutesLeft < 15 && minutesLeft >= 0;
    const buttonStyle = {
      backgroundColor: isWithinCheckin ? "#ff5252" : "#9b9b9b",
      textAlign: "center"
    };

    const minutesLeftText = () => {
      if (minutesLeft >= 15) return "Check in 15 minutes before";
      else if (minutesLeft >= 0)
        return `You have ${minutesLeft} minutes to check in`;
      return "You have missed the deadline to check in";
    };

    const checkInWithTracking = () => {
      ReactGA.event({
        category: 'Upcoming Events',
        action: 'Checked In',
        label: 'Minutes Left',
        value: parseInt(minutesLeft)
      });

      onClick();
    };

    return (
      <div className="checkInButton">
        <button
          id="checkIn"
          style={buttonStyle}
          disabled={!isWithinCheckin}
          onClick={() => (isWithinCheckin ? checkInWithTracking() : null)}
        >
          {minutesLeftText()}
        </button>
      </div>
    );
  }
}

export default CheckInButton;
