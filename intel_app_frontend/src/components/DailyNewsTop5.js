import React, { Component } from "react";

class DailyNewsTop5 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keywords: []
    };
  }

  componentDidMount() {
    this.getKeywords();
  }

  getKeywords() {
    fetch("http://localhost:3001/keywords")
      .then(response => response.json())
      .then(json => this.setState({ keywords: json }))
      .catch(error => console.error(error));
    console.log(this.state.keywords);
  }

  render() {
    return (
      <div>
        <head>
          <link
            rel="stylesheet"
            type="text/css"
            href="../../css/Dashboard.css"
          />
        </head>
        <body>
          <h2>Daily News Top 5</h2>
          {this.state.keywords.map(keyword=>{
            return(
              <div>
                <li>{keyword.keyword} {keyword.count}</li>
              </div>
            )
          })}
        </body>
      </div>
    );
  }
}

export default DailyNewsTop5;
