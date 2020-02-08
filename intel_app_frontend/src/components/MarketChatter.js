import React, { Component } from "react";
import PopupForm from "./MarketChatterForm.js";

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
          <button class="addIntel" onClick={() => this.togglePopupForm()}>
            Contribute
          </button>
          {this.state.showPopupForm ? (
            <PopupForm
              user={this.props.user}
              closePopup={() => {
                this.togglePopupForm();
              }}
            />
          ) : null}
        </div>
      </div>
    );
  }
}

export default MarketChatter;
