import React, { Component } from "react";
import SideBarMenu from "./SideMenuBar.js";
import Cookies from 'js-cookie'

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
    };
  }

  render() {
    return (
      <div>
      <head>
          <link
            rel="stylesheet"
            type="text/css"
            href="/css/Dashboard.css"
          />
        </head>
        <body>
          <div class="grid">
          <SideBarMenu 
          user={this.props.user} 
          handleLogout={this.props.handleLogout}/>
          </div>
        </body>
      </div>
    );
  }
}

export default Dashboard;
