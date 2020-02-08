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
          <link
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
            rel="stylesheet"
          ></link>
          <link rel="stylesheet" type="text/css" href="../../css/Popup.css" />
          <link
            rel="stylesheet"
            type="text/css"
            href="/css/DailyNews.css"
          />
        </head>
        <body>
          <div class="dailynewsfeed-subheader">Today's News Feed</div>
          <div class="dailynewsfeed-content">
            {this.state.suggestedintels.map(intel => {
              return (
                <div class="news">
                  <table id ="newsfeed">
                    <tr>
                      <td rowspan="2">
                        <img src={intel.img} onerror="this.src='https://png.pngtree.com/png-clipart/20190516/original/pngtree-newspaper-icon-png-image_3568621.jpg'"/>
                      </td>
                      <td rowspan="2">
                        <div class="newsTitle">{intel.title}</div>
                        {/* <p>{intel.description}</p>
                              <a href={intel.link}>link</a> */}
                      </td>
                      <td>
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
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <button
                          class="show"
                          onClick={() => {
                            this.setState({
                              intelClicked: intel
                            });
                            this.togglePopupShow();
                          }}
                        >
                          <i class="material-icons">zoom_in</i>
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
                      </td>
                    </tr>
                  </table>
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
