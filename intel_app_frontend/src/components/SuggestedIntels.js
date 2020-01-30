import React, { Component } from "react";

class SuggestedIntels extends Component {
  constructor(props) {
    super(props);
    this.state = {
      suggestedintels: []
    };
  }
  componentDidMount() {
    this.getSuggestedIntels();
  }
  getSuggestedIntels() {
    fetch("http://localhost:3001/suggestedintels")
      .then(response => response.json())
      .then(json => this.setState({ suggestedintels: json }))
      .catch(error => console.error(error));
      console.log(this.state.suggestedintels)
  }

  render() {
    console.log(this.state.suggestedintels)
    return (
      <div>
        <h1>Suggested Intels</h1>
        {this.state.suggestedintels.map(intel=>{
          return(
          <div>
          <p>{intel.title}</p>
          <p>{intel.description}</p>
          </div>
          )
        })}
      </div>
    );
  }
}

export default SuggestedIntels;
