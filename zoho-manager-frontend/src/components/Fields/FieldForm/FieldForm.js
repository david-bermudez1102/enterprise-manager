import React, { Component } from "react";
import TextField from "./TextField";
import PasswordField from "./PasswordField";
import SelectableField from "./SelectableField";

export default class FieldForm extends Component {
  constructor(props) {
    super(props);
    const { field, resourceId } = props;
    this.state = {
      field_type: field ? field.fieldType : "",
      name: field ? field.name : "",
      form_id: resourceId
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
    selectable_resource_attributes,
    options_attributes
  ) => {
    this.setState({
      ...this.state,
      selectable_resource_attributes,
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
    return (
      <form onSubmit={this.handleOnSubmit}>
        <div className="form-group">
          <TextField
            field={field}
            fieldType={this.state.field_type}
            handleChange={this.handleChange}
            handleSelectableChange={this.handleSelectableChange}
          />
          <PasswordField
            fieldType={this.state.field_type}
            handleChange={this.handleChange}
            handleSelectableChange={this.handleSelectableChange}
          />
          <SelectableField
            fieldType={this.state.field_type}
            handleChange={this.handleChange}
            handleSelectableChange={this.handleSelectableChange}
          />
        </div>

        <div className="form-group">
          <input
            className="form-control"
            type="text"
            name="name"
            onChange={this.handleChange}
            value={this.state.name}
            placeholder="Enter name"
          />
        </div>
        <input type="submit" value={action} className="btn btn-primary" />
      </form>
    );
  }
}
