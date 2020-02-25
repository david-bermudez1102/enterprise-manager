import React, { Component } from "react";

class ResourceForm extends Component {
  constructor(props) {
    super(props);
    this.state = { resource: { name: "", organization_id: props.organizationId } };
  }

  handleChange = event => {
    event.persist()
    this.setState({
      resource: { ...this.state.resource, [event.target.name]: event.target.value }
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
          name="name"
          type="text"
          placeholder="Resource name"
          onChange={this.handleChange}
          value={this.state.resource.name}
        />
        <input type="submit" value="Create Resource" />
      </form>
    );
  }
}

export default ResourceForm;
