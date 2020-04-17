import React, { Component } from "react";
import TextField from "./TextField";
import PasswordField from "./PasswordField";
import SelectableField from "./SelectableField";
import RecordKeyField from "./RecordKeyField";
import RadioField from "./RadioField";
import CheckBoxField from "./CheckBoxField";
import TextAreaField from "./TextAreaField";
import DateField from "./DateField";

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
      },
      record_key_attributes: {
        resource_field_id:
          field && field.recordKey ? field.recordKey.resource_field_id : ""
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

  handleKeyFieldChange = KeyFieldAttributes => {
    this.setState({
      record_key_attributes: KeyFieldAttributes
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
    if (addField) {
      addField(this.state, organizationId).then(field =>
        field ? addRecordField(field, organizationId) : null
      );
      this.setState({
        field_type: "",
        name: ""
      });
    }
    if (updateField) updateField(this.state, organizationId, field.id);
  };

  render() {
    console.log(this.state);
    const { action, field, resourceId } = this.props;
    return (
      <form onSubmit={this.handleOnSubmit}>
        <div className="form-group">
          <input
            className="form-control rounded-pill"
            type="text"
            name="name"
            id="field_name"
            onChange={this.handleChange}
            value={this.state.name}
            placeholder="Enter field name..."
            required
          />
          <label className="form-control-placeholder" htmlFor="field_name">
            Field Name
          </label>
        </div>
        <hr />
        <div className="form-group row">
          <label htmlFor="field_type" className="col-12 order-first">
            Field Type:
          </label>
          <RecordKeyField
            field={field}
            resourceId={resourceId}
            fieldType={this.state.field_type}
            handleChange={this.handleChange}
            handleSelectableChange={this.handleSelectableChange}
            handleKeyFieldChange={this.handleKeyFieldChange}
            selectableResourceAttributes={
              this.state.selectable_resource_attributes
            }
          />
          <TextField
            field={field}
            fieldType={this.state.field_type}
            handleChange={this.handleChange}
            handleSelectableChange={this.handleSelectableChange}
            selectableResourceAttributes={
              this.state.selectable_resource_attributes
            }
          />
          <TextAreaField
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
          <RadioField
            field={field}
            fieldType={this.state.field_type}
            handleChange={this.handleChange}
            handleSelectableChange={this.handleSelectableChange}
            selectableResourceAttributes={
              this.state.selectable_resource_attributes
            }
            handleKeyFieldChange={this.handleKeyFieldChange}
          />
          <CheckBoxField
            field={field}
            fieldType={this.state.field_type}
            handleChange={this.handleChange}
            handleSelectableChange={this.handleSelectableChange}
            selectableResourceAttributes={
              this.state.selectable_resource_attributes
            }
            handleKeyFieldChange={this.handleKeyFieldChange}
          />
          <DateField
            field={field}
            fieldType={this.state.field_type}
            handleChange={this.handleChange}
            handleSelectableChange={this.handleSelectableChange}
            selectableResourceAttributes={
              this.state.selectable_resource_attributes
            }
          />
        </div>
        <hr />
        <div className="form-check form-check-inline">
          <input
            type="checkbox"
            name="isRequired"
            className="form-check-input"
          />
          <label className="form-check-label" htmlFor="isRequired">
            Required
          </label>
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
