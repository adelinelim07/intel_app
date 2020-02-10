import React, { Component } from "react";

class Contacts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      contacts: []
    };
  }

  componentDidMount() {
    this.getContacts();
  }
  getContacts() {
    fetch("http://localhost:3001/contacts")
      .then(response => response.json())
      .then(json => this.setState({ contacts: json }))
      .catch(error => console.error(error));
  }

  render() {
    return (
      <div>
        <head>
          <link rel="stylesheet" type="text/css" href="/css/Contacts.css" />
        </head>
        <div class="main">
          <div class="header">Contacts</div>
          {this.state.contacts.map(contact => {
              return(
              <div>{contact.name}</div>
              )
          })}
        </div>
      </div>
    );
  }
}

export default Contacts;
