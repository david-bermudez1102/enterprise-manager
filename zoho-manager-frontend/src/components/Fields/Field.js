import React, { Component } from "react";
import { Link } from "react-router-dom";

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
    const { match, field } = this.props;
    return (
      <div className="form-group">
        <Link to={`${match.url}/fields/${field.id}`}>
          <button>Delete</button>
        </Link>
        {field.fieldType !== "selectable" ? (
          <input
            className="form-control"
            type={field.fieldType}
            name={field.id}
            id={field.name}
            placeholder={`Enter ${field.name}`}
            onChange={this.handleChange}
            value={this.state.value}
          />
        ) : (
          <select
            className="form-control"
            type={field.fieldType}
            name={field.id}
            id={field.name}
            placeholder={`Enter ${field.name}`}
            onChange={this.handleChange}
            value={this.state.value}
          ></select>
        )}
      </div>
    );
  }
}

export default Field;
