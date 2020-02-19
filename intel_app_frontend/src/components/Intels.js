import React, { Component } from "react";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import Dashboard from "./Dashboard";

class Intels extends Component {
  constructor(props) {
    super(props);
    this.state = {
      intels: [],
      user: this.props.user,
      userTracker: [],
      userInfo: {
        unreadCount: 0
      },
      trackers: [],
      tracker_id: 0,
      input: {
        readby: []
      }
    };
  }
  componentDidMount() {
    this.getIntels();
  }

  componentDidUpdate(){
    this.getIntels();
  }

  getIntels() {
    fetch("http://localhost:3001/intels")
      .then(response => response.json())
      .then(json => this.setState({ intels: json }
        ,()=>{
          console.log(this.state.intels)
        }))
      .catch(error => console.error(error));
  }

  markRead = (intel, intelID) => {
    let arr = intel.readby;
    arr.push(this.state.user.id);
    this.setState(
      {
        input: {
          readby: arr
        }
      },
      () => {
        fetch(`http://localhost:3001/intels/${intelID}`, {
          method: "PATCH",
          body: JSON.stringify(this.state.input),
          headers: {
            "Content-Type": "application/json"
          }
        }).then(response => {
          this.getIntels();
          // this.countUnread(this.state.intels);
          console.log(response);
          console.log(this.state.intels);
        });
      }
    );
  };

  render() {
    return (
      <React.Fragment>
        <head>
          <link rel="stylesheet" type="text/css" href="/css/Intels.css" />
        </head>
        <div class="linedashboard">
          <Dashboard />
          <div class="main">
            <div class="header">
              <span class="words">All Intels</span>
            </div>
            <div class="container">
              {this.state.intels.map((intel, index) => {
                
                  if (
                    intel.readby.includes(this.state.user.id) ||
                    intel.user_id === this.state.user.id
                  ) {
                    return (
                      <div
                        class="readIntel"
                        onClick={() => this.markRead(intel, intel.id)}
                      >
                        <table id="eachIntel">
                          <tr>
                            <td rowspan="2" id="date">
                              {intel.created_at.slice(0, 10)}
                            </td>
                            <td id="title">{intel.title}</td>
                            <td id="readIcon">
                              <CheckCircleIcon color="primary" />
                            </td>
                          </tr>
                          <tr>
                            <td id="content">{intel.content}</td>
                          </tr>
                        </table>
                      </div>
                    );
                  } else {
                    return (
                      <div
                        class="unreadIntel"
                        onClick={() => this.markRead(intel, intel.id)}
                      >
                        <table id="eachIntel">
                          <tr>
                            <td rowspan="2" id="date">
                              {intel.created_at.slice(0, 10)}
                            </td>
                            <td id="title">{intel.title}</td>
                            <td id="readIcon">
                              <RadioButtonUncheckedIcon color="primary" />
                            </td>
                          </tr>
                          <tr>
                            <td id="content">{intel.content}</td>
                          </tr>
                        </table>
                      </div>
                    );
                  }
                }
              )}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Intels;
