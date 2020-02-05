import React, { Component } from "react";
import { BrowserRouter as Router, Link, Route, withRouter } from "react-router-dom";
import axios from "axios";
import Intels from "./Intels.js";
import DailyNews from "./DailyNews.js";

class SideBarMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user
    };
  }

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
    return (
      <Router>
        <head>
          <link
            rel="stylesheet"
            type="text/css"
            href="../../css/Dashboard.css"
          />
        </head>

        <aside class="sidenav">
          <div class="sidenav__brand">
            <i class="fas fa-feather-alt sidenav__brand-icon"></i>
              Share<span class="text-light">In</span>
            <i class="fas fa-times sidenav__brand-close"></i>
          </div>
          <div class="sidenav__profile">
            <div class="sidenav__profile-avatar"></div>
            <div class="sidenav__profile-title text-light">Placeholder</div>
          </div>
          <div class="row row--align-v-center row--align-h-center">
            <ul class="navList">
              <li class="navList__heading">
                Home<i class="far fa-file-alt"></i>
              </li>

              <li class="navList__heading">
                Intels<i class="far fa-envelope"></i>
              </li>
              <li>
                <div class="navList__subheading row row--align-v-center">
                  <span class="navList__subheading-icon">
                    <i class="fas fa-envelope"></i>
                  </span>
                  <span class="navList__subheading-title">
                    <Link to="/dailynews"> Daily News </Link>
                  </span>
                </div>
              </li>
              <li>
                <div class="navList__subheading row row--align-v-center">
                  <span class="navList__subheading-icon">
                    <i class="fas fa-eye"></i>
                  </span>
                  <span class="navList__subheading-title">
                    <Link to="/intels"> Market Intels </Link>
                  </span>
                </div>
              </li>
              <li class="navList__heading">
                Analysis<i class="far fa-image"></i>
              </li>
              <li class="navList__heading">
                <Link to="/logout" onClick={this.handleLogout}>
                  Log Out
                </Link>
                <i class="far fa-image"></i>
              </li>
            </ul>
          </div>
        </aside>

        <div class="content">
          <Route
            exact
            path="/dailynews"
            render={props => (
              <DailyNews
                {...props}
                handleLogout={this.handleLogout}
                loggedInStatus={this.props.isLoggedIn}
                user={this.props.user}
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

export default withRouter(SideBarMenu);
