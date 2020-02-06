import React, { Component } from "react";
import axios from "axios";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      password_confirmation: "",
      errors: "",
    };
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };
  handleSubmit = event => {
    event.preventDefault();
    const { username, email, password, password_confirmation } = this.state;
    let user = {
      username: username,
      email: email,
      password: password,
      password_confirmation: password_confirmation
    };
    axios
      .post("http://localhost:3001/users", { user }, { withCredentials: true })
      .then(response => {
        if (response.data.status === "created") {
          // this.props.handleLogin(response.data);
          this.redirect();
        } else {
          this.setState({
            errors: response.data.errors
          });
        }
      })
      .catch(error => console.log("api errors:", error));
  };
  redirect = () => {
    this.props.history.push("/login");
  };
  handleErrors = () => {
    return (
      <div>
        <ul>
          {this.state.errors.map(error => {
            return <li key={error}>{error}</li>;
          })}
        </ul>
      </div>
    );
  };
  render() {
    const { username, email, password, password_confirmation } = this.state;
    return (
      <div>
        <head>
          <link rel="stylesheet" type="text/css" href="../../css/Forms.css" />
          {/* <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet"/> */}
        </head>
        <div class="bg_img"></div>
        <div class="form_wrapper">
          <div class="form_container">
            <div class="title_container">
              <h2>Sign Up</h2>
            </div>
            <form onSubmit={this.handleSubmit}>
              <div class="row clearfix">
                <div class="col_half">
                  <label>Username</label>
                  <div class="input_field">
                    {" "}
                    <span>
                    <i class="material-icons">person</i>
                    </span>
                    <input
                      placeholder="username"
                      type="text"
                      name="username"
                      value={username}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>

                <div class="col_half">
                  <label>Email</label>
                  <div class="input_field">
                    {" "}
                    <span>
                      <i class="material-icons">email</i>
                    </span>
                    <input
                      placeholder="email"
                      type="text"
                      name="email"
                      value={email}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
              </div>
              <div class="row clearfix">
                <div class="col_half">
                  <label>Password</label>
                  <div class="input_field">
                    {" "}
                    <span>
                      <i class="material-icons">lock</i>
                    </span>
                    <input
                      placeholder="password"
                      type="password"
                      name="password"
                      value={password}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
                <div class="col_half">
                  <label>Password</label>
                  <div class="input_field">
                    {" "}
                    <span>
                      <i class="material-icons">lock</i>
                    </span>
                    <input
                      placeholder="password confirmation"
                      type="password"
                      name="password_confirmation"
                      value={password_confirmation}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
              </div>
              <input class="button" type="submit" value="Sign Up" />
            </form>
          </div>
          <div>{this.state.errors ? this.handleErrors() : null}</div>
        </div>
      </div>
    );
  }
}
export default Signup;
