import React, { Component } from "react";
import { connect } from "react-redux";
import cuid from "cuid";
import SelectableResourcesOptions from "./SelectableResourcesOptions";

class SelectableResources extends Component {
  constructor() {
    super();
    this.state = {
      selected: "0",
      selectable_resource_attributes: { form_id: "", resource_field_id: "" }
    };
  }

  handleChange = event => {
    event.persist();
    this.setState(prevState => {
      this.props.handleSelectableChange(
        {
          ...prevState.selectable_resource_attributes,
          [event.target.name]: event.target.value,
          resource_field_id: ""
        },
        []
      );
      return {
        ...prevState,
        selected: event.target.value,
        selectable_resource_attributes: {
          ...prevState.selectable_resource_attributes,
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
      selectable_resource_attributes: {
        ...this.state.selectable_resource_attributes,
        [event.target.name]: event.target.value
      }
    });
    this.props.handleSelectableChange(
      {
        ...this.state.selectable_resource_attributes,
        [event.target.name]: event.target.value
      },
      []
    );
  };

  render() {
    const { resources, fields } = this.props;
    return (
      <>
        <div className="form-group">
          <hr />
          <label htmlFor="selectable_resource">Connect to:</label>
          <select
            name="form_id"
            id="selectable_resource"
            onChange={this.handleChange}
            value={this.state.selected}
            className="form-control">
            <option value="" key={cuid()}>
              Select
            </option>
            {resources.map(resource => (
              <option value={resource.id} key={cuid()}>
                {resource.name}
              </option>
            ))}
          </select>
        </div>
        <SelectableResourcesOptions
          fields={fields}
          selected={this.state.selected}
          handleChange={this.handleResourcesOptionsChange}
        />
      </>
    );
  }
}

const mapStateToProps = ({ resources, fields }) => {
  return { resources, fields };
};

export default connect(mapStateToProps)(SelectableResources);
