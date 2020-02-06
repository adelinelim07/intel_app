import React, { Component } from "react";
import { Link } from "react-router-dom";
import Dashboard from "./Dashboard.js";
import HomeNav from "./HomeNav.js";
import axios from "axios";

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

  handleLogout = () => {
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
              {/* <Link to="/logout" onClick={this.handleLogout}>
                  Log Out
              </Link> */}
              <Dashboard 
                user={this.props.user}
              />
            </div>
          ) : (
            <div>
              <div>
                <HomeNav/>
              </div>
              <div class="logo">
                <span class="unbold">Share</span><span class="bold">In</span>
              </div>
              {(() => {
                if (hour < 12) return <div class="title">Good Morning!</div>;
                if (hour >= 12 && hour < 17)
                  return <div class="title">Good Afternoon!</div>;
                else return <div class="title">Good Evening!</div>;
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
