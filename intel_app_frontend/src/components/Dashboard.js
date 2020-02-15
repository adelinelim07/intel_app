import React, { Component } from "react";
import SideBarMenu from "./SideMenuBar.js";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: JSON.parse(localStorage.getItem('user'))
    };
  }

  render() {
    console.log(this.state.user)
    return (
      <div>
        <head>
          <link rel="stylesheet" type="text/css" href="/css/Dashboard.css" />
        </head>
        <body>
          <div class="grid">
            <SideBarMenu
              user={this.state.user}
              handleLogout={this.props.handleLogout}
            />
          </div>
        </body>
      </div>
    );
  }
}

export default Dashboard;
