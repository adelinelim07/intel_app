import React, { Component } from "react";
import { Link } from "react-router-dom";

class Greeting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hour: null,
      username: ""
    };
  }

  componentDidMount() {
    this.getHour();
  }

  getHour = () => {
    const date = new Date();
    const hour = date.getHours();
    this.setState({
      hour
    });
  };

  render() {
    const { hour, username } = this.state;

    return (
      <div>
        <head>
          <link
            rel="stylesheet"
            type="text/css"
            href="../../css/Greeting.css"
          />
        </head>
        <body>
          {(() => {
            if (hour < 12) return <h1>Good Morning {username}!</h1>;
            if (hour >= 12 && hour < 17)
              return <h1>Good Afternoon {username}!</h1>;
            else return <h1>Good Evening {username}!</h1>;
          })()}
          <p>
            Welcome! Collaborate and share your market intelligence and more.
          </p>
          <div id="buttons">
              <Link to="/login">Log In</Link>
              <Link to="/signup">Register</Link>
          </div>
        </body>
      </div>
    );
  }
}

export default Greeting;
