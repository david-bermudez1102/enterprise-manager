import React, { Component } from "react";
import TextField from "./TextField";
import PasswordField from "./PasswordField";
import SelectableField from "./SelectableField";

export default class FieldForm extends Component {
  constructor(props) {
    super(props);
    const { field, resourceId } = props;
    const selectableResource = field ? field.selectableResource : null;
    this.state = {
      field_type: field ? field.fieldType : "",
      name: field ? field.name : "",
      form_id: resourceId,
      selectable_resource_attributes: {
        form_id: selectableResource ? selectableResource.resource_id || "" : "",
        resource_field_id: selectableResource
          ? selectableResource.resource_field_id || ""
          : ""
      }
    };
  }

  handleChange = event => {
    event.persist();
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value
    });
  };

  handleSelectableChange = (
    selectableResourceAttributes,
    options_attributes
  ) => {
    this.setState({
      selectable_resource_attributes: selectableResourceAttributes,
      options_attributes
    });
  };

  handleOnSubmit = event => {
    const {
      addField,
      addRecordField,
      updateField,
      organizationId,
      field
    } = this.props;
    event.preventDefault();
    if (addField)
      addField(this.state, organizationId).then(field =>
        addRecordField(field, organizationId)
      );
    if (updateField) updateField(this.state, organizationId, field.id);
    this.setState({
      ...this.state,
      field_type: "",
      name: ""
    });
  };

  render() {
    const { action, field } = this.props;
    console.log(this.state);
    return (
      <form onSubmit={this.handleOnSubmit}>
        <div className="form-group">
          <label htmlFor="field_name">Field Name:</label>
          <input
            className="form-control"
            type="text"
            name="name"
            id="field_name"
            onChange={this.handleChange}
            value={this.state.name}
            placeholder="Enter field name..."
          />
        </div>
        <hr />
        <div className="form-group">
          <label htmlFor="field_type">Field Type:</label>
          <div id="field_type">
            <TextField
              field={field}
              fieldType={this.state.field_type}
              handleChange={this.handleChange}
              handleSelectableChange={this.handleSelectableChange}
              selectableResourceAttributes={
                this.state.selectable_resource_attributes
              }
            />
            <PasswordField
              field={field}
              fieldType={this.state.field_type}
              handleChange={this.handleChange}
              handleSelectableChange={this.handleSelectableChange}
              selectableResourceAttributes={
                this.state.selectable_resource_attributes
              }
            />
            <SelectableField
              field={field}
              fieldType={this.state.field_type}
              handleChange={this.handleChange}
              handleSelectableChange={this.handleSelectableChange}
              selectableResourceAttributes={
                this.state.selectable_resource_attributes
              }
            />
          </div>
        </div>
        <hr />
        <input
          type="submit"
          value={action}
          className="btn btn-primary shadow"
        />
      </form>
    );
  }
}
