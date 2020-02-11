import React, { Component } from "react";

class DailyNewsAddedForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      intels: this.props.intels,
      intel: this.props.intel
    };
  }

//   handleUpdate(intel) {
//     fetch(`http://localhost:3001/intels/${id}`, {
//       method: "PUT",
//       body: JSON.stringify({ intel: intel }),
//       headers: {
//         "Content-Type": "application/json"
//       }
//     }).then(response => {
//       this.updateIntel(intel);
//     });
//   }
//   updateIntel(intel) {
//     let newIntels = this.state.intels.filter(
//       element => element.id !== intel.id
//     );
//     newIntels.push(intel);
//     this.setState({
//       intels: newIntels
//     });
//   }

  render() {
    return (
      <div>
        <head>
          <link rel="stylesheet" type="text/css" href="../../css/Popup.css" />
        </head>

        <div className="popup">
          <div className="popup_inner">{this.state.intel.title}</div>
        </div>
      </div>
    );
  }
}

export default DailyNewsAddedForm;
