import React, { Component, useRef } from "react";
import Alert from "@material-ui/lab/Alert";

class MarketChatterForm extends Component {
  constructor(props) {
    super(props);
    this.form = React.createRef();
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

  toggleAlert() {
    this.setState({ showAlert: !this.state.showAlert });
  }


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
          user_id: this.props.user.id,
          category: "private",
          remarks: "",
          date: ""
        },
        intels: [jsonedIntel, ...this.state.intels]
      });
    })
    .catch(error => console.log(error));
    this.toggleAlert();

  }
  

  render() {
    const styles = {
      container: {
        border: "1px solid #ddd",
        padding: "5px",
        borderRadius: "5px"
      },

      items: {
        display: "inline-block",
        padding: "2px",
        border: "1px solid blue",
        fontFamily: "Helvetica, sans-serif",
        borderRadius: "5px",
        marginRight: "5px",
        cursor: "pointer"
      },

      input: {
        outline: "none",
        border: "none",
        fontSize: "14px",
        fontFamily: "Helvetica, sans-serif"
      }
    };
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
                  />
                </div>
                <div class="row clearfix">
                  <label>Content</label>
                  <textarea
                    rows="10"
                    cols="30"
                    type="text"
                    id="content"
                  />
                </div>
                <div class="row clearfix">
                  <label>Source</label>
                  <input
                    type="text"
                    id="source"
                  />
                </div>
                <div class="row clearfix">
                  <label>Tags</label>
                  <label>
                    {console.log(this.state.formInputs.tags)}
                    <ul style={styles.container}>
                      {this.state.formInputs.tags.map((item, i) => (
                        <li
                          key={i}
                          style={styles.items}
                          onClick={this.handleRemoveItem(i)}
                        >
                          {item}
                          <span>(x)</span>
                        </li>
                      ))}
                      <input
                        style={styles.input}
                        value={this.state.input}
                        onChange={this.handleInputChange}
                        onKeyDown={this.handleInputKeyDown}
                        placeholder="Arrowright to enter"
                      />
                    </ul>
                  </label>
                  {/* <input
                    type="text"
                    id="tags"
                    value={this.state.formInputs.tags}
                    onChange={this.handleChange}
                  /> */}
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

                  <input
                    type="text"
                    id="user_id"
                    value={this.state.formInputs.user_id}
                    onChange={this.handleChange}
                  />
                  <input
                    type="text"
                    id="category"
                    value={this.state.formInputs.category}
                    onChange={this.handleChange}
                  />

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
  handleInputChange = evt => {
    this.setState({
      input: evt.target.value
    });
  };

  handleInputKeyDown = evt => {
    if (evt.keyCode === 39) {
      const { value } = evt.target;

      this.setState(state => ({
        formInputs: {
          tags: [...state.formInputs.tags, value],
        },
        input: ""
      }));
    }

    if (
      this.state.formInputs.tags.length &&
      evt.keyCode === 8 &&
      !this.state.input.length
    ) {
      this.setState(state => ({
        formInputs: {
          tags: state.formInputs.tags.slice(0, state.formInputs.tags.length - 1)
        }
      }));
    }
  };

  handleRemoveItem = index => {
    return () => {
      this.setState(state => ({
        formInputs:{
          tags: state.formInputs.tags.filter((item, i) => i !== index)
        }
      }));
    };
  };
}

export default MarketChatterForm;
