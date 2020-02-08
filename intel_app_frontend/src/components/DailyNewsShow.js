import React, { Component } from "react";

class PopupShow extends Component {
  render() {
    return (
      <div className="popup">
        <div className="popup_inner">
          <head>
            <link
              rel="stylesheet"
              type="text/css"
              href="../../css/DailyNews.css"
            />
            <link
              rel="stylesheet"
              type="text/css"
              href="../../css/Popup.css"
            />
          </head>
          <h4>{this.props.intelClicked.title}</h4>
          <p>{this.props.intelClicked.description}</p>
          <a href= {this.props.intelClicked.link}>link</a>
          <button onClick={this.props.closePopup}>close me</button>
        </div>
      </div>
    );
  }
}

export default PopupShow;
