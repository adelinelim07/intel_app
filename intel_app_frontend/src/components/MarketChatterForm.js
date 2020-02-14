import React, { Component } from "react";

class MarketChatterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      intels: [],
      formInputs: {
        title: "",
        content: "",
        source: "",
        tags: [],
        company_id: "",
        user_id: this.props.user.id,
        category: "private",
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
    console.log(this.state.intels);
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
            title: "",
            content: "",
            source: "",
            tags: [],
            company_id: "",
            user_id: this.props.user.id,
            category: "private",
            remarks: "",
            date: ""
          },
          intels: [jsonedIntel, ...this.state.intels]
        });
      })
      .catch(error => console.log(error));
      alert("Submitted successfully!")
  };

  render() {
    return (
      <div>
        <div class="chatterform-subheader">Input Form</div>
        <div class="chatterform-content">
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
                <input type="submit" className="submit" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MarketChatterForm;
