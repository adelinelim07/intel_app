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
      query: "",
      filteredsuggestedintels: [],
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
  }

  getSuggestedIntels = () => {
    fetch("http://localhost:3001/suggestedintels")
      .then(response => response.json())
      .then(suggestedintels => {
        const { query } = this.state;
        const filteredsuggestedintels = suggestedintels.filter(element => {
          return element.title.toLowerCase().includes(query.toLowerCase());
        });

        this.setState({
          suggestedintels,
          filteredsuggestedintels
        });
      })
      .catch(error => console.error(error));
  };

  filterSuggestedIntel = event => {
    const query = event.target.value;

    this.setState(prevState => {
      const filteredsuggestedintels = prevState.suggestedintels.filter(
        element => {
          return element.title.toLowerCase().includes(query.toLowerCase());
        }
      );

      return {
        query,
        filteredsuggestedintels
      };
    });
  };

  togglePopupForm = (intel) => {
    this.setState({
      intelClicked: intel,
      showPopupForm: !this.state.showPopupForm
    });
  };

  togglePopupShow = (intel) => {
    this.setState({
      intelClicked: intel,
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
          <link rel="stylesheet" type="text/css" href="/css/DailyNews.css" />
        </head>
        <body>
          <div class="dailynewsfeed-subheader">Today's News Feed</div>
          <form class="searchbar">
            <input
              type="text"
              placeholder="Search"
              onChange={this.filterSuggestedIntel}
            />
          </form>
          <div class="dailynewsfeed-content">
            {this.state.filteredsuggestedintels.map(intel => {
              return (
                <div class="news">
                  <table id="newsfeed">
                    <tr>
                      <td rowspan="2">
                        <img
                          src={intel.img}
                          onerror="this.src='https://png.pngtree.com/png-clipart/20190516/original/pngtree-newspaper-icon-png-image_3568621.jpg'"
                        />
                      </td>
                      <td rowspan="2">
                        <div class="newsTitle">{intel.title}</div>
                        {/* <p>{intel.description}</p>
                              <a href={intel.link}>link</a> */}
                      </td>
                      <td>
                        <button
                          id={intel.id}
                          class="addIntel"
                          onClick={() => {
                            this.togglePopupForm(intel);
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
                            this.togglePopupShow(intel);
                          }}
                        >
                          <i class="material-icons">zoom_in</i>
                        </button>
                      </td>
                    </tr>
                  </table>
                </div>
              );
            })}
            {this.state.showPopupForm ? (
              <PopupForm
                intelClicked={this.state.intelClicked}
                user={this.props.user}
                closePopup={() => {
                  this.togglePopupForm(this.state.intelClicked);
                }}
              />
            ) : null}

            {this.state.showPopupShow ? (
              <PopupShow
                intelClicked={this.state.intelClicked}
                user={this.props.user}
                closePopup={() => {
                  this.togglePopupShow(this.state.intelClicked);
                }}
              />
            ) : null}
          </div>
        </body>
      </div>
    );
  }
}

export default DailyNewsFeed;
