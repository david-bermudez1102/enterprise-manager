import React, { Component } from "react";
import { Link } from "react-router-dom";
import cuid from "cuid";

class Field extends Component {
  constructor() {
    super();
    this.state = { value: "" };
  }

  handleChange = event => {
    event.persist();
    this.setState({ value: event.target.value });
  };

  fieldName = () => {
    const { field } = this.props;
    return field.name
      .split("_")
      .map(word => word.charAt(0).toUpperCase() + word.substr(1).toLowerCase())
      .join(" ");
  };

  render() {
    const { match, field, recordField } = this.props;

    return (
      <div className="form-group">
        <label htmlFor={field.name}>{this.fieldName()}:</label>
        <Link to={`${match.url}/fields/${field.id}/delete`}>Delete</Link>
        <Link to={`${match.url}/fields/${field.id}/edit`}>Edit</Link>
        {field.fieldType !== "selectable" ? (
          <input
            className="form-control"
            type={field.fieldType}
            name={recordField ? recordField.id : null}
            id={field.name}
            placeholder={`Enter ${this.fieldName()}`}
            onChange={this.handleChange}
            value={this.state.value}
          />
        ) : (
          <select
            className="form-control"
            name={recordField ? recordField.id : null}
            id={field.name}
            placeholder={`Enter ${field.name}`}
            onChange={this.handleChange}
            value={this.state.value}
          >
            {field.selectableResource
              ? field.selectableResource.options.map(option => (
                  <option key={cuid()} value={option.value}>
                    {option.value}
                  </option>
                ))
              : field.options.map(option => (
                  <option key={cuid()} value={option.value}>
                    {option.value}
                  </option>
                ))}
          </select>
        )}
      </div>
    );
  }
}

export default Field;
