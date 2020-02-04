import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Dashboard from "./Dashboard.js";

class Home extends Component {
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

  handleClick = () => {
    axios
      .delete("http://localhost:3001/logout", { withCredentials: true })
      .then(response => {
        this.props.handleLogout();
        this.props.history.push("/");
      })
      .catch(error => console.log(error));
  };

  render() {
    console.log(this.props.user);
    const { hour } = this.state;

    return (
      <div>
        <head>
          <link
            rel="stylesheet"
            type="text/css"
            href="../../css/Home.css"
          />
        </head>
        <body>
          {this.props.loggedInStatus ? (
            <div>
              <Link to="/logout" onClick={this.handleClick}>
                Log Out
              </Link>
              <Dashboard user={this.props.user}
              />
            </div>
          ) : (
            <div>
              {(() => {
                if (hour < 12) return <h1>Good Morning!</h1>;
                if (hour >= 12 && hour < 17)
                  return <h1>Good Afternoon!</h1>;
                else return <h1>Good Evening!</h1>;
              })()}
              <p>
                Welcome! Collaborate and share your market intelligence and
                more.
              </p>
              <div id="buttons">
                <Link to="/login">Log In</Link>
                <Link to="/signup">Register</Link>
              </div>
            </div>
          )}
        </body>
      </div>
    );
  }
}

export default Home;
