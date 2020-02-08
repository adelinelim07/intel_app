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
  }

  render() {
    console.log(this.state.user);

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
          <div class="added-subheader">Recently Saved</div>
          <div class="added-content">
            {this.state.user
              ? this.state.intels
                  .filter(intel => intel.user_id === this.state.user.id )
                  .map(intel => {
                    return <div class="news">{intel.title}</div>;
                  })
              : null}
          </div>
        </body>
      </div>
    );
  }
}

export default DailyNewsAdded;
