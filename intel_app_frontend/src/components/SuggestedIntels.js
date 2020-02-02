import React, { Component } from "react";

class Popup extends Component {
  render() {
    return (
      <div className="popup">
        <div className="popup_inner">
          <h1>{this.props.text}</h1>
          <button onClick={this.props.closePopup}>close me</button>
        </div>
      </div>
    );
  }
}

class SuggestedIntels extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPopup: false,
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
    console.log(this.state.suggestedintels);
  }

  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  };

  render() {
    console.log(this.state.suggestedintels);
    return (
      <div>
        <h2>Suggested Intels</h2>
        {this.state.suggestedintels.map(intel => {
          return (
            <div>
              <h3>{intel.title}</h3>
              <p>{intel.description}</p>
              <a href={intel.link}>link</a>
              <img src={intel.img} alt="hello"></img>
              <button onClick={this.togglePopup}>+</button>

              {this.state.showPopup ? (
                <Popup
                  text="Close Me"
                  closePopup={this.togglePopup}
                />
              ) : null }
            </div>
          );
        })}
      </div>
    );
  }
}

export default SuggestedIntels;
