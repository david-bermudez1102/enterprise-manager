import React, { Component } from "react";
import { connect } from "react-redux";
import cuid from "cuid";

class SelectableOptions extends Component {
  constructor() {
    super();
    this.state = {
      itemValue: "",
      options: []
    };
  }

  handleChange = event => {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value
    });
  };

  handleClick = event => {
    event.persist();
    event.preventDefault();
    this.setState({
      ...this.state,
      options: [...this.state.options, this.state.itemValue]
    });
  };

  render() {
    return (
      <div>
        {this.state.options.map(option => (
          <input type="text" value={option} readOnly={true} key={cuid()}/>
        ))}
        Add items to selectable:
        <input
          type="text"
          name="itemValue"
          onChange={this.handleChange}
          value={this.itemValue}
        />
        <button onClick={this.handleClick}>Add another Item</button>
      </div>
    );
  }
}

const mapStateToProps = ({ resources, fields }) => {
  return { resources, fields };
};

export default connect(mapStateToProps)(SelectableOptions);
