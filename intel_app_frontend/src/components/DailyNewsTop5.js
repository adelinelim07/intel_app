import React, { Component } from "react";

class DailyNewsTop5 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      keywords: []
    };
  }

  componentDidMount() {
    this.getKeywords();
  }

  getKeywords() {
    fetch("http://localhost:3001/keywords")
      .then(response => response.json())
      .then(json => this.setState({ 
        keywords: json,
        isLoading: false,
       }))
      .catch(error => console.error(error));
    console.log(this.state.keywords);
    
  }

  createChart = count => {
    let chart = [];
    for (let i = 0; i < count; i++) {
      chart.push(
        <span>
          <i class="material-icons md-18">notifications</i>
        </span>
      );
    }
    return chart;
  };

  render() {
    return (
      <div>
        <head>
          <link rel="stylesheet" type="text/css" href="/css/DailyNews.css" />
          <link
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
            rel="stylesheet"
          ></link>
        </head>
        <body>
          <div class="top5-subheader">Today's Top Keywords</div>
          <div class="top5-content">
            {this.state.keywords.map(keyword => {
              return (
                <li>
                  <div class="keyword">{keyword.keyword}</div>
                  <div class="chart">{this.createChart(keyword.count)}</div>
                </li>
              );
            })}

            {this.state.isLoading ? (
              <div class="loader-wrapper">
                {" "}
                <div class="lds-spinner">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </div>
            ) : null}
          </div>
        </body>
      </div>
    );
  }
}

export default DailyNewsTop5;
