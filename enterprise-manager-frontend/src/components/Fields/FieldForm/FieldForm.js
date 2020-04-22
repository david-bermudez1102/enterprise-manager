import React, { Component } from "react";
import TextField from "./TextField";
import PasswordField from "./PasswordField";
import SelectableField from "./SelectableField";
import RecordKeyField from "./RecordKeyField";
import RadioField from "./RadioField";
import CheckBoxField from "./CheckBoxField";
import TextAreaField from "./TextAreaField";
import DateField from "./DateField";
import NumericField from "./NumericField/index.js";
import CombinedFields from "./CombinedField";

export default class FieldForm extends Component {
  constructor(props) {
    super(props);
    const { field, resourceId } = props;
    const selectableResource = field ? field.selectableResource : null;
    this.state = {
      fieldType: field ? field.fieldType : "",
      name: field ? field.name : "",
      formId: resourceId,
      isRequired: field ? field.isRequired : false,
      defaultValue: field ? field.defaultValue : "",
      selectableResourceAttributes: {
        formId: selectableResource ? selectableResource.resource_id || "" : "",
        resourceFieldId: selectableResource
          ? selectableResource.resourceFieldId || ""
          : ""
      },
      recordKeyAttributes: {
        resourceFieldId:
          field && field.recordKey ? field.recordKey.resourceFieldId : ""
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
    optionsAttributes
  ) => {
    this.setState({
      selectableResourceAttributes: selectableResourceAttributes,
      optionsAttributes
    });
  };

  handleKeyFieldChange = keyFieldAttributes => {
    this.setState({
      recordKeyAttributes: keyFieldAttributes
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
        fieldType: "",
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
          <label htmlFor="fieldType" className="col-12 order-first">
            Field Type:
          </label>
          <RecordKeyField
            field={field}
            resourceId={resourceId}
            fieldType={this.state.fieldType}
            handleChange={this.handleChange}
            handleSelectableChange={this.handleSelectableChange}
            handleKeyFieldChange={this.handleKeyFieldChange}
            selectableResourceAttributes={
              this.state.selectableResourceAttributes
            }
          />
          <TextField
            field={field}
            fieldType={this.state.fieldType}
            handleChange={this.handleChange}
            handleSelectableChange={this.handleSelectableChange}
            selectableResourceAttributes={
              this.state.selectableResourceAttributes
            }
          />
          <NumericField
            field={field}
            fieldType={this.state.fieldType}
            handleChange={this.handleChange}
            handleSelectableChange={this.handleSelectableChange}
            selectableResourceAttributes={
              this.state.selectableResourceAttributes
            }
          />
          <TextAreaField
            field={field}
            fieldType={this.state.fieldType}
            handleChange={this.handleChange}
            handleSelectableChange={this.handleSelectableChange}
            selectableResourceAttributes={
              this.state.selectableResourceAttributes
            }
          />
          <PasswordField
            field={field}
            fieldType={this.state.fieldType}
            handleChange={this.handleChange}
            handleSelectableChange={this.handleSelectableChange}
            selectableResourceAttributes={
              this.state.selectableResourceAttributes
            }
          />
          <SelectableField
            field={field}
            fieldType={this.state.fieldType}
            handleChange={this.handleChange}
            handleSelectableChange={this.handleSelectableChange}
            selectableResourceAttributes={
              this.state.selectableResourceAttributes
            }
          />
          <RadioField
            field={field}
            fieldType={this.state.fieldType}
            handleChange={this.handleChange}
            handleSelectableChange={this.handleSelectableChange}
            selectableResourceAttributes={
              this.state.selectableResourceAttributes
            }
            handleKeyFieldChange={this.handleKeyFieldChange}
          />
          <CheckBoxField
            field={field}
            fieldType={this.state.fieldType}
            handleChange={this.handleChange}
            handleSelectableChange={this.handleSelectableChange}
            selectableResourceAttributes={
              this.state.selectableResourceAttributes
            }
            handleKeyFieldChange={this.handleKeyFieldChange}
          />
          <DateField
            field={field}
            fieldType={this.state.fieldType}
            handleChange={this.handleChange}
            handleSelectableChange={this.handleSelectableChange}
            selectableResourceAttributes={
              this.state.selectableResourceAttributes
            }
          />
          <CombinedFields
            field={field}
            resourceId={resourceId}
            fieldType={this.state.fieldType}
            handleChange={this.handleChange}
            handleSelectableChange={this.handleSelectableChange}
            selectableResourceAttributes={
              this.state.selectableResourceAttributes
            }
          />
        </div>
        <hr />
        <div className="form-check form-check-inline">
          <input
            type="checkbox"
            name="isRequired"
            className="form-check-input"
            onChange={e =>
              this.setState({ isRequired: e.target.checked ? true : false })
            }
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
