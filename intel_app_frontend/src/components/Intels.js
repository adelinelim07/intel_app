import React, { Component } from "react";

class Intels extends Component {
  constructor(props) {
    super(props);
    this.state = {
      intels: []
    };
  }
  componentDidMount() {
    this.getIntels();
  }
  getIntels() {
    fetch("http://localhost:3001/intels")
      .then(response => response.json())
      .then(json => console.log(json))
      .catch(error => console.error(error));
  }

  render() {
    return <h2>Intels</h2>;
  }
}

export default Intels;
