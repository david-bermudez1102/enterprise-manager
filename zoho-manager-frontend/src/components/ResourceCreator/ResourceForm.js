import React, { Component } from "react";

class ResourceForm extends Component {
  constructor() {
    super();
    this.state = { resource: { content: "" } };
  }

  handleChange = event => {
    event.persist()
    this.setState({
      resource: { ...this.state.resource.content, [event.target.name]: event.target.value }
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.addResource(this.state);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          name="content"
          type="text"
          placeholder="Resource name"
          onChange={this.handleChange}
          value={this.state.content}
        />
        <input type="submit" value="Create Resource" />
      </form>
    );
  }
}

export default ResourceForm;
