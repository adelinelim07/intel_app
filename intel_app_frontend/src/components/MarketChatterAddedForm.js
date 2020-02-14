import React, { Component } from "react";
import Alert from "@material-ui/lab/Alert";

class MarketChatterAddedForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAlert: false,
      intels: [],
      intel: this.props.intel,
      comment: "",
      formInputs: {
        title: this.props.intel.title,
        content: this.props.intel.content,
        source: this.props.intel.source,
        tags: this.props.intel.tags,
        company_id: this.props.intel.company_id,
        user_id: this.props.user.id,
        category: "private",
        remarks: this.props.intel.remarks,
        date: this.props.intel.date,
        comments: this.props.intel.comments
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
    this.setState({ [event.target.id] : event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.setState({
      formInputs: {
        comments: this.state.formInputs.comments.push(this.state.comment)
      }
    });
    console.log(this.state.formInputs);
    fetch(`http://localhost:3001/intels/${this.state.intel.id}`, {
      method: "PUT",
      body: JSON.stringify(this.state.formInputs),
      headers: {
        "Content-Type": "application/json"
      },
    }).then(response => {
      this.getIntels();
      console.log(response);
      console.log(this.state.intels)
    });
    this.props.closePopup();
  };

  render() {
    return (
      <div>
        <head>
          <link rel="stylesheet" type="text/css" href="../../css/MarketChatter.css" />
        </head>
        <div class="popup">
          <div class="popup_inner">
            <div class="form_wrapper">
              <div class="form_container">
                <div>{this.state.intel.title}</div>
                {this.state.intel.comments.map(comment=>{
                    return(
                        <div>{comment}</div>
                    )
                })}
                <form onSubmit={this.handleSubmit}>
                  <label>Comment</label>
                  <input
                    type="text"
                    id="comment"
                    value={this.state.comment}
                    onChange={this.handleChange}
                  />
                  <input type="submit" className="submit" />
                  <button class="close"
                   onClick={()=>this.props.closePopup()}
                  >Close</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MarketChatterAddedForm;
