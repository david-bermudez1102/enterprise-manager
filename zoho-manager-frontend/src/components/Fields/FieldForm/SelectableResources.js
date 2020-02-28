import React, { Component } from "react";
import { connect } from "react-redux";
import cuid from "cuid";
import SelectableResourcesOptions from "./SelectableResourcesOptions";

class SelectableResources extends Component {
  constructor() {
    super();
    this.state = { selected: "select" };
  }

  handleChange = event => {
    this.setState({ selected: event.target.value });
  };

  render() {
    const { resources, fields } = this.props;
    return (
      <div>
        Connect to:
        <select onChange={this.handleChange} value={this.state.selected}>
          <option value="Select" key={cuid()}>
            Select
          </option>
          {resources.map(resource => (
            <option value={resource.id} key={cuid()}>
              {resource.name}
            </option>
          ))}
        </select>
        <SelectableResourcesOptions fields={fields} selected={this.state.selected}/>
      </div>
    );
  }
}

const mapStateToProps = ({ resources, fields }) => {
  return { resources, fields };
};

export default connect(mapStateToProps)(SelectableResources);
