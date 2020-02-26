import React, { Component } from "react";
import Field from "./Field";

const pluralize = require("pluralize");

class FieldsList extends Component {
  
  handleSubmit = event => {
    event.persist();
    event.preventDefault();
    const formData = new FormData(event.target);
    let formDataObject = {};
    for (const [key, value] of formData.entries()) {
      formDataObject[key] = value;
    }
    formDataObject = {
      fields: Object.keys(formDataObject).map(key => {
        return { field_id: key, value: formDataObject[key] };
      })
    };
    console.log(formDataObject);
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
