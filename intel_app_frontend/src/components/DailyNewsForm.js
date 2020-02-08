import React, { Component } from "react";

class PopupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      intels: [],
      formInputs: {
        title: this.props.intelClicked.title || "",
        content: this.props.intelClicked.description || "",
        source: this.props.intelClicked.source || "",
        tags: "",
        contact_id: "",
        user_id: this.props.user.id,
        category: this.props.intelClicked.category,
        remarks: "",
        date: ""
      }
    };
  }

  componentDidMount() {
    this.getIntels();
  }

  getIntels() {
    fetch("http://localhost:3001/intels")
      .then(response => response.json())
      .then(json => this.setState({ intels: json }))
      .catch(error => console.error(error));
  }

  handleChange = event => {
    const updateInput = Object.assign(this.state.formInputs, {
      [event.target.id]: event.target.value
    });
    this.setState(updateInput);
  };

  handleSubmit = event => {
    event.preventDefault();
    fetch("http://localhost:3001/intels", {
      body: JSON.stringify(this.state.formInputs),
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      }
    })
      .then(createdIntel => {
        console.log(createdIntel);
        return createdIntel.json();
      })
      .then(jsonedIntel => {
        console.log(jsonedIntel);
        //reset form
        //add to intel
        this.setState({
          formInputs: {
            title: this.props.intelClicked.title || "",
            content: this.props.intelClicked.description || "",
            source: this.props.intelClicked.source || "",
            tags: [],
            contact_id: "",
            user_id: this.props.user.id,
            category: this.props.intelClicked.category,
            remarks: "",
            date: ""
          },
          intels: [jsonedIntel, ...this.state.intels]
        });
      })
      .catch(error => console.log(error));
  };

  render() {
    return (
      <div>
        <head>
          <link rel="stylesheet" type="text/css" href="../../css/Popup.css" />
        </head>

        <div className="popup">
          <div className="popup_inner">
            <form onSubmit={this.handleSubmit}>
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                value={this.state.formInputs.title}
                onChange={this.handleChange}
              />
              <input
                type="text"
                id="content"
                value={this.state.formInputs.content}
                onChange={this.handleChange}
              />
              <input
                type="text"
                id="source"
                value={this.state.formInputs.source}
                onChange={this.handleChange}
              />
              <input
                type="text"
                id="tags"
                value={this.state.formInputs.tags}
                onChange={this.handleChange}
              />
              <input
                type="text"
                id="remarks"
                value={this.state.formInputs.remarks}
                onChange={this.handleChange}
              />
              <input
                type="date"
                id="date"
                value={this.state.formInputs.date}
                onChange={this.handleChange}
              />
              <input
                type="text"
                id="contact_id"
                value={this.state.formInputs.contact_id}
                onChange={this.handleChange}
              />
              <input type="submit" className="submit" />
            </form>

            <p>{this.props.intelClicked.title}</p>
            <p>{this.props.intelClicked.description}</p>
            <button onClick={this.props.closePopup}>close me</button>
          </div>
        </div>
      </div>
    );
  }
}

export default PopupForm;
