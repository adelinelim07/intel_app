import React, { Component } from "react";

class PopupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formInputs: {
        title: this.props.intelClicked.title || "",
        content: this.props.intelClicked.description || "",
        source: this.props.intelClicked.source || "",
        tags: [],
        user_id: this.props.user.id,
        category: this.props.intelClicked.category,
        remarks: "",
        date: ""
      }
    };
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
      body: JSON.stringify({
        title: this.state.formInputs.title,
        content: this.state.formInputs.content,
        source: this.state.formInputs.source,
        tags: this.state.formInputs.tags,
        user_id: this.props.user.id,
        category: "public",
        remarks: this.state.formInputs.remarks,
        date: this.state.formInputs.date 
      }),
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
            user_id: this.props.user.id,
            category: this.props.intelClicked.category,
            remarks: "",
            date: ""
          },
          intels: [jsonedIntel, ...this.state.intels]
        }, () => {
          console.log("helloooo", document.getElementById("intelSubmit").id)
          document.getElementById("intelSubmit").id = "intelAlreadySubmit";
        });
      })
      .catch(error => console.log(error));
    this.props.closePopup();
  };

  render() {
    return (
      <div>
        <head>
          <link rel="stylesheet" type="text/css" href="../../css/Popup.css" />
        </head>

        <div className="popup">
          <div className="popup_inner">
            <div class="form_wrapper">
              <div class="form_container">
                <form onSubmit={this.handleSubmit}>
                  <div class="row clearfix">
                    <label>Title</label>
                    <input
                      type="text"
                      id="title"
                      value={this.state.formInputs.title}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div class="row clearfix">
                    <label>Content</label>
                    <textarea
                      rows="10"
                      cols="30"
                      type="text"
                      id="content"
                      value={this.state.formInputs.content}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div class="row clearfix">
                    <label>Source <a href= {this.props.intelClicked.link}>(link)</a></label>
                    <input
                      type="text"
                      id="source"
                      value={this.state.formInputs.source}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div class="row clearfix">
                    <label>Tags</label>
                    <input
                      type="text"
                      id="tags"
                      placeholder="Comma delimited"
                      value={this.state.formInputs.tags}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div class="row clearfix">
                    <label>Remarks</label>
                    <input
                      type="text"
                      id="remarks"
                      value={this.state.formInputs.remarks}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div class="row clearfix">
                    <label>Date</label>
                    <input
                      type="date"
                      id="date"
                      value={this.state.formInputs.date}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div class="buttons-wrapper">
                    <input type="submit" className="submit" />
                    <button class="close" onClick={this.props.closePopup} id="intelSubmit" >
                      X
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PopupForm;
