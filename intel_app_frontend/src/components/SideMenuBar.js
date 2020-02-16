import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Link,
  Route,
  withRouter
} from "react-router-dom";
import axios from "axios";
import MarketChatter from "./MarketChatter.js";
import DailyNews from "./DailyNews.js";
import Contacts from "./Contacts.js"

class SideBarMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: JSON.parse(localStorage.getItem('user')),
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
            href="/css/Dashboard.css"
          />
        </head>

        <aside class="sidenav">
          <div class="sidenav__brand">
            <div class="logo">
              <span class="unbold">Share</span>
              <span class="bold">In</span>
            </div>
          </div>
          <div class="sidenav__profile">
            <div class="sidenav__profile-avatar"></div>
            <div class="sidenav__profile-title text-light">{this.state.user.username}</div>
          </div>
          <div class="row row--align-v-center row--align-h-center">
            <ul class="navList">
              <li class="navList__heading">
                Home
              </li>
              <li class="navList__heading">
                Intels
              </li>
              <li>
                <div class="navList__subheading row row--align-v-center">
                  <span class="navList__subheading-icon">
                    
                  </span>
                  <span class="navList__subheading-title">
                    <Link to="dailynews"> Daily News </Link>
                  </span>
                </div>
              </li>
              <li>
                <div class="navList__subheading row row--align-v-center">
                  <span class="navList__subheading-icon">
                    
                  </span>
                  <span class="navList__subheading-title">
                    <Link to="/marketchatter"> Market Chatter </Link>
                  </span>
                </div>
              </li>
              <li class="navList__heading">
                Analysis
              </li>
              <li class="navList__heading">
                <Link to="/logout" onClick={this.handleLogout}>
                  Log Out
                </Link>
                
              </li>
            </ul>
          </div>
        </aside>

        <div class="content">
          <Route
            path="/dailynews"
            //path="/user/:username/dashboard/dailynews"
            render={props => (
              <DailyNews
                {...props}
                handleLogout={this.handleLogout}
                loggedInStatus={this.props.isLoggedIn}
                user={this.state.user}
              />
            )}
          />
          <Route
            exact
            path="/marketchatter"
            render={props => (
              <MarketChatter
                {...props}
                handleLogout={this.handleLogout}
                loggedInStatus={this.state.isLoggedIn}
                user={this.state.user}
              />
            )}
          />
          <Route
            exact
            path="/contacts"
            render={props => (
              <Contacts
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
