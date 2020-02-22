import React, { Component } from "react";
import Dashboard from "./Dashboard";

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user
    }
  }
  componentDidMount() {
    this.getIntels();
  }

  componentDidUpdate() {
    this.getIntels();
  }

  getIntels = () => {
    fetch("http://localhost:3001/intels")
      .then(response => response.json())
      .then(intels => {
        const { query } = this.state;
        const filteredIntels = intels.filter(element => {
          return element.title.toLowerCase().includes(query.toLowerCase());
        });
        this.setState({
          intels,
          filteredIntels,
          isLoading: false
        });
      })
      .catch(error => console.error(error));
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
            <div class="header">{this.state.user.username}</div>
            <div class="container"></div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Landing;
