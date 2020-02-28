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
          >
            {field.selectableResource ? field.selectableResource.options.map(option => (
              <option key={cuid()} value={option.id}>{option.value}</option>
            )) : null}
          </select>
        )}
      </div>
    );
  }
}

export default Field;
