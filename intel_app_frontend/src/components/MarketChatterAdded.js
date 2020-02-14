import React, { Component } from "react";

class MarketChatterAdded extends Component {
  constructor(props) {
    super(props);
    this.state = {
      intels: [],
      user: this.props.user
    };
  }
  componentDidMount() {
    this.getIntels();
  }
  getIntels() {
    fetch("http://localhost:3001/intels")
      .then(response => response.json())
      .then(json => console.log(json))
      .catch(error => console.error(error));
  }

  render() {
    return (
      <div>
        <head>
          <link rel="stylesheet" type="text/css" href="../../css/Popup.css" />
          <link
            rel="stylesheet"
            type="text/css"
            href="../../css/MarketChatter.css"
          />
        </head>
        <div class="chatteradded-subheader">Market Chatter Added</div>
        <div class="chatteradded-content"></div>
      </div>
    );
  }
}

export default MarketChatterAdded;
