import React, { Component } from "react";
import {
  // BrowserRouter as Router,
  // Route,
  // withRouter,
  Link
} from "react-router-dom";
import axios from "axios";
// import MarketChatter from "./MarketChatter.js";
// import DailyNews from "./DailyNews.js";
// import Intels from "./Intels.js";


class SideBarMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: JSON.parse(localStorage.getItem("user")),
      userTracker: [],
      unreadCount: 0
    };
  }

  

  handleLogout = () => {
    axios
      .delete("http://localhost:3001/logout", { withCredentials: true })
      .then(response => {
        this.context.history.push("/");
        this.props.handleLogout();
        
      })
      .catch(error => console.log(error));
  };

  render() {
    return (
        <aside class="sidenav">
          <div class="sidenav__brand">
            <div class="logo">
              <span class="unbold">Share</span>
              <span class="bold">In</span>
            </div>
          </div>
          <div class="sidenav__profile">
            <div class="sidenav__profile-avatar"></div>
            <div class="sidenav__profile-title text-light">
              {this.state.user.username}
            </div>
          </div>
          <div class="row row--align-v-center row--align-h-center">
            <ul class="navList">
              <li class="navList__heading">
                <Link to="home">Home</Link></li>
              <li class="navList__heading">
                <Link to="intels">Intels</Link>
                
              </li>
              <li>
                <div class="navList__subheading row row--align-v-center">
                  <span class="navList__subheading-icon"></span>
                  <span class="navList__subheading-title">
                    <Link to="dailynews"> Daily News </Link>
                  </span>
                </div>
              </li>
              <li>
                <div class="navList__subheading row row--align-v-center">
                  <span class="navList__subheading-icon"></span>
                  <span class="navList__subheading-title">
                    <Link to="/marketchatter"> Market Chatter </Link>
                  </span>
                </div>
              </li>
              <li class="navList__heading">
                <Link to="/logout" onClick={this.handleLogout}>
                  Log Out
                </Link>
              </li>
            </ul>
          </div>
        </aside>
    );
  }
}

// export default withRouter(SideBarMenu);
export default SideBarMenu;
