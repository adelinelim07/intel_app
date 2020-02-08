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

  handleDelete = id => {
    fetch(`http://localhost:3001/intels/${id}`, { method: "delete" }).then(
      response => {
        alert("Deleted");
        this.getIntels();
      }
    );
  };

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
          <link rel="stylesheet" type="text/css" href="/css/DailyNews.css" />
          <link
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
            rel="stylesheet"
          />
        </head>
        <body>
          <div class="added-subheader">Recently Saved</div>
          <div class="added-content">
            {this.state.user
              ? this.state.intels
                  .filter(intel => intel.user_id === this.state.user.id)
                  .map(intel => {
                    return (
                      <div class="news">
                        <table id ="addednews">
                          <tr>
                            <td>{intel.title}</td>
                            <td>
                              <button class="delete"
                                onClick={() => this.handleDelete(intel.id)}>
                                <i class="material-icons">delete</i>
                              </button>
                            </td>
                            <td>
                              <button class="show">
                                <i class="material-icons">zoom_in</i>
                              </button>
                            </td>
                            <td>
                              <button class="edit">
                                <i class="material-icons">edit</i>
                              </button>
                            </td>
                          </tr>
                        </table>
                      </div>
                    );
                  })
              : null}
          </div>
        </body>
      </div>
    );
  }
}

export default DailyNewsAdded;
