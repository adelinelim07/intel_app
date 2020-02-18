import React, { Component } from "react";
import DailyNewsFeed from "./DailyNewsFeed.js";
import DailyNewsTop5 from "./DailyNewsTop5.js";
import DailyNewsAdded from "./DailyNewsAdded.js";

class DailyNews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      intels: [],
    };
  }

  componentDidMount() {
    this.setState({
      user: JSON.parse(localStorage.getItem('user'))
    })
    this.getIntels();
  }

  getIntels() {
    fetch("http://localhost:3001/intels")
      .then(response => response.json())
      .then(json => this.setState({ intels: json }))
      .catch(error => console.error(error));
    console.log(this.state.intels);
  }

  render() {
    return (
      <div>
        <head>
          <link
            rel="stylesheet"
            type="text/css"
            href="/css/DailyNews.css"
          />
        </head>
        <body>
          <div class="main">
            <div class="header">Daily News</div>
            <div class="dailynewsfeed">
              <DailyNewsFeed user={this.state.user} />
            </div>
            <div class="dailynewsadded">
              <DailyNewsAdded
                user={this.state.user}
                intels={this.state.intels}
              />
            </div>
            <div class="dailynewstop5">
              <DailyNewsTop5 />
            </div>
          </div>
        </body>
      </div>
    );
  }
}

export default DailyNews;
