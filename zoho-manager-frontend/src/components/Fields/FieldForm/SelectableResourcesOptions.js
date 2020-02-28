import React, { Component } from "react";
import cuid from "cuid";

class SelectableResourcesOptions extends Component {
  constructor(){
    super()
    this.state = { value: "" };
  }
  
  handleChange = event => {
    event.persist();
    this.setState({ value: [event.target.value] });
    this.props.handleChange(event);
  };

  render() {
    const { fields, selected } = this.props;
    return fields.some(field => field.formId === parseInt(selected)) ? (
      <select
        name="resource_field_id"
        onChange={this.handleChange}
        value={this.state.value}
      >
        <option value="" key={cuid()}>
          Select
        </option>
        {fields.map(field =>
          field.formId === parseInt(selected) ? (
            <option value={field.id} key={cuid()}>
              {field.name}
            </option>
          ) : null
        )}
      </select>
    ) : null;
  }
}

export default SelectableResourcesOptions;
