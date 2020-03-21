import React, { Component } from "react";
import snakecaseKeys from "snakecase-keys";

export default class CellForm extends Component {
  constructor(props) {
    super(props);
    const { value, session } = props;
    this.state = {
      content: value.content,
      id: value.id,
      formId: value.formId,
      organizationId: session.currentUser.organization_id
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleBlur = () => {
    this.props.handleBlur();
  };

  handleSubmit = e => {
    e.preventDefault();
    const { updateValue } = this.props;
    if (this.state.content !== this.props.value.content)
      updateValue(this.state);
  };

  render() {
    return (
      <form
        onSubmit={this.handleSubmit}
        className="m-0 w-100 position-absolute">
        <input
          className="p-0 m-0 overflow-hidden w-100"
          style={{ border: 0, outline: 0 }}
          name="content"
          type="text"
          value={this.state.content}
          onBlur={this.handleBlur}
          onChange={this.handleChange}
          autoFocus
        />
      </form>
    );
  }
}
