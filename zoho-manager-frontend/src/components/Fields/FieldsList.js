import React, { Component } from "react";
import Field from "./Field";

const pluralize = require("pluralize");

class FieldsList extends Component {
  constructor(){
    super()
  }

  render() {
    const { fields, resource } = this.props;
    return (
      <form>
        <div>
          {fields.map(field => (
            <Field field={field} />
          ))}
        </div>
        <input
          type="submit"
          value={`Create ${pluralize.singular(resource.name)}`}
        />
      </form>
    );
  }
}
export default FieldsList;
