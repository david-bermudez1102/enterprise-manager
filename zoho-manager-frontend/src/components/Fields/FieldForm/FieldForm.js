import React, { Component } from "react";
import TextField from "./TextField";
import PasswordField from "./PasswordField";
import SelectableField from "./SelectableField";

export default class FieldForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      field_type: "",
      name: "",
      form_id: props.resourceId
    };
  }

  handleChange = event => {
    event.persist();
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value
    });
  };

  handleSelectableChange = (selectable_resource_attributes, options) => {
    this.setState({
      ...this.state,
      selectable_resource_attributes,
      options
    });
  };

  handleOnSubmit = event => {
    event.preventDefault();
    this.props.addField(this.state, this.props.organizationId);
    this.setState({
      ...this.state,
      field_type: "",
      name: ""
    });
  };

  render() {
    return (
      <form onSubmit={this.handleOnSubmit}>
        <TextField
          handleChange={this.handleChange}
          handleSelectableChange={this.handleSelectableChange}
        />
        <PasswordField
          handleChange={this.handleChange}
          handleSelectableChange={this.handleSelectableChange}
        />
        <SelectableField
          fieldType={this.state.field_type}
          handleChange={this.handleChange}
          handleSelectableChange={this.handleSelectableChange}
        />

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
        <input type="submit" className="btn btn-primary" />
      </form>
    );
  }
}
