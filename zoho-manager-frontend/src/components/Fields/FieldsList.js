import React, { Component } from "react";
import Field from "./Field";

const pluralize = require("pluralize");

class FieldsList extends Component {
  constructor() {
    super();
    this.state = {};
  }

  handleSubmit = event => {
    event.preventDefault();
  };

  render() {
    const { fields, resource } = this.props;
    return (
      <form onSubmit={this.handleSubmit}>
        {fields.map(field => (
          <Field key={field.id} field={field} />
        ))}
        <input
          type="submit"
          value={`Create ${pluralize.singular(resource.name)}`}
        />
      </form>
    );
  }
}
export default FieldsList;
