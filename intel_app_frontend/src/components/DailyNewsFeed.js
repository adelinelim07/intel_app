import React, { Component } from "react";
import PopupForm from "./DailyNewsForm.js";

class DailyNewsFeed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
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
          filteredsuggestedintels,
          isLoading: false
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

  render() {
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
                      <td>
                        <img
                          src={intel.img} alt="not loading"
                        />
                      </td>
                      <td>
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
             {this.state.isLoading ? 
             <div class="loader-wrapper">     <div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div> 
             :  null}
          </div>
        </body>
      </div>
    );
  }
}

export default DailyNewsFeed;
