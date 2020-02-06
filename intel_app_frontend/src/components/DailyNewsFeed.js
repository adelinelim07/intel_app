import React, { Component } from "react";
import PopupForm from "./DailyNewsForm.js";
import PopupShow from "./DailyNewsShow.js";

class DailyNewsFeed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPopupForm: false,
      showPopupShow: false,
      suggestedintels: [],
      intelClicked: "",
      user: this.props.user
    };
  }

  componentDidMount() {
    this.getSuggestedIntels();
    this.getIntels();
  }

  getIntels() {
    fetch("http://localhost:3001/intels")
      .then(response => response.json())
      .then(json => this.setState({ intels: json }))
      .catch(error => console.error(error));
    console.log(this.state.intels);
  }

  getSuggestedIntels() {
    fetch("http://localhost:3001/suggestedintels")
      .then(response => response.json())
      .then(json => this.setState({ suggestedintels: json }))
      .catch(error => console.error(error));
    console.log(this.state.suggestedintels);
  }

  togglePopupForm = () => {
    this.setState({
      showPopupForm: !this.state.showPopupForm
    });
  };

  togglePopupShow = () => {
    this.setState({
      showPopupShow: !this.state.showPopupShow
    });
  };

  render() {
    console.log(this.props.user);
    return (
      <div>
        <head>
          <link rel="stylesheet" type="text/css" href="../../css/Popup.css" />
          <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
          <link
            rel="stylesheet"
            type="text/css"
            href="../../css/DailyNews.css"
          />
        </head>
        <body>
          <div class="dailynewsfeed-subheader">Today's News Feed</div>
          <div class="dailynewsfeed-content">
            {this.state.suggestedintels.map(intel => {
              return (
                <div class="news">
                  <img src={intel.img} alt="hello"></img>
                  <h4>{intel.title}</h4>
                  {/* <p>{intel.description}</p>
                <a href={intel.link}>link</a> */}

                  <button
                    class="addIntel"
                    onClick={() => {
                      this.setState({
                        intelClicked: intel
                      });
                      this.togglePopupForm();
                    }}
                  >
                    <i class="material-icons">save</i>
                  </button>

                  <button
                    class="show"
                    onClick={() => {
                      this.setState({
                        intelClicked: intel
                      });
                      this.togglePopupShow();
                    }}
                  >
                    SEE MORE
                  </button>

                  {this.state.showPopupForm ? (
                    <PopupForm
                      intelClicked={this.state.intelClicked}
                      user={this.props.user}
                      closePopup={() => {
                        this.togglePopupForm();
                      }}
                    />
                  ) : null}

                  {this.state.showPopupShow ? (
                    <PopupShow
                      intelClicked={this.state.intelClicked}
                      user={this.props.user}
                      closePopup={() => {
                        this.togglePopupShow();
                      }}
                    />
                  ) : null}
                </div>
              );
            })}
          </div>
        </body>
      </div>
    );
  }
}

export default DailyNewsFeed;
