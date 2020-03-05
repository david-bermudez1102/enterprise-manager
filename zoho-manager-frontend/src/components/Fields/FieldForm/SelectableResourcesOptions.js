import React, { Component } from "react";
import cuid from "cuid";

class SelectableResourcesOptions extends Component {
  constructor(props) {
    super(props);
    const { resourceFieldId } = props;
    this.state = { value: resourceFieldId };
  }

  handleChange = event => {
    event.persist();
    this.setState({ value: [event.target.value] });
    this.props.handleChange(event);
  };

  render() {
    const { fields, selected } = this.props;
    return fields.some(field => field.formId === parseInt(selected)) ? (
      <div className="form-group">
        <hr />
        <label htmlFor="selectable_resource_options">Column:</label>

        <select
          name="resource_field_id"
          onChange={this.handleChange}
          value={this.state.value}
          className="form-control"
          id="selectable_resource_options">
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
      </div>
    ) : null;
  }
}

export default SelectableResourcesOptions;
