import React, { Component } from "react";

class Field extends Component {
  constructor() {
    super();
    this.state = { value: "" };
  }

  handleChange = event => {
    event.persist();
    this.setState({ value: event.target.value });
  };

  render() {
    const { field } = this.props;
    return (
      <div className="form-group">
        <input
          className="form-control"
          type={field.fieldType}
          name={field.id}
          id={field.name}
          placeholder={`Enter ${field.name}`}
          onChange={this.handleChange}
          value={this.state.value}
        />
      </div>
    );
  }
}

export default Field;
