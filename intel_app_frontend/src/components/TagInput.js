import React, { Component } from "react";

class TagsInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: this.props.items,
      focused: false,
      input: ""
    };

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
      <label>
          {console.log(this.state.items)}
        <ul style={styles.container}>
          {this.state.items.map((item, i) => (
            <li key={i} style={styles.items} onClick={this.handleRemoveItem(i)}>
              {item}
              <span>(x)</span>
            </li>
          ))}
          <input
            style={styles.input}
            value={this.state.input}
            onChange={this.handleInputChange}
            onKeyDown={this.handleInputKeyDown}
            placeholder="Arrowright delimited"
          />
        </ul>
      </label>
    );
  }

  handleInputChange=(evt)=> {
    this.setState({ 
        input: evt.target.value 
    });
  }

  handleInputKeyDown=(evt)=> {
    if (evt.keyCode === 39) {
      const { value } = evt.target;

      this.setState(state => ({
        items: [...state.items, value],
        input: ""
      }))
    }

    if (
      this.state.items.length &&
      evt.keyCode === 8 &&
      !this.state.input.length
    ) {
      this.setState(state => ({
        items: state.items.slice(0, state.items.length - 1)
      }));
    }
  }

  handleRemoveItem=(index)=> {
    return () => {
      this.setState(state => ({
        items: state.items.filter((item, i) => i !== index)
      }));
    };
  }
}

export default TagsInput;
