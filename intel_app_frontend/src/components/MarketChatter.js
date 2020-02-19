import React, { Component } from "react";
import MarketChatterForm from "./MarketChatterForm.js";
import MarketChatterAdded from "./MarketChatterAdded.js";
import Dashboard from "./Dashboard";

class MarketChatter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      intels: [],
      user: this.props.user
    };
  }
  componentDidMount() {
    this.setState({
      user: JSON.parse(localStorage.getItem("user"))
    },()=>{
      console.log(this.state.user)
    });
  
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
      <React.Fragment>
        <head>
          <link
            rel="stylesheet"
            type="text/css"
            href="../../css/MarketChatter.css"
          />
        </head>
        <div class="linedashboard">
          <Dashboard />
          <div class="main">
            <div class="header">Market Chatter</div>
            <div class="chatterform">
              <MarketChatterForm user={this.state.user} />
            </div>
            <div class="chatteradded">
              <MarketChatterAdded user={this.state.user} />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default MarketChatter;
