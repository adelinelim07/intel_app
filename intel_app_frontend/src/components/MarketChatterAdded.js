import React, { Component } from "react";
import Badge from "@material-ui/core/Badge";
import MarketChatterAddedForm from "./MarketChatterAddedForm.js";

class MarketChatterAdded extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showEdit: false,
      intels: [],
      user: this.props.user,
      intelClicked: "",
    };
  }
  componentDidMount() {
    this.getIntels();
  }

  componentDidUpdate() {
    this.getIntels();
  }


  getIntels() {
    fetch("http://localhost:3001/intels")
      .then(response => response.json())
      .then(json => this.setState({ intels: json }))
      .catch(error => console.error(error));
  }

  toggleShowEdit= (intel) =>{
    this.setState({
      showEdit: !this.state.showEdit,
      intelClicked: intel
    });
    console.log(this.state.showEdit)
  }

  render() {
    return (
      <div>
        <head>
          <link
            rel="stylesheet"
            type="text/css"
            href="../../css/MarketChatter.css"
          />
          <link
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
            rel="stylesheet"
          />
        </head>
        <div class="chatteradded-subheader">Market Chatter Added</div>
        <div class="chatteradded-content">
          {this.state.intels
            .filter(
              intel =>
                // intel.user_id === this.state.user.id &&
                intel.category === "private"
            )
            .map(intel => {
              return (
                <div class="news">
                  <table>
                    <tr>
                      <td class="title">{intel.title}</td>
                      <td class="badge">
                      {intel.unread} comments
                      </td>
                      <td class="show">
                        <button class="show-button"
                        onClick={()=>
                        this.toggleShowEdit(intel)
                        }>
                          <i class="material-icons">zoom_in</i>
                        </button>
                      </td>
                    </tr>
                  </table>
                </div>
              );
            })}
        </div>
        {this.state.showEdit?
        <MarketChatterAddedForm
        intel= {this.state.intelClicked}
        user= {this.state.user}
        unreadCount = {this.state.unreadCount}
        addUnreadCount = {()=>this.addUnreadCount()}
        closePopup={()=>this.toggleShowEdit(this.state.intelClicked)}
        />: null
        }
      </div>
    );
  }
}

export default MarketChatterAdded;
