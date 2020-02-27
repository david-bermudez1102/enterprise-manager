import React, { Component } from "react";

export default class FieldForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      field_type: "",
      name: "",
      form_id: props.resourceId,
      organization_id: props.organizationId
    };
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
    this.setState({
      ...this.state,
      field_type: "",
      name: ""
    });
  };

  render() {
    return (
      <form onSubmit={this.handleOnSubmit}>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="field_type"
            id="text_field"
            value="text"
            onChange={this.handleOnChange}
          />
          <label htmlFor="text_field" className="form-check-label">
            Text Field
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="field_type"
            id="password_field"
            value="password"
            onChange={this.handleOnChange}
          />
          <label htmlFor="password_field" className="form-check-label">
            Password Field
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="field_type"
            id="selectable_field"
            value="selectable"
            onChange={this.handleOnChange}
          />
          <label htmlFor="selectable_field" className="form-check-label">
            Selectable Field
          </label>
        </div>
        <div className="form-group">
          <input
          className="form-control"
            type="text"
            name="name"
            onChange={this.handleOnChange}
            value={this.state.name}
            placeholder="Enter name"
          />
        </div>
        <input type="submit" className="btn btn-primary"/>
      </form>
    );
  }
}
