import React, { Component } from "react";
import Alert from "@material-ui/lab/Alert";

class MarketChatterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAlert: false,
      intels: [],
      /* for rest of forms*/
      formInputs: {
        title: "",
        content: "",
        source: "",
        tags: [],
        user_id: this.props.user.id,
        category: "private",
        remarks: "",
        date: ""
      }
    };
  }

  componentDidMount() {
    this.setState({
      user: JSON.parse(localStorage.getItem("user"))
    });
    this.getIntels();
  }

  getIntels() {
    fetch("http://localhost:3001/intels")
      .then(response => response.json())
      .then(json => this.setState({ intels: json }))
      .catch(error => console.error(error));
  }

  toggleAlert() {
    this.setState({ showAlert: !this.state.showAlert });
  }

  handleChange = event => {
    const updateInput = Object.assign(this.state.formInputs, {
      [event.target.id]: event.target.value
    });
    this.setState(updateInput);
    console.log(updateInput);
  };

  submitIntel = () => {
    console.log(this.state.formInputs);
    fetch("http://localhost:3001/intels", {
      body: JSON.stringify({
        title: this.state.formInputs.title,
        content: this.state.formInputs.content,
        source: this.state.formInputs.source,
        tags: this.state.formInputs.tags.split(",").map(s=>s.trim()),
        user_id: this.props.user.id,
        category: "private",
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
            title: "",
            content: "",
            source: "",
            tags: [],
            user_id: this.props.user.id,
            category: "private",
            remarks: "",
            date: ""
          },
          intels: [jsonedIntel, ...this.state.intels]
        });
      })
      .catch(error => console.log(error));
  };

  handleSubmit = event => {
    event.preventDefault();
    this.submitIntel();
    this.toggleAlert();
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
                    placeholder="Comma delimited"
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
                <input type="submit" className="submit" />
              </form>
            </div>
          </div>
        </div>
        {this.state.showAlert ? (
          <Alert
            onClose={() => {
              this.toggleAlert();
            }}
          >
            Chatter successfully submitted!
          </Alert>
        ) : null}
      </div>
    );
  }
}

export default MarketChatterForm;
