import React, { Component } from "react";
import Badge from "@material-ui/core/Badge";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';


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
    this.getTracker();
  }

  getTracker() {
    fetch("http://localhost:3001/user_trackers")
      .then(response => response.json())
      .then(json =>
        this.setState({ userTracker: json }, () => {
          console.log(this.state.userTracker);
          let i = this.state.userTracker.length;
          let unreadCount = 0;
          while (i--) {
            if (this.props.user.id === this.state.userTracker[i].user_id) {
              unreadCount = this.state.userTracker[i].unreadCount;
              console.log(this.state.userTracker);
              break;
            }
          }
          this.setState({
            userInfo: {
              unreadCount: unreadCount
            }
          },()=>{
            console.log(this.state.userInfo.unreadCount)
          });
        })
      )
      .catch(error => console.error(error));
  }

  getIntels() {
    fetch("http://localhost:3001/intels")
      .then(response => response.json())
      .then(json => this.setState({ intels: json }))
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
          this.countUnread(this.state.intels);
          console.log(response);
          console.log(this.state.intels);
        });
      }
    );
  };

  countUnread = intels => {
    let intelsArray = intels;
    let counter = 0;
    for (let i = 0; i < intelsArray.length; i++) {
      let readbyArray = intelsArray[i].readby.filter(
        (a, b) => intelsArray[i].readby.indexOf(a) === b
      );
      if (
        !readbyArray.includes(this.state.user.id) &&
        intelsArray[i].user_id !== this.state.user.id
      ) {
        counter = counter + 1;
        console.log(readbyArray + "," + counter);
      }
    }

    this.setState(
      {
        userInfo: {
          unreadCount: counter
        }
      },
      () => {
        this.fetchTrackers();
      }
    );
  };

  fetchTrackers = () => {
    fetch("http://localhost:3001/user_trackers")
      .then(response => response.json())
      .then(json => {
        this.setState({ trackers: json }, () => {
          this.getTrackerId();
        });
      })
      .catch(error => console.error(error));
  };

  getTrackerId = () => {
    let tracker_id = 0;
    console.log(tracker_id);
    for (let i = 0; i < this.state.trackers.length; i++) {
      if (this.state.trackers[i].user_id === this.state.user.id) {
        tracker_id = this.state.trackers[i].id;
        console.log(tracker_id);
      }
    }
    this.setState(
      {
        tracker_id: tracker_id
      },
      () => {
        this.postToUserTracker(this.state.tracker_id);
      }
    );
  };

  postToUserTracker = tracker_id => {
    fetch(`http://localhost:3001/user_trackers/${tracker_id}`, {
      method: "PATCH",
      body: JSON.stringify(this.state.userInfo),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(response => {
      console.log(response);
    });
  };

  render() {
    return (
      <div>
        <head>
          <link rel="stylesheet" type="text/css" href="/css/Intels.css" />
        </head>
        <div class="main">
          <div class="header">
            <span class="words">All Intels</span>
            {/* <Badge
              badgeContent={this.state.userInfo.unreadCount}
              color="error"
            ><ChatBubbleOutlineIcon /></Badge> */}
          </div>
          <div class="container">
            {this.state.intels.map((intel, index) => {
              {
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
                          <td id="readIcon"><CheckCircleIcon color="primary"/></td>
                        </tr>
                        <tr>
                          <td id="content">{intel.content}</td>
                        </tr>
                      </table>
                    </div>
                  );
                }
                else {
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
                          <td id="readIcon"><RadioButtonUncheckedIcon color="primary" /></td>
                        </tr>
                        <tr>
                          <td id="content">{intel.content}</td>
                        </tr>
                      </table>
                    </div>
                  );
                }
              }
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default Intels;
