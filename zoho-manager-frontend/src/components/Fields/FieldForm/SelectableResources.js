import React, { Component } from "react";
import { connect } from "react-redux";
import cuid from "cuid";
import SelectableResourcesOptions from "./SelectableResourcesOptions";

class SelectableResources extends Component {
  constructor() {
    super();
    this.state = {
      selected: "0",
      selectable_resource: { form_id: "", resource_field_id: "" }
    };
  }

  handleChange = event => {
    event.persist();
    this.setState(prevState => {
      this.props.handleSelectableChange({
        ...prevState.selectable_resource,
        [event.target.name]: event.target.value,
        resource_field_id: ""
      });
      return {
        ...prevState,
        selected: event.target.value,
        selectable_resource: {
          ...prevState.selectable_resource,
          [event.target.name]: event.target.value,
          resource_field_id: ""
        }
      };
    });
  };

  handleResourcesOptionsChange = event => {
    event.persist();
    this.setState({
      ...this.state,
      selectable_resource: {
        ...this.state.selectable_resource,
        [event.target.name]: event.target.value
      }
    });
    this.props.handleSelectableChange({
      ...this.state.selectable_resource,
      [event.target.name]: event.target.value
    });
  };

  render() {
    const { resources, fields } = this.props;
    return (
      <div>
        Connect to:
        <select
          name="form_id"
          onChange={this.handleChange}
          value={this.state.selected}
        >
          <option value="" key={cuid()}>
            Select
          </option>
          {resources.map(resource => (
            <option value={resource.id} key={cuid()}>
              {resource.name}
            </option>
          ))}
        </select>
        <SelectableResourcesOptions
          fields={fields}
          selected={this.state.selected}
          handleChange={this.handleResourcesOptionsChange}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ resources, fields }) => {
  return { resources, fields };
};

export default connect(mapStateToProps)(SelectableResources);
