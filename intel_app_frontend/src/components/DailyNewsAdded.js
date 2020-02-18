import React, { Component } from "react";
import DailyNewsAddedForm from "./DailyNewsAddedForm.js";

class DailyNewsAdded extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      edit: false,
      intels: this.props.intels,
      intelClicked: "",
    };
  }

  componentDidMount() {
    this.setState({
      user: JSON.parse(localStorage.getItem('user'))
    })
    this.getIntels();
  }

  componentDidUpdate=(prevProps,prevState)=>{
    if(this.state.intels !== prevState.intels){
      console.log("intels state has changed")
      this.getIntels();
     }
  }

  handleEdit = () => {
    this.setState({
      edit: !this.state.edit
    });
  };

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
    // console.log(this.state.intels);
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
                  .filter(
                    intel =>
                      intel.user_id === this.state.user.id &&
                      intel.category === "public"
                  )
                  .map(intel => {
                    return (
                      <div class="news">
                        <table id="addednews">
                          <tr>
                            <td>{intel.title}</td>
                            <td>
                              <button
                                class="delete"
                                onClick={() => this.handleDelete(intel.id)}
                              >
                                <i class="material-icons">delete</i>
                              </button>
                            </td>
                            <td>
                              <button
                                class="edit"
                                onClick={() => {
                                  this.setState({
                                    intelClicked: intel
                                  });
                                  this.handleEdit()}}
                              >
                                <i class="material-icons">edit</i>
                              </button>
                            </td>
                          </tr>
                        </table>
                      </div>
                    );
                  })
              : null}
            {this.state.edit ? 
            <DailyNewsAddedForm 
              intels= {this.state.intels}
              intel={this.state.intelClicked}
              user={this.props.user}
              edit={this.state.edit}
              handleEdit={()=>{this.handleEdit()}}
            /> 
            : null}
          </div>
        </body>
      </div>
    );
  }
}

export default DailyNewsAdded;
