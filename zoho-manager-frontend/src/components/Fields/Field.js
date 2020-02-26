import React, { Component } from "react";

class Field extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };
  }

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  render() {
    const { field } = this.props;
    return (
      <div>
        <input
          type={field.fieldType}
          name={field.name}
          placeholder={`Enter ${field.name}`}
          onChange={this.handleChange}
          value={this.state.value}
        />
      </div>
    );
  }
}

export default Field;
