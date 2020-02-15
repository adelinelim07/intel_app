import React, { Component } from "react";

class DailyNewsAddedForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      intels: this.props.intels,
      intel: this.props.intel,
      edit: this.props.edit,
      formInputs: {
        title: this.props.intel.title,
        content: this.props.intel.content,
        source: this.props.intel.source,
        tags: this.props.intel.tags,
        company_id: this.props.intel.company_id,
        user_id: this.props.user.id,
        category: this.props.intel.category,
        remarks: this.props.intel.remarks,
        date: this.props.intel.date
      }
    };
  }

  // handleChange = event => {
  //   const updateInput = Object.assign(this.state.formInputs, {
  //     [event.target.id]: event.target.value
  //   });
  // };

  handleUpdate = event => {
    event.preventDefault();
    fetch(`http://localhost:3001/intels/${this.state.intel.id}`, {
      method: "PUT",
      body: JSON.stringify(this.state.formInputs),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(response => {
      this.getIntels();
      console.log(response);
    });
    this.props.handleEdit();
  };

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
          <link rel="stylesheet" type="text/css" href="../../css/Popup.css" />
        </head>

        <div className="popup">
          <div className="popup_inner">
            <div class="form_wrapper">
              <div class="form_container">
                <form onSubmit={this.handleUpdate}>
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
                    <label>Source</label>
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
                  <div class="row clearfix">
                    <label>Company</label>
                    <input
                      type="text"
                      id="company_id"
                      value={this.state.formInputs.company_id}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div class="buttons-wrapper">
                    <input type="submit" className="submit" />
                    <button class="close" onClick={this.props.handleEdit}>
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

export default DailyNewsAddedForm;
