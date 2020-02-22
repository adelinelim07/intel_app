import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/registrations/Login";
import Signup from "./components/registrations/Signup";
import Dashboard from "./components/Dashboard";
// import {connect} from 'react-redux';
// import {getProfileFetch} from "./components/Action.js";
import MarketChatter from "./components/MarketChatter.js";
import DailyNews from "./components/DailyNews.js";
import Intels from "./components/Intels.js";
import Landing from "./components/Landing.js"


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      user: {}
    };
  }

  componentDidMount() {
    this.loginStatus();
  }

  loginStatus = () => {
    axios
      .get("http://localhost:3001/logged_in", { withCredentials: true })
      .then(response => {
        if (response.data.logged_in) {
          this.handleLogin(response);
        } else {
          this.handleLogout();
        }
      })
      .catch(error => console.log("api errors:", error));
  };

  handleLogin = data => {
    this.setState(
      {
        isLoggedIn: true,
        user: data.user
      }
    );
    localStorage.setItem('user',JSON.stringify(data.user));
  };

  handleLogout = () => {
    this.setState({
      isLoggedIn: false,
      user: {}
    });
  };

  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route
              exact
              path="/login"
              render={props => (
                <Login
                  {...props}
                  handleLogin={this.handleLogin}
                  loggedInStatus={this.state.isLoggedIn}
                />
              )}
            />
            <Route
              exact
              path="/signup"
              render={props => (
                <Signup
                  {...props}
                  handleLogin={this.handleLogin}
                  loggedInStatus={this.state.isLoggedIn}
                />
              )}
            />
            <Route
              // exact
              path="/dashboard"
              render={props => (
                <Dashboard
                  {...props}
                  handleLogout={this.handleLogout}
                  loggedInStatus={this.state.isLoggedIn}
                  user={this.state.user}
                />
              )}
            />
            <Route
              exact
              path="/user/:username/dashboard"
              render={props => (
                <Dashboard
                  {...props}
                  handleLogout={this.handleLogout}
                  loggedInStatus={this.state.isLoggedIn}
                  user={this.state.user}
                />
              )}
            />
            <Route
              exact
              path="/home"
              render={props => (
                <Landing
                  {...props}
                  handleLogout={this.handleLogout}
                  loggedInStatus={this.state.isLoggedIn}
                  user={this.state.user}
                />
              )}
            />
            <Route
              exact
              path="/"
              render={props => (
                <Home
                  {...props}
                  handleLogout={this.handleLogout}
                  loggedInStatus={this.state.isLoggedIn}
                  user={this.state.user}
                />
              )}
            />
            <Route
              exact
              path="/"
              render={props => (
                <Home
                  {...props}
                  handleLogout={this.handleLogout}
                  loggedInStatus={this.state.isLoggedIn}
                  user={this.state.user}
                />
              )}
            />
                      <Route
            path="/dailynews"
            //path="/user/:username/dashboard/dailynews"
            render={props => (
              <DailyNews
                {...props}
                handleLogout={this.handleLogout}
                loggedInStatus={this.props.isLoggedIn}
                user={this.state.user}
              />
            )}
          />
          <Route
            exact
            path="/marketchatter"
            render={props => (
              <MarketChatter
                {...props}
                handleLogout={this.handleLogout}
                loggedInStatus={this.state.isLoggedIn}
                user={this.state.user}
              />
            )}
          />
          <Route
            exact
            path="/intels"
            render={props => (
              <Intels
                {...props}
                handleLogout={this.handleLogout}
                loggedInStatus={this.state.isLoggedIn}
                user={this.state.user}
              />
            )}
          />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

// const mapDispatchToProps = dispatch => ({
//   getProfileFetch: () => dispatch(getProfileFetch())
// })

export default App;