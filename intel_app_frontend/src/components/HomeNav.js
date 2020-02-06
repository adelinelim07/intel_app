import React, { Component } from "react";
import { Link } from "react-router-dom";

class HomeNav extends Component {
  render() {
    return (
      <div>
        <head>
          <link rel="stylesheet" type="text/css" href="../../css/Home.css" />
        </head>
        <body>
          <div class="home-nav">
            <Link to="/">HOME</Link>
            <Link to="/about">ABOUT</Link>
            <Link to="/contact">CONTACT</Link>
          </div>
        </body>
      </div>
    );
  }
}

export default HomeNav;
