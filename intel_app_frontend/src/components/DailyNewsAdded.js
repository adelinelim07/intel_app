import React, { Component } from "react";

class DailyNewsAdded extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      intels: []
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
    console.log(this.state.intels);
  };

  render() {
    console.log(this.state.user);
    
    return (
      <div>
        <head>
          <link
            rel="stylesheet"
            type="text/css"
            href="../../css/DailyNews.css"
          />
        </head>
        <body>
          <h2>Daily News Added In Last Three Days</h2>
          {this.state.user ?  
          this.state.intels
            .filter(intel => (intel.user_id === this.state.user.id))
            .map(intel => {
              return <div>{intel.title}</div>;
            }) : null}
        </body>
      </div>
    );
  }
}

export default DailyNewsAdded;
