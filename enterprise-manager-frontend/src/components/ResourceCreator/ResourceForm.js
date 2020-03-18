import React, { Component } from "react";

class ResourceForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      organization_id: props.organizationId
    };
  }

  componentDidMount() {
    const { match, resources } = this.props;
    const resource = resources
      ? resources.find(resource => resource.formAlias === match.params.formAlias)
      : null;
    return resource ? this.setState({ name: resource.name, resourceId: resource.id }) : null;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match !== this.props.match) {
      const { match, resources } = this.props;
      const resource = resources
        ? resources.find(resource => resource.formAlias === match.params.formAlias)
        : null;
      return resource ? this.setState({ name: resource.name, resourceId: resource.id }) : null;
    }
  }

  handleChange = event => {
    event.persist();
    this.setState({ ...this.state, [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    const { addResource, updateResource, history, url } = this.props;
    const { name, organization_id, resourceId } = this.state;
    event.preventDefault();
    if (addResource)
      addResource({ name, organization_id }, history).then(resource =>
        resource ? history.push(resource.formAlias) : null
      );
    else if (updateResource)
      updateResource({ name }, organization_id, resourceId, url).then(resource =>
        resource ? history.push(`${url}/${resource.formAlias}/edit`) : null
      );
  };

  render() {
    const { addResource } = this.props;
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label>Resource Name</label>
          <input
            name="name"
            type="text"
            placeholder="Enter name..."
            onChange={this.handleChange}
            value={this.state.name}
            className="form-control"
          />
        </div>
        <input
          type="submit"
          value={addResource ? "Create Resource" : "Update Resource"}
          className="btn btn-primary shadow"
        />
      </form>
    );
  }
}

export default ResourceForm;
