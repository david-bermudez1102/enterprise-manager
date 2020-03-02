import React, { Component } from "react";

class ResourceForm extends Component {
  constructor(props) {
    super(props);
    this.state = { name: "", organization_id: props.organizationId };
  }

  handleChange = event => {
    event.persist();
    this.setState({ ...this.state, [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.addResource(this.state, this.props.history);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <input
            name="name"
            type="text"
            placeholder="Resource name"
            onChange={this.handleChange}
            value={this.state.name}
            className="form-control"
          />
        </div>
        <input type="submit" value="Create Resource" className="btn btn-primary shadow"/>
      </form>
    );
  }
}

export default ResourceForm;
