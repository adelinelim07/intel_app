import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Intels from "./Intels.js";
import SuggestedIntels from "./SuggestedIntels.js";
import Greeting from "./Greeting";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user
    };
  }

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
    return (
      <div>
        <head>
          <link rel="stylesheet" type="text/css" href="../../css/Home.css" />
        </head>
        <br></br>
        <body>
        {this.props.loggedInStatus ? (
          <div>
            <Link to="/logout" onClick={this.handleClick}>
              Log Out
            </Link>
            <SuggestedIntels />
            <Intels />
          </div>
        ) : (
          <div>
            <Greeting/>
          </div>
        )}
        </body>
      </div>
    );
  }
}

export default Home;
