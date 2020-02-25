import React, { Component } from "react";

export default class FieldForm extends Component {
  constructor(props) {
    super(props);
    this.state = { field_type: "text", name: "", form_id:props.resourceId, organization_id:props.organizationId };
  }

  handleOnChange = event => {
    event.persist();
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value
    });
  };

  handleOnSubmit = event => {
    event.preventDefault();
    this.props.addField(this.state);
  };

  render() {
    return (
      <form onSubmit={this.handleOnSubmit}>
        <select
          name="field_type"
          onChange={this.handleOnChange}
          value={this.state.field_type}
        >
          <option value="text">Text</option>
          <option value="password">Password</option>
        </select>
        <input
          type="text"
          name="name"
          onChange={this.handleOnChange}
          value={this.state.name}
          placeholder="Enter name"
        />
        <input type="submit" />
      </form>
    );
  }
}
