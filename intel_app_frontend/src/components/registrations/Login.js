import React, { Component } from "react";
import axios from "axios";
// import {connect} from 'react-redux';
// import {userPostFetch} from "/Action.js";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      errors: ""
    };
  }
  // componentDidMount() {
  //   return this.props.loggedInStatus ? this.redirect() : null;
  // }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { username, password } = this.state;
    let user = {
      username: username,
      password: password
    };
    // this.props.userPostFetch(this.state);

    axios
      .post("http://localhost:3001/login", { user }, { withCredentials: true })
      .then(response => {
        if (response.data.logged_in) {
          this.props.handleLogin(response.data);
          this.props.history.push('/dashboard')
        } else {
          this.setState({
            errors: response.data.errors
          });
        }
      })
      .catch(error => console.log("api errors:", error));
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
    const { username, password } = this.state;
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
              <h2>Log In</h2>
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
              </div>
              <input class="button" type="submit" value="Log In" />
            </form>
          </div>
          <div>{this.state.errors ? this.handleErrors() : null}</div>
        </div>
      </div>
    );
  }
}


// const mapDispatchToProps = dispatch => ({
//   userPostFetch: userInfo => dispatch(userPostFetch(userInfo))
// })

// export default connect(null,mapDispatchToProps)(Login);

export default Login;
