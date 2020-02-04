import React, { Component } from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import Intels from "./Intels.js";
import DailyNews from "./DailyNews.js";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user
    };
  }

  render() {
    return (
      <Router>
        <head>
          <link
            rel="stylesheet"
            type="text/css"
            href="../../css/Dashboard.css"
          />
        </head>
        <div>
          <h1>Dashboard</h1>
          <ul class="header">
            <li>
              <Link to="/dailynews">Daily News</Link>
            </li>
            <li>
              <Link to="/intels">Intels</Link>
            </li>
          </ul>
        </div>
        <div class="content">
          <Route
            exact
            path="/dailynews"
            render={props => (
              <DailyNews
                {...props}
                handleLogout={this.handleLogout}
                loggedInStatus={this.state.isLoggedIn}
                user={this.state.user}
              />
            )}
          />
          <Route
            exact
            path="/intels"
            render={props => (
              <Intels
                {...props}
                handleLogout={this.handleLogout}
                loggedInStatus={this.state.isLoggedIn}
                user={this.state.user}
              />
            )}
          />
        </div>
      </Router>
    );
  }
}

export default Dashboard;
