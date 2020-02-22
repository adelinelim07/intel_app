import React, { Component } from "react";

class MarketChatterAddedForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      showAlert: false,
      intels: [],
      intel: this.props.intel,
      comment: "",
      formInputs: {
        title: this.props.intel.title,
        content: this.props.intel.content,
        source: this.props.intel.source,
        tags: this.props.intel.tags,
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
    const updateInput = Object.assign(this.state.formInputs, {
      [event.target.id]: event.target.value
    });
    this.setState(updateInput);
  };

  amendState = () => {
    let arr = this.state.formInputs.comments;
    let userAndComment = `${this.state.user.username}: ${this.state.comment}`;
    arr.push(userAndComment);
    // let totalUnread = this.state.formInputs.unread + 1;
    this.setState(
      {
        formInputs: {
          comments: arr
          // unread: totalUnread
        }
      },
      () => {
        fetch(`http://localhost:3001/intels/${this.state.intel.id}`, {
          method: "PUT",
          body: JSON.stringify(this.state.formInputs),
          headers: {
            "Content-Type": "application/json"
          }
        }).then(response => {
          this.getIntels();
          console.log(response);
          console.log(this.state.intels);
          this.setState({
            comment: ""
          });
        });
      }
    );
  };

  handleSubmit = event => {
    event.preventDefault();
    this.amendState();
  };

  handleDelete = event => {
    fetch(`http://localhost:3001/intels/${this.state.intel.id}`, {
      method: "delete"
    }).then(() => {
      this.getIntels();
    });
    this.props.closePopup();
  };

  render() {
    const styles = {
      tags: {
        display: "inline-block",
        padding: "2px",
        fontFamily: "Helvetica, sans-serif",
        color: "white",
        borderRadius: "5px",
        marginRight: "5px",
        background: "#394263",
      },
    };
    return (
      <div>
        <head>
          <link
            rel="stylesheet"
            type="text/css"
            href="../../css/MarketChatter.css"
          />
        </head>
        <div class="popup">
          <div class="popup_inner">
            <div class="form_wrapper">
              <div class="form_container">
                <div class="showTitle">{this.state.intel.title}</div>
                <div class="showContent">{this.state.intel.content}</div>
                <div class="showTags">
                  {this.state.intel.tags.map((tag, i) => (
                    <li style={styles.tags}>{tag}</li>
                  ))}
                </div>

                <div class="showComments">Comments </div>
                {this.state.intel.comments.map(comment => {
                  return <div>{comment}</div>;
                })}
                <form onSubmit={this.handleSubmit}>
                  <div class="inputCommentsRow">
                    <input
                      type="text"
                      id="comment"
                      value={this.state.comment}
                      onChange={this.handleChange}
                    />
                    <button class="submit" onClick={() => this.handleSubmit}>
                      +
                    </button>
                  </div>
                  <div class="buttons_wrapper">
                    <button
                      class="close"
                      onClick={() => this.props.closePopup()}
                    >
                      Close
                    </button>
                    <button class="delete" onClick={() => this.handleDelete()}>
                      Delete
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

export default MarketChatterAddedForm;
