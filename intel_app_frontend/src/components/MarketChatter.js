import React, { Component } from "react";
import MarketChatterForm from "./MarketChatterForm.js";
import MarketChatterAdded from "./MarketChatterAdded.js";

class MarketChatter extends Component {
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

  togglePopupForm = () => {
    this.setState({
      showPopupForm: !this.state.showPopupForm
    });
  };

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
        <div class="main">
          <div class="header">Market Chatter</div>
          <div class="chatterform">
          <MarketChatterForm
            user={this.state.user}
          />
          </div>
          <div class="chatteradded">
          <MarketChatterAdded/>
          </div>
        </div>
      </div>
    );
  }
}

export default MarketChatter;
