import React, { Component } from "react";
import SideBarMenu from "./SideMenuBar.js";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user
    };
  }

  componentDidMount=()=>{
    this.setState({
      user: JSON.parse(localStorage.getItem('user'))
    })
  }

  render() {
    console.log(this.state.user)
    return (
      <div>
        <head>
          <link rel="stylesheet" type="text/css" href="/css/Dashboard.css" />
        </head>
          <div class="grid">
            <SideBarMenu
              user={this.state.user}
              handleLogout={this.props.handleLogout}
            />
          </div>
      </div>
    );
  }
}

export default Dashboard;
